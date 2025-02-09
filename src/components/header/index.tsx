import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-background/95 backdrop-blur-sm py-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/">
          <p className="flex items-center">
            <BlogwebLogo />
          </p>
        </Link>
        <nav>
          <Link href="/blogs">
            <p className="text-lg font-medium hover:underline">Blogs</p>
          </Link>
        </nav>
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
