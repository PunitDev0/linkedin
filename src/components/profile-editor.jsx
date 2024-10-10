'use client'

import { useState } from 'react'
import { X, Info, Plus, Moon, Sun } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useDarkMode } from '@/app/context/DarkModeContext';
export default function ProfileEditor({setEdit}) {
  const { darkMode } = useDarkMode();
  const { register, handleSubmit, watch } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    // Handle your form submission logic here
  };

  return (
    <div className={`fixed inset-0 z-10`}>
      <div className="absolute h-screen inset-0 bg-black opacity-50 shadow-2xl"></div>

      <div
        className={`${
          darkMode ? 'bg-[#1B1F23] text-gray-200' : 'bg-white text-gray-800'
        } fixed h-[700px] z-20 p-6 rounded-lg shadow-lg lg:max-w-4xl  m-auto left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 overflow-x-hidden `}
      >
          <div className="flex justify-between items-center fixed mb-6 w-full">
            <h2 className="text-2xl font-bold">Edit intro</h2>
            <div className="flex items-center">
              <button
                className={`${
                  darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                } absolute right-10`}
                onClick={() => setEdit()}
                type="button"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 py-10`}>
            * Indicates required
          </p>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Basic info</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
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
                  {...register('firstName', { required: true })}
                  className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                  Last name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register('lastName', { required: true })}
                  className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
              </div>

              <div>
                <label htmlFor="additionalName" className="block text-sm font-medium mb-1">
                  Additional name
                </label>
                <input
                  type="text"
                  id="additionalName"
                  {...register('additionalName')}
                  className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
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
                  {...register('pronouns')}
                  className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Please select</option>
                  <option value="he/him">He/Him</option>
                  <option value="she/her">She/Her</option>
                  <option value="they/them">They/Them</option>
                </select>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                  Let others know how to refer to you.
                </p>
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
                {...register('headline')}
                className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 pr-24 focus:outline-none focus:border-blue-500`}
              />
              <button
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-white'} px-3 py-1 rounded text-sm font-medium flex items-center`}
              >
                <Plus size={16} className="mr-1" />
                Write with AI
                <span className="ml-1 text-xs text-orange-500 font-bold">PREMIUM</span>
              </button>
            </div>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
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
                {...register('currentPosition')}
                className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              >
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
                {...register('showCurrentCompany')}
                className="mr-2"
              />
              <label htmlFor="showCurrentCompany" className="text-sm">
                Show current company in my intro
              </label>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Industry*</h3>
            <input
              type="text"
              {...register('industry' )}
              className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
            />
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
              <a href="#" className="text-blue-400 hover:underline">
                Learn more about industry options
              </a>
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Other info</h3>
            <div>
              <label htmlFor="aboutMe" className="block text-sm font-medium mb-1">
                About me
              </label>
              <textarea
                id="aboutMe"
                {...register('aboutMe')}
                rows={3}
                className={`w-full ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                0/250 characters
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className={`${
                darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'
              } text-white font-bold py-2 px-4 rounded`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};