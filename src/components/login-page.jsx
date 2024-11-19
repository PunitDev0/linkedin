'use client'

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useState } from "react"
import Login from "./Login2"

export function LoginPage() {
  const [isLogin, setLogin] = useState(false)
  return (
    (<div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6">
          <nav className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link className="text-[#0a66c2] font-bold text-2xl" href="/">
                Linked
                <span className="inline-block bg-[#0a66c2] text-white px-1 rounded">in</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link className="text-gray-600 hover:text-gray-900" href="#">
                Articles
              </Link>
              <Link className="text-gray-600 hover:text-gray-900" href="#">
                People
              </Link>
              <Link className="text-gray-600 hover:text-gray-900" href="#">
                Learning
              </Link>
              <Link className="text-gray-600 hover:text-gray-900" href="#">
                Jobs
              </Link>
              <Link className="text-gray-600 hover:text-gray-900" href="#">
                Games
              </Link>
              <Link className="text-gray-600 hover:text-gray-900" href="#">
                Get the app
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                className="hidden sm:inline-block text-gray-700 hover:text-gray-900 font-semibold"
                href="/join">
                Join now
              </Link>
              <Button
                variant="ghost"
                onClick={() => setLogin(true)}
                className="hidden sm:inline-flex border-2 border-[#0a66c2] bg-white text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white"
                // variant="outline"
                >
                Sign in
              </Button>
            </div>
          </nav>
        </div>
      </header>
      {isLogin ? (
        <Login/>
      ): (
        <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col lg:flex-row items-center justify-between py-8 sm:py-12 md:py-16 lg:py-20">
          <div className="w-full lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-light text-[#2977c9] mb-8">
              Welcome to your professional community
            </h1>
            <div className="space-y-4 max-w-md">
              <button
                className="w-full flex items-center justify-center gap-2 bg-[#1a73e8] text-white rounded-full py-3 px-4 hover:bg-[#1557b0] transition-colors">
                <Image
                  src="/assets/Google.png"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5 shadow-lg" />
                  
                Continue with Google
              </button>
              <button
               onClick={() => setLogin(true)}
                className="w-full border-2 rounded-full py-3 px-4 text-gray-700 hover:bg-gray-50 transition-colors">
                Sign in with email
              </button>
              <p className="text-xs text-gray-600 mt-4">
                By clicking Continue to join or sign in, you agree to LinkedIn&apos;s{" "}
                <Link href="#" className="text-[#0a66c2] hover:underline">
                  User Agreement
                </Link>
                ,{" "}
                <Link href="#" className="text-[#0a66c2] hover:underline">
                  Privacy Policy
                </Link>
                , and{" "}
                <Link href="#" className="text-[#0a66c2] hover:underline">
                  Cookie Policy
                </Link>
                .
              </p>
              <p className="text-sm">
                New to LinkedIn?{" "}
                <Link href="#" className="text-[#0a66c2] hover:underline font-semibold">
                  Join now
                </Link>
              </p>
            </div>
          </div>
          <div className="w-full ">
            <Image
              src="/images/Image.jpg"
              alt="Professional working on laptop"
              width={1000}
              height={1000}
              className="w-full h-auto"
              priority />
          </div>
        </div>
      </main>
      )}
    </div>)
  );
}