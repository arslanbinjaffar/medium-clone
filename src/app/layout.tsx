import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Header from "@/components/header";
import Footer from "@/components/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medium Clone - Share Your Stories",
  description: "A powerful blogging platform where you can share ideas, read insightful stories, and connect with writers worldwide.",
  keywords: ["Medium Clone", "Next.js Blog", "Writing Platform", "Articles", "Storytelling"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  openGraph: {
    title: "Medium Clone - Share Your Stories",
    description: "Join a growing community of writers and readers on our Next.js-powered blogging platform.",
    url: "https://yourmediumclone.com",
    siteName: "Medium Clone",
    images: [
      {
        url: "https://yourmediumclone.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Medium Clone - Share Your Stories",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Medium Clone - Share Your Stories",
    description: "A modern blogging platform built with Next.js. Write, publish, and engage with readers.",
    images: ["https://yourmediumclone.com/twitter-image.jpg"],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-left" richColors />
      </body>
    </html>
  );
}
