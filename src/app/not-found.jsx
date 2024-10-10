'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserCircle, Briefcase, GraduationCap, MapPin, Link as LinkIcon, Search, Sun, Moon } from 'lucide-react'
import { useDarkMode } from './context/DarkModeContext' 

gsap.registerPlugin(ScrollTrigger)

export default function NotFoundComponent() {
  const containerRef = useRef(null)
  const skillBarsRef = useRef(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [darkMode, setdarkMode] = useState(false)
  const { darkMode } = useDarkMode();

  useEffect(() => {
    if (containerRef.current) {
      const nodes = gsap.utils.toArray('.node')
      const lines = gsap.utils.toArray('.line')
      
      gsap.set(nodes, { scale: 0, opacity: 0 })
      gsap.set(lines, { opacity: 0, attr: { 'stroke-dasharray': '0,500' } })

      gsap.to(nodes, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      })

      gsap.to(lines, {
        opacity: 1,
        attr: { 'stroke-dasharray': '500,500' },
        duration: 1,
        stagger: 0.2,
        ease: "none"
      })

      gsap.to(nodes, {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.1
      })
    }

    if (skillBarsRef.current) {
      const skillBars = gsap.utils.toArray('.skill-bar')
      
      gsap.from(skillBars, {
        width: 0,
        duration: 1.5,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: skillBarsRef.current,
          start: "top 80%",
        }
      })
    }
  }, [])

  const profileVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: 'spring',
        damping: 15,
        stiffness: 100,
      }
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 12,
        stiffness: 100,
        staggerChildren: 0.08
      }
    },
  }

  const searchVariants = {
    closed: { width: '40px', background: darkMode ? '#ffffff' : '#0a66c2' },
    open: { width: '100%', background: darkMode ? '#2d333b' : '#ffffff' }
  }

  return (
    (<div
      className={`relative flex flex-col items-center justify-center min-h-[92vh] overflow-hidden ${darkMode ? 'bg-black text-white' : 'bg-[#f3f2ef] text-[#2977c9]'}`}
      ref={containerRef}>
      <motion.div
        className={`${darkMode ? 'bg-[#2d333b]' : 'bg-white'} rounded-lg shadow-lg p-8 m-4 w-full max-w-md z-10`}
        initial="hidden"
        animate="visible"
        variants={profileVariants}>
        <motion.div className="text-center" variants={textVariants}>
          <motion.div
            className={`text-6xl font-bold mb-4 ${darkMode ? 'text-[#58a6ff]' : 'text-[#b24020]'}`}
            variants={textVariants}
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5 } }}>
            404
          </motion.div>
          <motion.h1
            className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-[#000000]'}`}
            variants={textVariants}>
            Profile Not Found
          </motion.h1>
          <motion.div
            className="flex justify-center mb-4"
            variants={textVariants}
            whileHover={{ scale: 1.1, rotate: 360, transition: { duration: 0.5 } }}>
            <UserCircle size={64} className={darkMode ? 'text-white' : 'text-[#666666]'} />
          </motion.div>
          <motion.p
            className={darkMode ? 'text-[#8b949e] mb-4' : 'text-[#666666] mb-4'}
            variants={textVariants}>
            Oops! The profile youre looking for doesnt exist.
          </motion.p>
        </motion.div>

        <motion.div className="mb-6" variants={textVariants} ref={skillBarsRef}>
          <h2
            className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-[#000000]'}`}>Skills</h2>
          <div className="space-y-2">
            <div className={darkMode ? 'bg-[#30363d] rounded' : 'bg-[#e1e9ee] rounded'}>
              <div
                className={`skill-bar ${darkMode ? 'bg-[#58a6ff]' : 'bg-[#0a66c2]'} h-4 rounded`}
                style={{ width: '80%' }}>
                <span className="sr-only">80% proficiency in Skill 1</span>
              </div>
            </div>
            <div className={darkMode ? 'bg-[#30363d] rounded' : 'bg-[#e1e9ee] rounded'}>
              <div
                className={`skill-bar ${darkMode ? 'bg-[#58a6ff]' : 'bg-[#0a66c2]'} h-4 rounded`}
                style={{ width: '65%' }}>
                <span className="sr-only">65% proficiency in Skill 2</span>
              </div>
            </div>
            <div className={darkMode ? 'bg-[#30363d] rounded' : 'bg-[#e1e9ee] rounded'}>
              <div
                className={`skill-bar ${darkMode ? 'bg-[#58a6ff]' : 'bg-[#0a66c2]'} h-4 rounded`}
                style={{ width: '90%' }}>
                <span className="sr-only">90% proficiency in Skill 3</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="flex justify-between mb-6" variants={textVariants}>
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
            <Briefcase className={darkMode ? 'mr-2 text-white' : 'mr-2 text-[#666666]'} />
            <span className={darkMode ? 'text-white' : 'text-[#666666]'}>Experience</span>
          </motion.div>
          <motion.div
            className="flex items-center cursor-pointer"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}>
            <GraduationCap className={darkMode ? 'mr-2 text-white' : 'mr-2 text-[#666666]'} />
            <span className={darkMode ? 'text-white' : 'text-[#666666]'}>Education</span>
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center mb-4" variants={textVariants}>
          <MapPin className={darkMode ? 'mr-2 text-white' : 'mr-2 text-[#666666]'} />
          <span className={darkMode ? 'text-white' : 'text-[#666666]'}>Location Not Found</span>
        </motion.div>

        <motion.div className="flex items-center mb-6" variants={textVariants}>
          <LinkIcon className={darkMode ? 'mr-2 text-white' : 'mr-2 text-[#666666]'} />
          <span
            className={`${darkMode ? 'text-[#58a6ff]' : 'text-[#0a66c2]'} cursor-pointer hover:underline`}>website-not-found.com</span>
        </motion.div>

        <motion.div variants={textVariants} className="mb-6">
          <AnimatePresence>
            <motion.div
              className="relative"
              initial="closed"
              animate={isSearchOpen ? "open" : "closed"}
              variants={searchVariants}>
              <input
                type="text"
                placeholder={isSearchOpen ? "Search" : ""}
                className={`w-full h-10 pl-10 pr-4 rounded-full border ${darkMode ? 'border-white text-white bg-[#2d333b] placeholder-gray-400' : 'border-[#0a66c2] text-[#0a66c2]'} focus:outline-none focus:ring-2 ${darkMode ? 'focus:ring-white' : 'focus:ring-[#0a66c2]'} focus:border-transparent`}
                style={{ display: isSearchOpen ? 'block' : 'none' }} />
              <motion.button
                className={`absolute left-0 top-0 h-10 w-10 flex items-center justify-center ${darkMode ? 'text-[#1B1F23]' : 'text-white'} rounded-full`}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}>
                <Search size={20} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div variants={textVariants}>
          <Link href="/">
            <Button
              className={`w-full ${darkMode ? 'bg-[#58a6ff] hover:bg-[#388bfd]' : 'bg-[#0a66c2] hover:bg-[#004182]'} text-white transition-all duration-300 ease-in-out transform hover:scale-105`}>
              Back to Homepage
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      {/* <motion.button
        className={`fixed top-4 right-4 p-2 rounded-full ${darkMode ? 'bg-white text-[#1B1F23]' : 'bg-[#1B1F23] text-white'}`}
        onClick={() => setdarkMode(!darkMode)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}>
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button> */}
    </div>)
  );
}