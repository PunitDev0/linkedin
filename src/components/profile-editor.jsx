'use client'

import { useState } from 'react'
import { X, Info, Plus, Moon, Sun } from 'lucide-react';
import { useDarkMode } from '@/app/context/DarkModeContext';
export default function ProfileEditor({setEdit}) {
  // const [darkMode, setdarkMode] = useState(false)
  const [firstName, setFirstName] = useState('Punit')
  const [lastName, setLastName] = useState('Nigam')
  const [additionalName, setAdditionalName] = useState('')
  const [pronouns, setPronouns] = useState('')
  const [headline, setHeadline] = useState('Full Stack Developer & MERN Stack Developer')
  const [currentPosition, setCurrentPosition] = useState('It trainer at Arth Institute of commerce & vocational studies')
  const [showCurrentCompany, setShowCurrentCompany] = useState(true)
  const [industry, setIndustry] = useState('IT Services and IT Consulting')
  const [school, setSchool] = useState('GBSSS No.3')
  const [showSchool, setShowSchool] = useState(true)
  const [country, setCountry] = useState('India')
  const [city, setCity] = useState('New Delhi, Delhi')
  const { darkMode } = useDarkMode();


  return (
    (
      <div
      className={`fixed inset-0 z-10 `}
    >
     <div className="absolute h-screen inset-0 bg-black opacity-50 shadow-2xl"></div> 
    
    <div
      className={`${darkMode ? 'bg-[#1B1F23] text-gray-200' : 'bg-white text-gray-800'} fixed h-[700px] overflow-auto z-20 p-6 rounded-lg shadow-lg max-w-2xl m-auto left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden`}>
      <div className="flex justify-between items-center fixed mb-6 w-full">
        <h2 className="text-2xl font-bold">Edit intro</h2>
        <div className="flex items-center">
         
          <button
            className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} absolute right-10`} onClick={()=> setEdit()}>
            <X size={24} />
          </button>
        </div>
      </div>
      <p
        className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 py-10`}>* Indicates required</p>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Basic info</h3>
        <p
          className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
          If you change your name, you may have to re-verify in order to keep your verification.{' '}
          <a href="#" className="text-blue-400 hover:underline">
            Learn more
          </a>
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
              First name*
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`} />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
              Last name*
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`} />
          </div>

          <div>
            <label htmlFor="additionalName" className="block text-sm font-medium mb-1">
              Additional name
            </label>
            <input
              type="text"
              id="additionalName"
              value={additionalName}
              onChange={(e) => setAdditionalName(e.target.value)}
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`} />
          </div>

          <div>
            <label htmlFor="namePronunciation" className="block text-sm font-medium mb-1">
              Name pronunciation
            </label>
            <div className="flex items-center text-sm text-gray-400">
              <Info size={16} className="mr-2" />
              This can only be added using our mobile app
            </div>
          </div>

          <div>
            <label htmlFor="pronouns" className="block text-sm font-medium mb-1">
              Pronouns
            </label>
            <select
              id="pronouns"
              value={pronouns}
              onChange={(e) => setPronouns(e.target.value)}
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}>
              <option value="">Please select</option>
              <option value="he/him">He/Him</option>
              <option value="she/her">She/Her</option>
              <option value="they/them">They/Them</option>
            </select>
            <p
              className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>Let others know how to refer to you.</p>
            <a href="#" className="text-sm text-blue-400 hover:underline">
              Learn more about gender pronouns
            </a>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Headline*</h3>
        <div className="relative">
          <input
            type="text"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 pr-24 focus:outline-none focus:border-blue-500`} />
          <button
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'} px-3 py-1 rounded text-sm font-medium flex items-center`}>
            <Plus size={16} className="mr-1" />
            Write with AI
            <span className="ml-1 text-xs text-orange-500 font-bold">PREMIUM</span>
          </button>
        </div>
        <p
          className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          Review and edit the AI draft before saving so it reflects you.{' '}
          <a href="#" className="text-blue-400 hover:underline">
            Learn more
          </a>
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Current position</h3>
        <div>
          <label htmlFor="currentPosition" className="block text-sm font-medium mb-1">
            Position*
          </label>
          <select
            id="currentPosition"
            value={currentPosition}
            onChange={(e) => setCurrentPosition(e.target.value)}
            className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}>
            <option value="It trainer at Arth Institute of commerce & vocational studies">
              It trainer at Arth Institute of commerce & vocational studies
            </option>
          </select>
        </div>
        <button className="mt-2 text-blue-400 hover:underline flex items-center">
          <Plus size={16} className="mr-1" />
          Add new position
        </button>
        <div className="mt-2 flex items-center">
          <input
            type="checkbox"
            id="showCurrentCompany"
            checked={showCurrentCompany}
            onChange={(e) => setShowCurrentCompany(e.target.checked)}
            className="mr-2" />
          <label htmlFor="showCurrentCompany" className="text-sm">
            Show current company in my intro
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Industry*</h3>
        <input
          type="text"
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`} />
        <p
          className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          <a href="#" className="text-blue-400 hover:underline">
            Learn more about industry options
          </a>
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Education</h3>
        <div>
          <label htmlFor="school" className="block text-sm font-medium mb-1">
            School*
          </label>
          <select
            id="school"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}>
            <option value="GBSSS No.3">GBSSS No.3</option>
          </select>
        </div>
        <button className="mt-2 text-blue-400 hover:underline flex items-center">
          <Plus size={16} className="mr-1" />
          Add new education
        </button>
        <div className="mt-2 flex items-center">
          <input
            type="checkbox"
            id="showSchool"
            checked={showSchool}
            onChange={(e) => setShowSchool(e.target.checked)}
            className="mr-2" />
          <label htmlFor="showSchool" className="text-sm">
            Show school in my intro
          </label>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Location</h3>
        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">
            Country/Region*
          </label>
          <input
            type="text"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`} />
        </div>
        <div className="mt-4">
          <label htmlFor="city" className="block text-sm font-medium mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`} />
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Contact info</h3>
        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Add or edit your profile URL, email, and more
        </p>
        <button className="mt-2 text-blue-400 hover:underline">
          Edit contact info
        </button>
      </div>
      <div className="flex justify-end fixed">
        <button
          className="bg-blue-500 text-white px-4 py-2  z-40 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          Save
        </button>
      </div>
    </div>
  </div>

  )
  );
}