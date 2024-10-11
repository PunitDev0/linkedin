'use client'

import { useState } from 'react'
import { X, Info, Plus, Moon, Sun } from 'lucide-react';
import { useForm, Controller } from 'react-hook-form'
import { useDarkMode } from '@/app/context/DarkModeContext';
export default function ProfileEditor({setEdit}) {
  const { register, handleSubmit, watch } = useForm();
  const { darkMode } = useDarkMode();
  const [ExperienceActive,setExperienceActive] = useState(false);
  // Function to handle form submission
  const onSubmit = (data) => {
    console.log('Form Data:', data);
    // You can perform any action with form data, like API call, etc.
  };

  return (
    <div className={`fixed inset-0 z-10`}>
      <div className="absolute h-screen inset-0 bg-black opacity-50 shadow-2xl"></div>

      <div
        className={`${
          darkMode ? 'bg-[#1B1F23] text-gray-200' : 'bg-[#0D0F11] text-gray-800'
        } fixed h-[600px] z-20 px-6 rounded-lg shadow-lg lg:max-w-4xl w-[90%] md:w-[80%] lg:w-[60%] m-auto left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 overflow-auto scrollbar-none`}
        
      >
             <div className="flex sticky top-0 h-16 z-10 bg-[#1B1F23] justify-between items-center  w-full ">
              <h2 className="text-2xl font-bold">Edit intro</h2>
              <div className="flex items-center">
                <button
                  className={`${
                    darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'
                  } absolute right-1`}
                  onClick={() => setEdit()}
                  type="button"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
        <div  className='overflow-x-auto'>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1 py-10`}>
            * Indicates required
          </p>

          {ExperienceActive ? null : <EditProfile darkMode={darkMode} setExperienceActive={setExperienceActive} ExperienceActive={ExperienceActive} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>}
          {ExperienceActive && <Experience setExperienceActive={setExperienceActive} register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}/>}

          <div className="flex sticky top-0 h-16 z-10 bg-[#1B1F23] justify-between items-center  w-full">
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className={`${
              darkMode ? 'bg-blue-600 hover:bg-blue-500' : 'bg-blue-500 hover:bg-blue-400'
            } text-white font-bold py-2 px-4 rounded`}
          >
            Save
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export const EditProfile = ({darkMode,setExperienceActive, ExperienceActive,register, handleSubmit, onSubmit})=>{

  return(
    <>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
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
                  className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
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
                  className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
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
                  className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
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
                  className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
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
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 pr-24 focus:outline-none focus:border-blue-500`}
              />
              <button
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${darkMode ? 'bg-gray-200 text-gray-800' : 'bg-[#0D0F11] text-white'} px-3 py-1 rounded text-sm font-medium flex items-center`}
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
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              >
                <option value="It trainer at Arth Institute of commerce & vocational studies">
                  It trainer at Arth Institute of commerce & vocational studies
                </option>
              </select>
            </div>
            <button
             className="mt-2 text-blue-400 hover:underline flex items-center"
             onClick={()=>setExperienceActive(!ExperienceActive)}
             >
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
              className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
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
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                0/250 characters
              </p>
            </div>
          </div>
      </form>
    </>
  )
}

export const Experience = ({darkMode,register, handleSubmit, onSubmit})=>{
  const { watch } = useForm()
  const isCurrentlyWorking = watch('isCurrentlyWorking')
  return(
    <>
       <form onSubmit={handleSubmit(onSubmit)} className="p-6 pb-24">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>* Indicates required</p>

          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title*
              </label>
              <input
                {...register('title', { required: true })}
                type="text"
                id="title"
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
            </div>

            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium mb-1">
                Employment type
              </label>
              <select
                {...register('employmentType')}
                id="employmentType"
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              >
                <option value="">Please select</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="self-employed">Self-employed</option>
                <option value="freelance">Freelance</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
                <option value="apprenticeship">Apprenticeship</option>
                <option value="seasonal">Seasonal</option>
              </select>
            </div>

            <div>
              <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                Company name*
              </label>
              <input
                {...register('companyName', { required: true })}
                type="text"
                id="companyName"
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
            </div>

            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="startDate" className="block text-sm font-medium mb-1">
                  Start date*
                </label>
                <input
                  {...register('startDate', { required: true })}
                  type="date"
                  id="startDate"
                  className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
              </div>
              {!isCurrentlyWorking && (
                <div className="flex-1">
                  <label htmlFor="endDate" className="block text-sm font-medium mb-1">
                    End date
                  </label>
                  <input
                    {...register('endDate')}
                    type="date"
                    id="endDate"
                    className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center">
              <input
                {...register('isCurrentlyWorking')}
                type="checkbox"
                id="isCurrentlyWorking"
                className="mr-2"
              />
              <label htmlFor="isCurrentlyWorking" className="text-sm">
                I am currently working in this role
              </label>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium mb-1">
                Location
              </label>
              <input
                {...register('location')}
                type="text"
                id="location"
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
            </div>

            <div>
              <label htmlFor="locationType" className="block text-sm font-medium mb-1">
                Location type
              </label>
              <select
                {...register('locationType')}
                id="locationType"
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              >
                <option value="">Please select</option>
                <option value="on-site">On-site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={4}
                className={`w-full ${darkMode ? 'bg-[#0D0F11] border-gray-700' : 'bg-[#0D0F11] border-gray-300'} border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              ></textarea>
            </div>
          </div>
        </form>

    </>
  )
}