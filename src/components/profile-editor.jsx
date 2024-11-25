"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { X, Info, Plus, Moon, Sun, Upload, RotateCw, Crop, GripVertical } from "lucide-react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { useDarkMode } from "@/app/context/Context";
import { LinkedLoader } from "./linkedin-loader";
import { Experience } from "./ProfileEditOption/experience";
import { EditProfile } from "./ProfileEditOption/EditProfile";
import { SkillsInputComponent } from "./ProfileEditOption/Skills";
import { About } from "./ProfileEditOption/About";
import { Phone } from "./ProfileEditOption/Phone";
import { Education } from "./ProfileEditOption/Education";
import useFetchUserData from "@/app/Hooks/UserFetchData";
import { setFormValues } from "../../utils/setFormValues";

export default function ProfileEditor({ setEdit, username, refreshData, setAbout, about}) {
  // const [loading, setLoading] = useState(false);
  const { userData, message, error, loading, fetchUserData } = useFetchUserData();
  const [activeSection, setActiveSection] = useState("editProfile");
  console.log(username);
  const { register, handleSubmit, control, setValue, getValues, formState: { errors }, watch} = useForm({
    defaultValues: {
      skills: ['skills', 'react'],
      newSkill: '',
    }
  
  });
  const { darkMode } = useDarkMode();
    useEffect(()=>{
      fetchUserData(username)
    },[username])

    console.log(userData.contact);
    
     // Set form values after user data is fetched
     useEffect(() => {
      if (userData) {
        setFormValues(setValue, userData); // Call the utility function
      }
    }, [userData, setValue]);

  const onSubmit = async (data) => {  
    console.log(data); 
    try {
      const response = await axios.post(`/api/user/${username}`, data); // Send the rest of the form data
      console.log("Profile updated successfully", response.data);
      refreshData()
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };



  return (
    <div className={`fixed inset-0 z-10`}>
      {/* Modal backdrop */}
      <div className="absolute h-screen inset-0 bg-black opacity-50 shadow-2xl"></div>

      <div
        className={`${
          darkMode ? "bg-[#1B1F23] text-gray-200" : "bg-white text-gray-800"
        } fixed sm:h-[600px] h-[100vh] z-20 rounded-lg shadow-lg lg:max-w-2xl w-[100%] md:w-[80%] lg:w-[60%] m-auto left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2 overflow-auto scrollbar-none`}
      >
       
        {/* Header with Edit button */}
        <div className="flex sticky top-0 border-b px-3 h-16 z-10 bg-[#1B1F23] justify-between items-center w-full">
          <h2 className="text-2xl font-bold">Edit intro</h2>
          <button
            className={`${
              darkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => {
              setEdit()
              setAbout(false)
            }}
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable content */}
        
        {/* Fixed Save button at the bottom */}
        {loading ? (
           <div className="h-screen flex items-center justify-center">
             <LinkedLoader />
          </div>
        ) : (
          about ? (
            <div className="overflow-x-auto px-4 py-6 h-full">
              <About 
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                darkMode={darkMode}
              />
              <SkillsInputComponent
                control={control}
                getValues={getValues}
                setValue={setValue}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                darkMode={darkMode}
              />
            </div>
          ) : (
            <div className="overflow-x-auto px-4 py-6">
              <p
                className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} mb-1`}
              >
                * Indicates required
              </p>
              {/* Conditional sections */}
              {activeSection === "editProfile" && (
                <EditProfile
                  darkMode={darkMode}
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  setValue={setValue}
                  setActiveSection={setActiveSection}
                />
              )}
                {activeSection === "position" && (
                 <Experience
                 darkMode={false}
                 register={register}
                 handleSubmit={handleSubmit}
                 onSubmit={onSubmit}
                 errors={errors}
                 watch={watch} // Pass watch to child component if needed
               />
                )}
              {activeSection === "phone" && (
                <Phone
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  darkMode={darkMode}
                />
              )}
              {activeSection === "education" && (
                <Education
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmit={onSubmit}
                  darkMode={darkMode}
                />
              )}
              <SkillsInputComponent
                control={control}
                getValues={getValues}
                setValue={setValue}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                darkMode={darkMode}
              />
            </div>
          )
        )}

          <div className="sticky bottom-0 border-t px-3 h-16 bg-[#1B1F23] flex justify-end items-center">
            <button
              className={`${
                darkMode
                  ? "text-gray-200 bg-green-600 hover:bg-green-700"
                  : "text-gray-800 bg-green-500 hover:bg-green-600"
              } px-4 py-2 rounded-lg`}
              onClick={handleSubmit(onSubmit)}
              type="submit"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
