import { getBlogbyID } from '@/app/serverActions/blog';
import { format } from 'date-fns';
import React from 'react';

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
// import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Loader from '@/components/Loader';

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
  }) {
  const { id } = await params;
  const res = await getBlogbyID(id);
  const blog = res.blog;
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h4 className="text-xl">No detail found</h4>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="w-[80vw] mx-auto">
        <Card className="shadow-lg">
          <CardHeader className="px-6 py-4">
            <div className="flex items-center space-x-4">
              <Link href={"/blog"} passHref>
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <CardTitle className="text-3xl md:text-4xl font-bold">
                {blog.title}
              </CardTitle>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Published on {format(new Date(blog.createdAt), 'MMMM dd, yyyy')}
            </p>
          </CardHeader>
          <CardContent className="px-6 py-4">
            <div className="prose prose-indigo">
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
            </div>
          </CardContent>
          <Separator className="my-4" />
        
        </Card>
      </div>
    </div>
  );
}
