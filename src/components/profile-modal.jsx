"use client";
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function ProfileModal({
  isOpen,
  onClose,
  isMobile
}) {
  return (
    (<Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`bg-zinc-900 text-white border-zinc-800 ${
          isMobile
            ? 'rounded-none w-full h-full max-w-none animate-in slide-in-from-bottom duration-300'
            : 'max-w-md sm:rounded-lg sm:max-h-[90vh] sm:h-auto'
        } overflow-y-auto`}>
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Punit Kumar</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              onClick={onClose}>
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-5 text-zinc-400">📱</div>
              <div>
                <div className="font-medium">Phone</div>
                <div className="text-sm text-zinc-400">8376905677 (Home)</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 text-zinc-400">📍</div>
              <div>
                <div className="font-medium">Address</div>
                <div className="text-sm text-zinc-400">New Delhi - 110044</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 text-zinc-400">✉️</div>
              <div>
                <div className="font-medium">Email</div>
                <div className="text-sm text-zinc-400">punitdeveloper1@gmail.com</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 text-zinc-400">🎂</div>
              <div>
                <div className="font-medium">Birthday</div>
                <div className="text-sm text-zinc-400">January 1</div>
              </div>
            </div>
          </div>

          {/* Premium Promotion */}
          <Card className="bg-zinc-800 border-zinc-700">
            <CardContent className="p-4 space-y-4">
              <h3 className="font-semibold">Enhance your profile with AI-powered suggestions</h3>
              <p className="text-sm text-zinc-400">
                Members can receive up to 2x as many opportunities with a stronger profile.
              </p>
              <div className="flex items-center gap-1">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6 -ml-2">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <span className="text-sm text-zinc-400">Jasper and millions of other members use Premium</span>
              </div>
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                Reactivate Premium
              </Button>
              <p className="text-xs text-zinc-400 text-center">Cancel anytime, for any reason.</p>
            </CardContent>
          </Card>

          {/* Social Sharing */}
          <div className="space-y-4">
            <h3 className="font-semibold">Sharing on socials</h3>
            <div className="flex items-start gap-3">
              <div className="w-5 text-zinc-400">🔗</div>
              <div>
                <div className="font-medium">Follow link</div>
                <div className="text-sm text-zinc-400">
                  Get a personalized link or button to share on your channels or websites.
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>)
  );
}

