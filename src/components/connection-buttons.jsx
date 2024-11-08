'use client';
import React from 'react'
import { Button } from "@/components/ui/button"
import { UserPlus, MessageCircle } from "lucide-react"

export function ConnectButton({
  onClick
}) {
  const [isPending, setIsPending] = React.useState(false)

  const handleClick = () => {
    if (!isPending) {
      setIsPending(true)
      onClick?.()
      // Simulating an API call
      setTimeout(() => {
        setIsPending(false)
      }, 2000)
    }
  }

  return (
    (<Button variant="outline" size="sm" onClick={handleClick} className="w-28">
      {isPending ? (
        'Pending'
      ) : (
        <>
          <UserPlus className="mr-2 h-4 w-4" />
          Connect
        </>
      )}
    </Button>)
  );
}

export function MessageButton({
  onClick
}) {
  return (
    (<Button variant="outline" size="sm" onClick={onClick} className="w-28">
      <MessageCircle className="mr-2 h-4 w-4" />Message
          </Button>)
  );
}

export function ConnectionButtonsComponent() {
  return (
    (<div className="flex space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
      <ConnectButton onClick={() => console.log('Connect clicked')} />
      <MessageButton onClick={() => console.log('Message clicked')} />
    </div>)
  );
}