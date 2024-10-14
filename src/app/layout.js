// src/app/layout.js
"use client";
import "./globals.css";
import { usePathname } from 'next/navigation';
import { DarkModeProvider, LoadingProvider } from "./context/Context";
import NavbarComponent from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
import { useLoading } from "./context/Context";
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isLoginPage2 = pathname === '/login2';
  const {loading} = useLoading()
  return (
    <html lang="en">
      <body className="antialiased">
        <LoadingProvider>
        <SessionProvider>
        <DarkModeProvider>
        {!isLoginPage && !isLoginPage2 &&  <NavbarComponent />}
        {children}
        </DarkModeProvider>
        </SessionProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
