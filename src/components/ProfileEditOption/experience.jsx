import { useForm } from "react-hook-form";

export const Experience = ({ darkMode, register, handleSubmit, onSubmit }) => {
    const { watch } = useForm();
    const isCurrentlyWorking = watch("isCurrentlyWorking");
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-24">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title*
              </label>
              <input
                {...register("title")}
                type="text"
                id="title"
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
            </div>
  
            <div>
              <label
                htmlFor="employmentType"
                className="block text-sm font-medium mb-1"
              >
                Employment type
              </label>
              <select
                {...register("employmentType")}
                id="employmentType"
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
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
              <label
                htmlFor="companyName"
                className="block text-sm font-medium mb-1"
              >
                Company name*
              </label>
              <input
                {...register("companyName")}
                type="text"
                id="companyName"
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
            </div>
  
            <div className="flex space-x-4">
              <div className="flex-1">
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium mb-1"
                >
                  Start date*
                </label>
                <input
                  {...register("startDate")}
                  type="date"
                  id="startDate"
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-[#0D0F11] border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                />
              </div>
              {!isCurrentlyWorking && (
                <div className="flex-1">
                  <label
                    htmlFor="endDate"
                    className="block text-sm font-medium mb-1"
                  >
                    End date
                  </label>
                  <input
                    {...register("endDate")}
                    type="date"
                    id="endDate"
                    className={`w-full ${
                      darkMode
                        ? "bg-[#0D0F11] border-gray-700"
                        : "bg-[#0D0F11] border-gray-300"
                    } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                  />
                </div>
              )}
            </div>
  
            <div className="flex items-center">
              <input
                {...register("isCurrentlyWorking")}
                type="checkbox"
                id="isCurrentlyWorking"
                className="mr-2"
              />
              <label htmlFor="isCurrentlyWorking" className="text-sm">
                I am currently working in this role
              </label>
            </div>
  
            <div>
              <label
                htmlFor="location"
                className="block text-sm font-medium mb-1"
              >
                Location
              </label>
              <input
                {...register("location")}
                type="text"
                id="location"
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              />
            </div>
  
            <div>
              <label
                htmlFor="locationType"
                className="block text-sm font-medium mb-1"
              >
                Location type
              </label>
              <select
                {...register("locationType")}
                id="locationType"
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              >
                <option value="">Please select</option>
                <option value="on-site">On-site</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
  
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                rows={4}
                className={`w-full ${
                  darkMode
                    ? "bg-[#0D0F11] border-gray-700"
                    : "bg-[#0D0F11] border-gray-300"
                } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
              ></textarea>
            </div>
          </div>
        </form>
      </>
    );
  };
  