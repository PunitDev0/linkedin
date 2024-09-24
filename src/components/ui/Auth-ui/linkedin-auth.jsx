'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/Auth-ui/button"
import { Input } from "@/components/ui/Auth-ui/input"
import { Label } from "@/components/ui/Auth-ui/label"
import { Checkbox } from "@/components/ui/Auth-ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Auth-ui/tabs"
import { Linkedin, Github, Twitter, Mail, Lock, User, Briefcase, Phone, Eye, EyeOff } from 'lucide-react'

export default function LinkedinAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [headline, setHeadline] = useState('')

  useEffect(() => {
    // Simulating loading of user preferences
    const timer = setTimeout(() => {
      setEmail('user@example.com')
    }, 1000)
    return () => clearTimeout(timer);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulating form submission
    console.log('Form submitted:', { email, password, fullName, headline })
  }

  return (
    (<div
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center">
          <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }}>
            <Linkedin className="mx-auto h-12 w-12 text-blue-600" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="phone">Phone</TabsTrigger>
          </TabsList>
          <TabsContent value="email">
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md shadow-sm space-y-4">
                <div>
                  <Label htmlFor="email-address" className="sr-only">
                    Email address
                  </Label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20} />
                    <Input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20} />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      required
                      className="pl-10 pr-10"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)} />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>
                <AnimatePresence>
                  {!isLogin && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}>
                      <div>
                        <Label htmlFor="full-name" className="sr-only">
                          Full Name
                        </Label>
                        <div className="relative">
                          <User
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20} />
                          <Input
                            id="full-name"
                            name="full-name"
                            type="text"
                            autoComplete="name"
                            required
                            className="pl-10"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)} />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="headline" className="sr-only">
                          Headline
                        </Label>
                        <div className="relative">
                          <Briefcase
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20} />
                          <Input
                            id="headline"
                            name="headline"
                            type="text"
                            required
                            className="pl-10"
                            placeholder="Headline (e.g., Job Title)"
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {isLogin && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Checkbox id="remember-me" />
                    <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </Label>
                  </div>
                  <div className="text-sm">
                    <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
              )}

              <div>
                <Button type="submit" className="w-full flex justify-center py-2 px-4">
                  {isLogin ? 'Sign in' : 'Sign up'}
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="phone">
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20} />
              <Input type="tel" placeholder="Phone number" className="pl-10" />
            </div>
            <Button className="w-full mt-4">
              {isLogin ? 'Sign in with Phone' : 'Sign up with Phone'}
            </Button>
          </TabsContent>
        </Tabs>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="w-full">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="w-full">
                <Twitter className="h-5 w-5 text-blue-400" />
                <span className="sr-only">Twitter</span>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" className="w-full">
                <Linkedin className="h-5 w-5 text-blue-600" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </motion.div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-600 hover:text-blue-500 transition-colors duration-300">
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>)
  );
}