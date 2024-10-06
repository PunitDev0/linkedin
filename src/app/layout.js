// src/app/layout.js
"use client";
import "./globals.css";
import { usePathname } from 'next/navigation';
import { DarkModeProvider } from "./context/DarkModeContext";
import NavbarComponent from "@/components/navbar";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  return (
    <html lang="en">
      <body className="antialiased">
        <DarkModeProvider>
        {!isLoginPage && <NavbarComponent />}
        {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
