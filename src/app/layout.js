// src/app/layout.js
"use client";
import "./globals.css";
import { usePathname } from 'next/navigation';
import { DarkModeProvider } from "./context/DarkModeContext";
import NavbarComponent from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
        <DarkModeProvider>
        {/* {!isLoginPage && <NavbarComponent />} */}
        {children}
        </DarkModeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
