export const getBlogs = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog/list`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
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
  const authorId = formData.get("authorId");
        const content = formData.get("content");
        const blog = {
            title,
            authorId,
            content
        }
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
      return await res.json()
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return error
        
    }
}


export const updateBlogAction = async (formData: FormData,id:string) => {
    try {
        const title = formData.get("title");
    const authorId = formData.get("authorId");
            const content = formData.get("content");
            const blog = {
                title,
                authorId,
                content
            }
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog/update/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        })
      return await res.json()
    } catch (error) {
        console.error('Error updating blog:', error);
        return error
        
    }
}


export const deleteBlogAction = async (id:string) => {
    try {
      
        const res = await fetch(`${process.env.NEXT_BACKEND_URL}blog/delete/${id}`, {
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
        headers: {
          'Content-Type': 'application/json'
        },
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
  