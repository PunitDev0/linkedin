"use client";
import { useRouter } from 'next/navigation'
import { redirect } from 'next/navigation';
import { useState,useEffect, useRef } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/feed-ui/avatar"
import { Button } from "@/components/ui/feed-ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/feed-ui/card"
import { Input } from "@/components/ui/feed-ui/input"
import { Switch } from "@/components/ui/feed-ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/feed-ui/popover"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/feed-ui/dropdown-menu"
import { ThumbsUp, MessageSquare, Repeat2, Send, Image, Briefcase, FileText, MoreHorizontal } from 'lucide-react'
import { useDarkMode } from '../context/Context';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { useLoading } from '../context/Context';
import { LinkedInPost } from '@/components/linkedin-post-creator';
export default  function Feed() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState([])
  const [username, setUsername] = useState('');
  const [openPost, setopenPost] = useState(false);
  const [triggerFunction, setTriggerFunction] = useState(false);


  // const [loading, setLoading] = useState(true); // State to manage loading
  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get(`/api/feed`);
            setUserData(response.data.userInfo);
            console.log(response.data.userInfo);
        } catch (err) {
            console.log(err);
        }
    };
    fetchUserData();
}, []);

  useEffect(() => {
    if (status === 'loading') return; // Wait for session loading
    if (!session) router.push('/login'); // Redirect if not authenticated
  }, [status, session, router]);
    
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isLiked, setIsLiked] = useState(false)
  const [showComments, setShowComments] = useState(false) 
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([
    {
      id: 1,
      user: { name: "John Doe", avatar: "/placeholder-user.jpg" },
      content: "Great question! I always use str.length in my JavaScript projects.",
      timestamp: "2h ago"
    },
    {
      id: 2,
      user: { name: "Jane Smith", avatar: "/placeholder-user.jpg" },
      content: "Don't forget about the length property of arrays too!",
      timestamp: "1h ago"
    }
  ])

  const redirect = ()=>{
    router.push(`/in/${session.user.name}`)
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleComment = () => {
    setShowComments(!showComments)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        user: { name: "Current User", avatar: "/placeholder-user.jpg" },
        content: comment,
        timestamp: "Just now"
      }
      setComments([...comments, newComment])
      setComment('')
    }
  }
  const handleClick = () => {
    setopenPost(true)
    setTriggerFunction(prev => !prev); // Toggle state to trigger the function
  };

  // if (loading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="loader">Loading...</div> {/* Replace with your loader component or spinner */}
  //     </div>
  //   );
  // }

  return (
    (<div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-[#F4F2EE] dark:bg-black text-gray-900 dark:text-white p-4">

          {openPost && <LinkedInPost onTrigger={triggerFunction} setopenPost={setopenPost} />}

        <main className="container mx-auto flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/6">
            <Card className="bg-white dark:bg-[#1B1F23]">
              <CardHeader className="text-center" onClick={() => redirect()}>
                <Avatar className="w-20 h-20 mx-auto" >
                  <AvatarImage src={userData.image} alt="Punit Nigam" />
                  <AvatarFallback>PN</AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{`${userData.firstname} ${userData.lastname}`}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Full Stack Developer & MERN Stack Developer</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">New Delhi, Delhi</p>
              </CardHeader>
              <CardContent>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Profile viewers</p>
                  <p className="text-xl font-bold text-blue-600">54</p>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-semibold">Post impressions</p>
                  <p className="text-xl font-bold text-blue-600">683</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" /> Your Premium features
                </Button>
              </CardFooter>
            </Card>
          </aside>
          <section className="w-full md:w-1/2">
            <Card className="bg-white dark:bg-[#1B1F23] mb-4">
              

              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={userData.image} alt="User" />
                    <AvatarFallback>PN</AvatarFallback>
                  </Avatar>
                  <Input placeholder="Start a post" className="bg-gray-100 border-gray-500 dark:bg-[#1B1F23]" />
                </div>
                <div className="flex justify-between mt-4">
                  <Button variant="ghost" size="sm" onClick={handleClick} >
                    <Image className="mr-2 h-4 w-4" /> Media
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Briefcase className="mr-2 h-4 w-4" /> Job
                  </Button>
                  <Button variant="ghost" size="sm">
                    <FileText className="mr-2 h-4 w-4" /> Write article
                  </Button>
                </div>
              </CardContent>


            </Card>
            <Card className="bg-white dark:bg-[#1B1F23]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/placeholder-user.jpg" alt="Chandni Sharma" />
                      <AvatarFallback>CS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold">Chandni Sharma</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">3rd+</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">3m</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Save post</DropdownMenuItem>
                      <DropdownMenuItem>Hide post</DropdownMenuItem>
                      <DropdownMenuItem>Report post</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <p>All things Javascript JS, Typescript, NodeJS, React, Angular...</p>
                <p className="mt-2">JavaScript Certification Course :- https://lnkd.in/dAqv7Ts7</p>
                <div className="mt-4 bg-gray-100 dark:bg-[#1B1F23] p-4 rounded-lg">
                  <h4 className="font-bold mb-2">How do you find the length of a string in JavaScript?</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">The author can see how you vote. Learn more</p>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">a) str.size</Button>
                    <Button variant="outline" className="w-full justify-start">b) str.length</Button>
                    <Button variant="outline" className="w-full justify-start">c) str.count</Button>
                    <Button variant="outline" className="w-full justify-start">d) str.len</Button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">61 votes • 3d left</p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`${isLiked ? 'text-blue-500' : 'text-gray-500'}`}>
                  <ThumbsUp className="mr-2 h-4 w-4" /> Like
                </Button>
                <Button variant="ghost" size="sm" onClick={handleComment}>
                  <MessageSquare className="mr-2 h-4 w-4" /> Comment
                </Button>
                <Button variant="ghost" size="sm">
                  <Repeat2 className="mr-2 h-4 w-4" /> Repost
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Send className="mr-2 h-4 w-4" /> Send
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <h3 className="font-bold mb-2">Share with your network</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Avatar className="w-6 h-6 mr-2">
                          <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        John Doe
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Avatar className="w-6 h-6 mr-2">
                          <AvatarImage src="/placeholder-user.jpg" alt="Jane Smith" />
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        Jane Smith
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Avatar className="w-6 h-6 mr-2">
                          <AvatarImage src="/placeholder-user.jpg" alt="Bob Johnson" />
                          <AvatarFallback>BJ</AvatarFallback>
                        </Avatar>
                        Bob Johnson
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </CardFooter>
              {showComments && (
                <div className="px-4 pb-4">
                  <h4 className="font-bold mb-2">Comments</h4>
                  {comments.map((comment) => (
                    <div key={comment.id} className="flex items-start space-x-2 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                        <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 bg-gray-100 dark:bg-[#1B1F23] rounded-lg p-2">
                        <p className="font-semibold text-sm">{comment.user.name}</p>
                        <p className="text-sm">{comment.content}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{comment.timestamp}</p>
                      </div>
                    </div>
                  ))}
                  <form
                    onSubmit={handleCommentSubmit}
                    className="flex items-center space-x-2 mt-4">
                    <Input
                      type="text"
                      placeholder="Add a comment..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-grow bg-gray-100 dark:bg-[#1B1F23]" />
                    <Button type="submit" variant="secondary">Post</Button>
                  </form>
                </div>
              )}
            </Card>
          </section>
          <aside className="w-full md:w-1/4">
            <Card className="bg-white dark:bg-[#1B1F23]">
              <CardHeader>
                <h2 className="text-xl font-bold">LinkedIn News</h2>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-semibold">Indias top 20 startups</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">4d ago • 39,225 readers</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">IT hiring</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">4d ago • 19,877 readers</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">Gujarat semiconductor hub</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">4d ago • 15,552 readers</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">Wedding business</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">4d ago • 7,372 readers</p>
                  </li>
                  <li>
                    <h3 className="font-semibold">Farmers and climate change</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">4d ago • 5,667 readers</p>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full justify-start">
                  Show more
                </Button>
              </CardFooter>
            </Card>
          </aside>
        </main>
      </div>
    </div>)
  );
}