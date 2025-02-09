// components/Blog/BlogCard.tsx
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil, Trash, Info } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export interface BlogType {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  authorId: string;
  author?: {
    name:string
  }
}

interface BlogCardProps {
  blog: BlogType;
  onDelete: (id: string) => void;
  onEdit: (blog: BlogType) => void;
}

export default function BlogCard({ blog, onDelete, onEdit }: BlogCardProps) {
  return (
    <Card className="flex flex-col h-80">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{blog.title}</CardTitle>
          <Link href={`/blog/${blog.id}`} passHref>
            <Info size={24} className="cursor-pointer" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="flex-grow overflow-hidden">
        <p className="text-sm text-gray-600 mb-2">
        Published on  {format(new Date(blog.createdAt), "MMMM d, yyyy")}
        </p>
              <p className="text-gray-700"
              dangerouslySetInnerHTML={{ __html: blog.content.length > 100
                ? `${blog.content.substring(0, 100)}...`
                : blog.content }}>
          
        </p>
        <p>
          Author:{blog.author?.name || "me"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onEdit(blog)}>
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={() => onDelete(blog.id)}>
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
