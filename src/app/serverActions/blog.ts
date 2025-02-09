
"use server";

import { cookies } from "next/headers";

export async function getAuthHeaders() {
  const token = (await cookies()).get("token")?.value; 

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export const getBlogs = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog`, {
            method: 'GET',
            headers: await getAuthHeaders()
        });

        if (!res.ok) {
            throw new Error('Failed to fetch blogs');
        }

       return await res.json();
      
    } catch (error) {
        console.error('Error fetching blogs:', error);
      
    }
};

export const createBlogAction = async (formData: FormData) => {
    try {
        const title = formData.get("title");
        const content = formData.get("content");
        const blog = {
            title,
            content
        }
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog`, {
            method: 'POST',
            headers: await getAuthHeaders(),
            body: JSON.stringify(blog)
        })
      return await res.json()
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return error
        
    }
}



export const updateBlogAction = async (formData: FormData, id: string) => {
  try {
    const title = formData.get("title");
    const content = formData.get("content");
    const blog = { title, content };

    const headers = await getAuthHeaders(); 
    if (!headers) {
      return { error: "Unauthorized: Missing token" };
    }

    const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog/${id}`, {
      method: "PATCH",
      headers,
      body: JSON.stringify(blog),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update blog");
    }

    return await res.json();
  } catch (error) {
    console.error("Error updating blog:", error);
    if (error instanceof Error) {
      return { error: error.message || "Something went wrong" };
    } else {
      return { error: "Something went wrong" };
    }
  }
};



export const deleteBlogAction = async (id:string) => {
    try {
      
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog/${id}`, {
            method: 'Delete',
            headers: {
                'Content-Type': 'application/json'
            },
        })
      return await res.json()
    } catch (error) {
        console.error('Error deleting blog:', error);
        return error
        
    }
}

export const getBlogbyID = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog/${id}`, {
        method: 'GET',
        headers: await getAuthHeaders()
      });
      
      if (!res.ok) {
        throw new Error(`Failed to fetch blog: ${res.status} ${res.statusText}`);
      }
  
      return await res.json();
    } catch (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }
  };
  