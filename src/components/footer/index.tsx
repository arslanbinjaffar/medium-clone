import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background/95 py-4 shadow-sm">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} BlogWeb. All rights reserved.
      </div>
    </footer>
  );
}
