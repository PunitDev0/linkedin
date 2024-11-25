"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import ProfileModal from "./profile-modal"

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 640)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile);
  }, [])

  return isMobile
}

export default function Page() {
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  return (
    (<div className="p-4">
      <Button onClick={() => setIsOpen(true)}>Open Profile</Button>
      <ProfileModal isOpen={isOpen} onClose={() => setIsOpen(false)} isMobile={isMobile} />
    </div>)
  );
}

