// src/app/layout.js
"use client";
import "./globals.css";
import { usePathname } from 'next/navigation';
import { DarkModeProvider } from "./context/Context";
import NavbarComponent from "@/components/navbar";
import { SessionProvider } from "next-auth/react";
export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';
  const isLoginPage2 = pathname === '/login2';
  const Firstpage = pathname === '/';

  return (
    <html lang="en">
      <body className="antialiased">
        <SessionProvider>
        <DarkModeProvider>
        {/* {!isLoginPage && !isLoginPage2 && ! Firstpage &&  <NavbarComponent />} */}
        <div className="">
        {children}
        </div>
        </DarkModeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
