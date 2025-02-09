// eslint-disable-next-line @typescript-eslint/no-unused-expressions
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import BlogCard, { BlogType } from "@/components/blog/BlogCard";
import BlogForm from "@/components/blog/BlogForm";
import { createBlogAction, deleteBlogAction, getBlogs, getMyBlogs, updateBlogAction } from "../serverActions/blog";
import Loader from "@/components/Loader";

interface AuthorType {
  id: string;
  name: string;
  email: string;
  password: string;
  
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<BlogType[]>([]);
  const [authors, setAuthors] = useState<AuthorType[]>([]);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogType | null>(null);
  
  const [loadingBlogs, setLoadingBlogs] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);



   async function fetchMyBlogs() {
    setLoadingBlogs(true);
    try {
      const res = await getMyBlogs();
      setBlogs(res.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoadingBlogs(false);
    }
  }


  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleCreateBlog = async (formData: FormData) => {
    setLoadingCreate(true);
    try {
      const result = await createBlogAction(formData);
      if (result?.error) {
        toast(result?.error);
      } else {
        toast("Blog created successfully!");
        setCreateModalOpen(false);
      }
    } catch (error) {
      console.error("Error creating blog:", error);
      toast("Error creating blog");
    } finally {
      setLoadingCreate(false);
      fetchMyBlogs();
    }
  };

  const handleEditBlog = async (formData: FormData) => {
    setLoadingEdit(true);
    try {
      const result = await updateBlogAction(formData,editingBlog?.id as string);
      if (result.error) {
        toast(result.error);
      } else {
        toast("Blog edited successfully!");
        setCreateModalOpen(false);
      }
      setEditingBlog(null);
    } catch (error) {
      console.error("Error updating blog:", error);
      toast("Error updating blog");
    } finally {
      setLoadingEdit(false);
      fetchMyBlogs();
    }
  };

  const handleDeleteBlog = async(id: string) => {
    try {
      const result = await deleteBlogAction(id);
      if (result.error) {
        toast(result.error);
      } else {
        toast("Blog deleted successfully!");
        setCreateModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toast("Error updating blog");
    } finally {
        fetchMyBlogs();
    }
  };

  return (
    <div className="container mx-auto ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog List</h1>
        <Button onClick={() => setCreateModalOpen(true)} disabled={loadingCreate}>
          <Plus className="w-4 h-4 mr-2" />
          Create Blog
        </Button>
      </div>

      <BlogForm
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreateBlog}
        authors={authors}
        mode="create"
        loading={loadingCreate}
      />

      {editingBlog && (
        <BlogForm
          open={!!editingBlog}
          onOpenChange={(open) => {
            if (!open) setEditingBlog(null);
          }}
          onSubmit={handleEditBlog}
          loading={loadingEdit}
          authors={authors}
          mode="edit"
          initialData={{
            title: editingBlog.title,
            content: editingBlog.content,
            authorId: editingBlog.authorId,
          }}
        />
      )}
      {loadingBlogs ? (
        <div className="flex justify-center items-center h-screen">
          <Loader/>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogs.length>0 && blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              onDelete={handleDeleteBlog}
              onEdit={(blog) => setEditingBlog(blog)}
            />
          ))}
        </div>
      )}
         
    </div>
  );
}

