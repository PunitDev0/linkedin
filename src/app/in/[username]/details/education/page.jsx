'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/experience/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/experience/card"
import { Separator } from "@/components/ui/experience/separator"
import { ChevronLeft, Edit, MessageCircle, Plus } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/router"
import { ConnectButton } from "@/components/connection-buttons"
export default function ExperiencePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setIsDarkMode(prefersDark)
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    (<div
      className={`min-h-screen py-5 ${isDarkMode ? 'dark bg-black text-white' : 'bg-white text-black'}`}>
      <div className="max-w-6xl mx-auto p-4 px-8 space-y-6">
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className={`${isDarkMode ? 'bg-[#1B1F23] border-gray-700' : ''}`}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Experience</CardTitle>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Image
                    src="/placeholder.svg"
                    alt="Company"
                    width={48}
                    height={48}
                    className="rounded" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">IT trainer Intern</h3>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm">Arth institute of commerce & vocational studies - Internship</p>
                    <p className="text-sm text-muted-foreground">Jan 2024 - Sep 2024 · 9 mos</p>
                   
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            <Card className={`${isDarkMode ? 'bg-[#1B1F23] border-gray-700' : ''} `}>
              <CardHeader>
                <CardTitle className="text-base">
                  <span
                    className="inline-block px-2 py-1 bg-yellow-500 text-black rounded text-xs font-semibold mr-2">Premium</span>
                  Your viewers also viewed
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    name: "Divyum Swami",
                    title: "Full Stack MERN Developer | Expert in MongoDB, Express...",
                    time: "2nd"
                  },
                  {
                    name: "Rahul Yadav",
                    title: "Full-Stack Developer | JavaScript,MongoDB,Express...",
                    time: "1st"
                  },
                  {
                    name: "Vishal Upadhyay",
                    title: "Web Developer at Air Ambulance India | Full Stack...",
                    time: "2nd"
                  },
                  {
                    name: "Saqlain Hussain",
                    title: "Passionate Self-Taught Full-Stack Developer | Open to...",
                    time: "2nd"
                  }
                ].map((person, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-4">
                      <Image
                        src="/placeholder.svg"
                        alt={person.name}
                        width={48}
                        height={48}
                        className="rounded-full" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm truncate">{person.name} · <span className="font-normal text-muted-foreground">{person.time}</span></h3>
                        <p className="text-sm text-muted-foreground truncate">{person.title}</p>
                      </div>
                    <div className="mt-2">
                      <ConnectButton/>
                      {/* <Button variant="outline" size="sm" className="w-full">
                        {index === 1 ? <MessageCircle className="h-4 w-4 mr-2" /> : null}
                        {index === 1 ? 'Message' : 'Connect'}
                      </Button> */}
                    </div>
                    </div>
                    {index < 3 && <Separator className="my-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>)
  );
}