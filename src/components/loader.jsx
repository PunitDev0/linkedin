"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"

export default function LinkedInLoader() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true"
    setDarkMode(isDarkMode)
  }, [])

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString())
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <button
        onClick={toggleDarkMode}
        className={`absolute top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-white text-black' : 'bg-black text-white'}`}
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>
      <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#0077B5]'}`}>LinkedIn</h1>
      <div className={`w-32 h-0.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-300'} relative overflow-hidden`}>
        <motion.div
          className={`w-full h-full ${darkMode ? 'bg-white' : 'bg-black'} absolute`}
          animate={{
            x: ["100%", "-100%", "100%"],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  )
}