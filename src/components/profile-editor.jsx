"use client";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useDarkMode } from "@/app/context/Context";
import { LinkedLoader } from "./linkedin-loader";
import { About } from "./ProfileEditOption/About";
import { SkillsInputComponent } from "./ProfileEditOption/Skills";
import { EditProfile } from "./ProfileEditOption/EditProfile";
import { Experience } from "./ProfileEditOption/experience";
import { Phone } from "./ProfileEditOption/Phone";
import { Education } from "./ProfileEditOption/Education";
import useFetchUserData from "@/app/Hooks/UserFetchData";
import { setFormValues } from "../../utils/setFormValues";

export default function ProfileEditor({
  setEdit,
  username,
  refreshData,
  setAbout,
  about,
}) {
  const { userData, loading, fetchUserData } = useFetchUserData();
  const [activeSection, setActiveSection] = useState("editProfile");

  const { register, handleSubmit, control, setValue, getValues, formState: { errors }, watch } = useForm({
    defaultValues: {
      skills: ["skills", "react"],
      newSkill: "",
    },
  });
  const { darkMode } = useDarkMode();

  useEffect(() => {
    fetchUserData(username);
  }, [username]);

  useEffect(() => {
    if (userData) {
      setFormValues(setValue, userData);
    }
  }, [userData, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`/api/user/${username}`, data);
      console.log("Profile updated successfully", response.data);
      refreshData();
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Modal backdrop */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Modal */}
      <div
        className={`${
          darkMode ? "bg-[#1B1F23] text-gray-200" : "bg-white text-gray-800"
        } fixed sm:h-[600px] h-[95vh] z-50 rounded-lg shadow-lg w-[90%] sm:w-[80%] md:w-[60%] lg:w-[50%] overflow-hidden flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-opacity-90 sticky top-0 z-10">
          <h2 className="text-2xl font-bold">Edit Profile</h2>
          <button
            onClick={() => {
              setEdit();
              setAbout(false);
            }}
            type="button"
            className={`${
              darkMode
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          {loading ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
              <LinkedLoader />
            </div>
          ) : about ? (
            <>
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
            </>
          ) : (
            <>
              <p
                className={`text-sm ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                } mb-1`}
              >
                * Indicates required
              </p>
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
                  watch={watch}
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
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-opacity-90 sticky bottom-0 z-10">
          <button
            onClick={handleSubmit(onSubmit)}
            type="submit"
            className={`${
              darkMode
                ? "text-gray-200 bg-green-600 hover:bg-green-700"
                : "text-gray-800 bg-green-500 hover:bg-green-600"
            } px-4 py-2 rounded-lg w-full`}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
