export const About = ({
    darkMode,
    setActiveSection,
    register,
    handleSubmit,
    onSubmit,}) => {
    return(
      <div className="p-6">
                 <h2 className="text-xl font-semibold mb-1">About</h2>
                <textarea
                  id="about"
                  {...register("about")}
                  placeholder="Write a brief description about your education..."
                  className={`w-full h-32 px-3 py-2 text-sm rounded-md border ${
                    darkMode
                      ? "bg-[#0D0F11] border-none text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
    )
  }