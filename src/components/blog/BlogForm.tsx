"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TiptapEditor, { TiptapEditorRef } from "@/components/TiptapEditor/index";

export interface BlogFormData {
  title: string;
  content: string;
  authorId: string;
}

interface BlogFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: FormData) => Promise<void>;
  authors: Array<{ id: string; name: string }>;
  initialData?: BlogFormData;
    mode: "create" | "edit";
    loading: boolean;
}

export default function BlogForm({
  open,
  onOpenChange,
  onSubmit,
  authors,
  initialData,
    mode,
  loading
}: BlogFormProps) {
  const editorRef = useRef<TiptapEditorRef>(null);
  const [content, setContent] = useState(initialData?.content || "<p>Start typing here...</p>");

  const handleContentChange = (newContent: any) => {
    setContent(newContent || "");
  };

  useEffect(() => {
    setContent(initialData?.content || "<p>Start typing here...</p>");
  }, [initialData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl w-full overflow-y-scroll h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create New Blog Post" : "Edit Blog Post"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Fill in the details for your new blog post."
              : "Make changes to your blog post here."}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const formData = new FormData(form);
            formData.set("content", content);
            await onSubmit(formData);
          }}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required defaultValue={initialData?.title} />
          </div>

          <div>
            <Label htmlFor="author">Author</Label>
            <Select name="authorId" defaultValue={initialData?.authorId}>
              <SelectTrigger>
                <SelectValue placeholder="Select an Author" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Authors</SelectLabel>
                  {authors.map((item) => (
                    <SelectItem value={item.id} key={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <div className="border rounded p-2">
              <TiptapEditor
                ref={editorRef}
                ssr={true}
                output="html"
                placeholder={{
                  paragraph: "Type your content here...",
                  imageCaption: "Type caption for image (optional)",
                }}
                contentMinHeight={256}
                contentMaxHeight={640}
                onContentChange={handleContentChange}
                initialContent={content}
              />
            </div>
            <input type="hidden" name="content" value={content} />
          </div>

          <DialogFooter>
            <Button disabled={loading}  type="submit">{mode === "create" ? "Create Blog" : "Save changes"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
