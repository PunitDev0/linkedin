"use client"

import { useState, useEffect } from 'react'
import { Bell, Home, MessageSquare, Search, Users, Briefcase, Moon, Sun } from 'lucide-react'
import { Button } from "@/components/ui/nav-ui/button"
import { Input } from "@/components/ui/nav-ui/input"
import { useDarkMode } from '@/app/context/DarkModeContext'
export default function NavbarComponent() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { darkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 640)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [])

  return (
    (<nav
      className="bg-white dark:bg-[#1B1F23] w-full shadow-md border-t border-b border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center  justify-between h-14">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-blue-600 dark:text-blue-400"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div
              className={`ml-4 ${isSmallScreen && !isSearchOpen ? 'hidden' : 'block'} transition-all duration-300 ease-in-out`}>
              <Input
                type="text"
                placeholder="Search"
                className="w-full sm:w-64 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isSmallScreen && !isSearchOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              <Home className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              <Users className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              <Briefcase className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
    </nav>)
  );
}