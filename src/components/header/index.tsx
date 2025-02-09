"use client"
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { removeAuthToken } from "@/app/serverActions/setAuthToken";
import { useRouter } from "next/navigation";

export default function Header() {
  const router=useRouter()
  const handleLogout = async () => {
    await removeAuthToken()
    router.push("/login")
  }
  return (
    <header className="bg-background/95 backdrop-blur-sm py-2 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/blog">
          <p className="flex items-center">
            <BlogwebLogo />
          </p>
        </Link>
        <nav className="flex gap-3 items-center">
          <Link href="/myblog">
            <p className="text-lg font-medium hover:font-bold hover:underline">My Blogs</p>
          </Link>
          <Link href="/blog">
            <p className="text-lg font-medium hover:font-bold hover:underline">Blogs</p>
          </Link>
        </nav>
        <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>
      </div>
    </header>
  );
}

function BlogwebLogo() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 80"
      width="300"
      height="80"
    >
      <rect width="100%" height="100%" fill="none" />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff7e5f" stopOpacity={1} />
          <stop offset="100%" stopColor="#feb47b" stopOpacity={1} />
        </linearGradient>
      </defs>
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill="url(#gradient)"
        fontFamily="Helvetica, Arial, sans-serif"
        fontSize="40"
        fontWeight="bold"
      >
        Blogweb
      </text>
    </svg>
  );
}
