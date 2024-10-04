'use client'; // Required for client-side rendering

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'boxicons/css/boxicons.min.css';
import { Button } from "@/components/ui/Auth-ui/button";
import { Input } from "@/components/ui/Auth-ui/input";
import { Label } from "@/components/ui/Auth-ui/label";
import { Checkbox } from "@/components/ui/Auth-ui/checkbox";
import { Linkedin, Github, Twitter, Mail, Lock, User, Eye, EyeOff, Google } from 'lucide-react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

export default function LinkedinAuth() {
  // const { data: session, status } = useSession();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm();
    
    const onSubmit = async (data) => {
      setErrorMessage('');
      console.log(data);
      
      try {
        if(isLogin){
          const response = await axios.post('/api/login', data);
          console.log(response);
          setLoading(true);
          // Automatically redirect to the Feed page
          router.push('/feed'); 
        }else{
          const response = await axios.post('/api/register', data);
          setIsLogin(true)
          setSuccessMessage(response.data.message);
        }
      } catch (error) {
          setErrorMessage("An error occurred during authentication."+ error);
      }
  };
    
    const toggleLogin = () => setIsLogin(!isLogin);

    const handleProviderSignIn = (provider) => {
      signIn(provider); // Use NextAuth to sign in with OAuth providers
    };
   

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <div className="text-center"  >
          <motion.div whileHover={{ scale: 1.1, rotate: 360 }} transition={{ duration: 0.5 }}>
            <Linkedin className="mx-auto h-12 w-12 text-blue-600" />
          </motion.div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
        </div>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="email-address" className="sr-only">
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="email-address"
                  {...register("email", { required: true })}
                  type="email"
                  autoComplete="email"
                  className="pl-10"
                  placeholder="Email address" />
              </div>
              {errors.email && <p className="text-red-500">Email is required.</p>}
            </div>
            <div>
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  id="password"
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className="pl-10 pr-10"
                  placeholder="Password" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-red-500">Password is required.</p>}
            </div>
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}>
                  <div>
                    <Label htmlFor="username" className="sr-only">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <Input
                        id="full-name"
                        {...register("username", { required: true })}
                        type="text"
                        autoComplete="name"
                        className="pl-10"
                        placeholder="Full Name" />
                    </div>
                    {errors.fullName && <p className="text-red-500">Full Name is required.</p>}
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

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <Button variant="outline" className="flex items-center space-x-2"  onClick={() => handleProviderSignIn('google')}>
              <i className='bx bxl-google text-2xl'></i>
              <span>Google</span>
            </Button>
            <Button variant="outline" onClick={() => signIn("github")} className="flex items-center space-x-2">
              <i className='bx bxl-github text-2xl'></i>
              <span>Github</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <i className='bx bxl-twitter text-2xl'></i>
              <span>Twitter</span>
            </Button>
          </div>
        </div>

        <div className="text-sm text-center">
          <span>
            {isLogin ? 'Don’t have an account?' : 'Already have an account?'}
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500 ml-1"
              onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </span>
        </div>
      </motion.div>
    </div>
  );
}
