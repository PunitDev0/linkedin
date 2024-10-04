// src/app/layout.js
"use client";
import "./globals.css";
import { usePathname } from 'next/navigation';
import NavbarComponent from "@/components/navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body className="antialiased">
        {!isLoginPage && <NavbarComponent />}
        {children}
      </body>
    </html>
  );
}
