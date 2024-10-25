'use client'

import React, { useState, useEffect } from 'react'
import { Edit, Plus, Eye, BarChart2, Search as SearchIcon, Moon, Sun, Pencil, Fullscreen } from 'lucide-react';
import { useDarkMode } from '@/app/context/Context'; 
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import ProfileEditor from '@/components/profile-editor';
import { BackgroudImageEdit } from '@/components/BackgroundImageUpload';
import { ProfilePhotoEditor } from '@/components/photo-editor';
export default function ProfilePage({params}) {
  const [background, setbackground] = useState(false)
  const [message, setMessage] = useState("");
  const [ProfileImage, setProfileImage] = useState(false);
  const [about, setAbout] = useState(false)
    const { username } = params;
    // console.log(username);
    const [userData, setUserData] = useState([])
    
    const { darkMode } = useDarkMode();
    const [edit, setEdit] = useState(false)

      const fetchUserData = async () => {
        try {
          const response = await axios.get(`/api/user/${username}`);
          setUserData(response.data);
          setMessage(response.data.message)
          console.log(response);
          ;
        } catch (err) {
          console.log(err);
          
        } 
      };
    useEffect(() => {
      if (username) {
        // Save the username to localStorage
        localStorage.setItem('username', username);
        fetchUserData();
      }
    }, [username]);

     // Function to refresh user data after update
  const refreshData = () => {
    fetchUserData(); // Re-fetch data to reflect updates
  };

    console.log(userData);
const {} = userData;


  return (
    (<div
      className="bg-gray-100 dark:bg-black min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {ProfileImage && <ProfilePhotoEditor setProfileImage={setProfileImage} 
        ProfileImage={ProfileImage}/>}
        {background && <BackgroudImageEdit setbackground={setbackground} username={username} refreshData={refreshData}/>}
        {edit && <ProfileEditor about={about} setAbout={setAbout} setEdit={setEdit} username={username} refreshData={refreshData}/>}

      <main className="container mx-auto px-4 py-8">
        <div
          className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="h-32 md:h-48 bg-[#1B1F23] dark:bg-[#1B1F23] relative">
            <Image
              src=""
              alt="Banner"
              width={120}
              height={120}
              className="w-full h-full object-cover" />
            <button
              className="absolute top-2 right-2 p-2 bg-white dark:bg-[#1B1F23] rounded-full shadow-md">
              <Pencil size={16} onClick={()=> setbackground(!background)} className="text-gray-600 dark:text-gray-300" />
            </button>
           
          </div>
          <div className="p-4 md:p-6 relative">
            <div
              className="absolute -top-16 left-4 md:left-6 w-32 h-32 rounded-full border-4 border-white dark:border-[#1B1F23] overflow-hidden">
                
              <img
                src={userData.image}
                alt="Punit Nigam"
                className="w-full h-full object-cover"
                onClick={()=>setProfileImage(true)}
                />
                
              <div
                className="absolute bottom-0 left-0 right-0 bg-green-500 text-white text-xs text-center py-1">
                OPEN TO WORK
              </div>
            </div>
            <div
              className="mt-16 md:mt-20 flex flex-col md:flex-row justify-between items-start">
                 <button
              className="absolute top-2 right-2 p-2 bg-white dark:bg-[#1B1F23] rounded-full shadow-md">
              <Pencil size={16} className="text-gray-600 dark:text-gray-300" onClick = {() => setEdit(!edit)} />
            </button>
              <div>
                <h1 className="text-2xl font-bold">{`${userData.firstname} ${userData.lastname}`}</h1>
                <p className="text-gray-600 dark:text-gray-400">Full Stack Developer & MERN Stack Developer</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">New Delhi, Delhi, India · Contact info</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">257 followers · 229 connections</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                <button
                  className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm hover:bg-blue-700 transition-colors duration-200">Open to</button>
                <button
                  className="border border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 px-4 py-1 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200">Add profile section</button>
                <button
                  className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 px-4 py-1 rounded-full text-sm hover:bg-gray-50 dark:hover:bg-[#1B1F23] transition-colors duration-200">More</button>
              </div>
            </div>
            <div className="mt-4 bg-blue-50 dark:bg-blue-900 p-4 rounded-lg">
              <p className="text-sm font-semibold">Open to work</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Full Stack Developer, Web Developer and Frontend Developer roles</p>
              <a
                href="#"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline">Show details</a>
            </div>
          </div>
        </div>

        <div className="md:flex md:space-x-6">
          <div className="md:w-2/3">
            <div
              className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                Analytics
                <span className="text-xs text-gray-500 dark:text-gray-400">Private to you</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center">
                    <Eye className="mr-2 text-gray-400 dark:text-gray-500" size={20} />
                    <span className="font-semibold">46 profile views</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Discover whos viewed your profile.</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <BarChart2 className="mr-2 text-gray-400 dark:text-gray-500" size={20} />
                    <span className="font-semibold">419 post impressions</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Check out whos engaging with your posts.</p>
                </div>
                <div>
                  <div className="flex items-center">
                    <SearchIcon className="mr-2 text-gray-400 dark:text-gray-500" size={20} />
                    <span className="font-semibold">15 search appearances</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">See how often you appear in search results.</p>
                </div>
              </div>
            </div>

            <div
              className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                About
                <Edit className="text-gray-400 dark:text-gray-500 cursor-pointer" size={20}
                 onClick={() => {
                  setAbout(true);
                  setEdit(!edit);
                }} />
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Passionate Front-End & Back-End Specialist with expertise in HTML, CSS, React, Tailwind CSS, PHP, MySQL, and MongoDB. 
                I excel at transforming ideas into engaging, responsive web solutions. With a strong foundation in both design and 
                development, I create seamless user experiences that are visually appealing and functionally robust. Dedicated to 
                continuous learning and staying at the forefront of web technologies to deliver innovative and impactful projects.
              </p>
            </div>

            <div
              className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                Experience
                <Plus className="text-gray-400 dark:text-gray-500 cursor-pointer" size={20} />
              </h2>
              <div className="space-y-6">
                <div className="flex">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Company Logo"
                    className="w-12 h-12 rounded" />
                  <div className="ml-4">
                    <h3 className="font-semibold">Full Stack Developer</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">TechCorp Solutions</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Jan 2022 - Present · 1 yr 6 mos</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">New Delhi, India</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Developed and maintained web applications using React, Node.js, and MongoDB.
                      Implemented RESTful APIs and improved application performance by 30%.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Company Logo"
                    className="w-12 h-12 rounded" />
                  <div className="ml-4">
                    <h3 className="font-semibold">Frontend Developer</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">WebDesign Pro</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Jun 2020 - Dec 2021 · 1 yr 7 mos</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">Gurgaon, India</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      Created responsive and interactive user interfaces using HTML, CSS, and JavaScript.
                      Collaborated with UX designers to implement pixel-perfect designs.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                Activity
                <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm">Create a post</button>
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">257 followers</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 px-3 py-1 rounded-full text-sm transition-colors duration-200">Posts</button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1B1F23] px-3 py-1 rounded-full text-sm transition-colors duration-200">Comments</button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1B1F23] px-3 py-1 rounded-full text-sm transition-colors duration-200">Images</button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1B1F23] px-3 py-1 rounded-full text-sm transition-colors duration-200">Videos</button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1B1F23] px-3 py-1 rounded-full text-sm transition-colors duration-200">Documents</button>
              </div>
            </div>

            <div
              className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex justify-between items-center">
                Skills
                <div className="flex items-center space-x-2">
                  <Plus className="text-gray-400 dark:text-gray-500 cursor-pointer" size={20} />
                  <Edit className="text-gray-400 dark:text-gray-500 cursor-pointer" size={20} />
                </div>
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">HTML/CSS</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">IT trainer at Arth Institute of commerce & vocational studies</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Endorsed by 1 person in the last 6 months</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">1 endorsement</p>
                </div>
                <div>
                  <h3 className="font-semibold">Graphic Design Principles</h3>
                </div>
              </div>
              <a
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm block mt-4">Show all 24 skills</a>
            </div>

            <div
              className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Interests</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                <button
                  className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900 px-3 py-1 rounded-full text-sm transition-colors duration-200">Top Voices</button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1B1F23] px-3 py-1 rounded-full text-sm transition-colors duration-200">Companies</button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1B1F23] px-3 py-1 rounded-full text-sm transition-colors duration-200">Groups</button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1B1F23] px-3 py-1 rounded-full text-sm transition-colors duration-200">Newsletters</button>
                <button
                  className="text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#1B1F23] px-3 py-1 rounded-full text-sm transition-colors duration-200">Schools</button>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="Ranveer Allahbadia"
                    className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold">Ranveer Allahbadia</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Founder at BeerBiceps Media World Pvt. Ltd. | Forbes 30 under 30</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">1,392,629 followers</p>
                    <button
                      className="mt-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs hover:bg-blue-700 transition-colors duration-200">
                      Following
                    </button>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <img
                    src="/placeholder.svg?height=48&width=48"
                    alt="PRINCE KUMAR"
                    className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="font-semibold">PRINCE KUMAR</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Software Engineer 2 @Servicenow | Top Voice24 | Ex- Browserstack | Backend Developer | DSA | Competitive Programmer | 21k+ LinkedIn Members</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">8k+ Members on JobEngine</p>
                    <button
                      className="mt-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 px-3 py-1 rounded-full text-xs hover:bg-gray-100 dark:hover:bg-[#1B1F23] transition-colors duration-200">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="md:w-1/3">
            <div
              className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Profile language</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">English</p>
            </div>

            <div
              className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6 mb-6">
              <h2 className="text-lg font-semibold mb-4">Public profile & URL</h2>
              <p className="text-sm text-blue-600 dark:text-blue-400 hover:underline">www.linkedin.com/in/punitdev0</p>
            </div>

            <div className="bg-white dark:bg-[#1B1F23] rounded-lg shadow-sm p-4 md:p-6">
              <h2 className="text-lg font-semibold mb-4">People you may know</h2>
              <ul className="space-y-4">
                {['Ashu Pundir', 'Rahul Yadav', 'Omendra Tiwari', 'Ankit Chakraborty'].map((name) => (
                  <li key={name} className="flex items-center space-x-2">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt={name}
                      className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-semibold">{name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Full Stack Developer</p>
                      <button
                        className="mt-1 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors duration-200">
                        Connect
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>)
  );
}