'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/Login2/button"
import { Input } from "@/components/ui/Login2/input"
import { Label } from "@/components/ui/Login2/label"
import { Facebook, Twitter, Github, Moon, Sun,Linkedin } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter, redirect } from 'next/navigation';
import { useForm } from 'react-hook-form'
import axios from 'axios'
export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      if (isSignUp) {
        // Handle registration process
        const response = await axios.post('/api/register', data);
        console.log('Registration successful', response.data);
        setIsSignUp(false); // Optionally switch to login mode after successful registration
      } else {
        // Handle credentials-based login
        const result = await signIn("credentials", {
          redirect: true,
          email: data.email,
          password: data.password,
          callbackUrl: '/feed', // Redirect to /feed after successful login
        });
        if (result.error) {
          console.error(result.error); // Log the error if sign-in fails
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  
  // Handle provider-based sign-in (e.g., GitHub, Google)
  const handleProviderSignIn = (provider) => {
    // Use NextAuth to sign in with OAuth providers
    signIn(provider, { callbackUrl: '/feed' }); // Redirect to /feed after successful login
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile);
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  }

  return (
    (<div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div
      onSubmit={handleSubmit(onSubmit)}
        className="container mx-auto flex flex-col p-5 md:flex-row h-[100vh] items-center justify-center w-full">
        {/* form started */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className=" w-full md:w-2/3 lg:w-2/5 bg-white h-full  dark:bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg">
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold mb-2 dark:text-white">
                <Linkedin className="mx-auto h-12 w-12 text-blue-600" />
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-500 text-center dark:text-gray-400 mb-6">
            {isSignUp ? "Make your app management easy and fun!" : "Sign in to continue your journey"}
          </motion.p>
          <motion.form  onSubmit={handleSubmit(onSubmit)}  className="space-y-4">
            {isSignUp && (
              <motion.div >
                <Label htmlFor="username" className="dark:text-white">Username</Label>
                <Input
                  id="username"
                  {...register("username", { required: "Username is required" })}
                  placeholder="Username"
                  className="dark:bg-gray-700 dark:text-white" />
              </motion.div>
            )}
            <motion.div >
              <Label htmlFor="email" className="dark:text-white">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="dark:bg-gray-700 dark:text-white" />
            </motion.div>
            <motion.div >
              <Label htmlFor="password" className="dark:text-white">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  {...register("password", { required: "Password is required" })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="dark:bg-gray-700 dark:text-white" />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </motion.div>
            {isSignUp && (
              <motion.div variants={itemVariants} className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700" />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                  I agree to <a href="#" className="text-purple-600 hover:underline dark:text-purple-400">privacy policy & terms</a>
                </label>
              </motion.div>
            )}
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                {isSignUp ? "Sign Up" : "Sign In"}
              </Button>
            </motion.div>
          </motion.form>
          <motion.p
            variants={itemVariants}
            className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-purple-600 hover:underline dark:text-purple-400">
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </motion.p>
          <motion.div variants={containerVariants} className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span
                  className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">or</span>
              </div>
            </div>
            <motion.div variants={containerVariants} className="mt-6 grid grid-cols-4 gap-3">
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  className="w-full dark:border-gray-600 dark:text-gray-300">
                  <Facebook className="h-5 w-5 text-blue-600" />
                  <span className="sr-only">Facebook</span>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  className="w-full dark:border-gray-600 dark:text-gray-300">
                  <Twitter className="h-5 w-5 text-blue-400" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  onClick={() => handleProviderSignIn('github')}
                  className="w-full dark:border-gray-600 dark:text-gray-300">
                  <Github className="h-5 w-5 dark:text-white" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Button
                  variant="outline"
                  className="w-full dark:border-gray-600 dark:text-gray-300">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                    <path
                      fill="#34A853"
                      d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                    <path
                      fill="#4A90E2"
                      d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1818182,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                    <path
                      fill="#FBBC05"
                      d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                  </svg>
                  <span className="sr-only">Google</span>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
         
        </motion.div>
      </div>
    </div>)
  );
}