import { X, Info, Plus, Moon, Sun, Upload, RotateCw, Crop, GripVertical } from "lucide-react";

export const EditProfile = ({
  setValue,
    darkMode,
    setActiveSection,
    register,
    handleSubmit,
    onSubmit,
  }) => {
    return (
      <>
        <form action="" onSubmit={handleSubmit(onSubmit)} className="px-6">
          <div className="mb-6 ">
            <h3 className="text-xl font-semibold mb-2">Basic info</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mb-4`}
            >
              If you change your name, you may have to re-verify in order to keep
              your verification.{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Learn more
              </a>
            </p>
  
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium mb-1"
                >
                  First name*
                </label>
                <input
                  type="text"
                  id="firstname"
                  {...register("firstname")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-[#0D0F11] border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
              </div>
  
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium mb-1"
                >
                  Last name*
                </label>
                <input
                  type="text"
                  id="lastname"
                  {...register("lastname")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-[#0D0F11] border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
              </div>
  
              <div>
                <label
                  htmlFor="namePronunciation"
                  className="block text-sm font-medium mb-1"
                >
                  Name pronunciation
                </label>
                <div className="flex items-center text-sm text-gray-400">
                  <Info size={16} className="mr-2" />
                  This can only be added using our mobile app
                </div>
              </div>
  
              <div>
                <label
                  htmlFor="pronouns"
                  className="block text-sm font-medium mb-1"
                >
                  Pronouns
                </label>
                <select
                  id="pronouns"
                  {...register("pronouns")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-[#0D0F11] border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Please select</option>
                  <option value="he/him">He/Him</option>
                  <option value="she/her">She/Her</option>
                  <option value="they/them">They/Them</option>
                </select>
                <p
                  className={`text-sm ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  } mt-1`}
                >
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
                {...register("headline")}
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 pr-24 focus:outline-none focus:border-blue-500`}
              />
              <button
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 ${
                  darkMode
                    ? "bg-gray-200 text-gray-800"
                    : "bg-[#0D0F11] text-white"
                } px-3 py-1 rounded text-sm font-medium flex items-center`}
              >
                <Plus size={16} className="mr-1" />
                Write with AI
                <span className="ml-1 text-xs text-orange-500 font-bold">
                  PREMIUM
                </span>
              </button>
            </div>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mt-1`}
            >
              Review and edit the AI draft before saving so it reflects you.{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Learn more
              </a>
            </p>
          </div>
  
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Current position</h3>
            <div>
              <label
                htmlFor="currentPosition"
                className="block text-sm font-medium mb-1"
              >
                Position*
              </label>
              <select
                id="currentPosition"
                {...register("currentPosition")}
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              >
                <option value="It trainer at Arth Institute of commerce & vocational studies">
                  It trainer at Arth Institute of commerce & vocational studies
                </option>
              </select>
            </div>
            <button
              className="mt-2 text-blue-400 hover:underline flex items-center"
              onClick={() => setActiveSection("position")}
            >
              <Plus size={16} className="mr-1" />
              Add new position
            </button>
  
            <div className="mt-2 flex items-center">
              <input
                type="checkbox"
                id="showCurrentCompany"
                {...register("showCurrentCompany")}
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
              {...register("industry")}
              className={`w-full ${
                darkMode
                  ? "bg-[#0D0F11] border-gray-700"
                  : "bg-[#0D0F11] border-gray-300"
              } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
            />
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mt-1`}
            >
              <a href="#" className="text-blue-400 hover:underline">
                Learn more about industry options
              </a>
            </p>
          </div>
  
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Education</h3>
            <div>
              <label
                htmlFor="currentPosition"
                className="block text-sm font-medium mb-1"
              >
                Education *
              </label>
              <select
                id="currentPosition"
                {...register("currentPosition")}
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              >
                <option value="It trainer at Arth Institute of commerce & vocational studies">
                  It trainer at Arth Institute of commerce & vocational studies
                </option>
              </select>
            </div>
            <button
              className="mt-2 text-blue-400 hover:underline flex items-center"
              onClick={() => setActiveSection("education")}
            >
              <Plus size={16} className="mr-1" />
              Add new education
            </button>
          </div>
          
          <h3 className="text-xl font-semibold mb-2">Location</h3>
            <p
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              } mb-4`}
            >
              If you change your name, you may have to re-verify in order to keep
              your verification.{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Learn more
              </a>
            </p>
  
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium mb-1"
                >
                  Countery/Region*
                </label>
                <input
                  type="text"
                  id="country"
                  {...register("country")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-[#0D0F11] border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  {...register("city")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-[#0D0F11] border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
              </div>
              <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-2">Contact Info</h3>
            <div>
              <label
                htmlFor="currentPosition"
                className="block text-sm font-medium mb-1"
              >
                Contact Info *
              </label>
            </div>
            <button
              className="mt-2 text-blue-400 hover:underline flex items-center"
              onClick={() => setActiveSection("phone")}
            >
              Edit Contact Info
            </button>
          </div>
            </div>
        </form>
      </>
    );
  };
  