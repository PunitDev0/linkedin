export const Education = ({ darkMode, register, handleSubmit, onSubmit }) => {
    const currentYear = new Date().getFullYear()+10;
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="p-6 h-full pb-24">
        <p
          className={`text-sm ${
            darkMode ? "text-gray-400" : "text-gray-600"
          } mb-6`}
        >
          * Indicates required
        </p>
  
        <div className="space-y-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              School
            </label>
            <input
              {...register("education.school")}
              type="tel"
              id="phone"
              className={`w-full ${
                darkMode
                  ? "bg-[#0D0F11] border-gray-700"
                  : "bg-white border-gray-300"
              } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
            />
          </div>
  
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Degree
            </label>
            <input
              {...register("education.degree")}
              type="tel"
              id="phone"
              className={`w-full ${
                darkMode
                  ? "bg-[#0D0F11] border-gray-700"
                  : "bg-white border-gray-300"
              } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
            />
          </div>
  
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">
              Fiend Of Study
            </label>
            <input
              {...register("education.field_of_study")}
              type="tel"
              id="phone"
              className={`w-full ${
                darkMode
                  ? "bg-[#0D0F11] border-gray-700"
                  : "bg-white border-gray-300"
              } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
            />
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <select
                  {...register("education.startMonth")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-white border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  {...register("education.startYear")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-white border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <select
                  {...register("education.endhMonth")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-white border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Month</option>
                  {months.map((month, index) => (
                    <option key={month} value={index + 1}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  {...register("education.endYear")}
                  className={`w-full ${
                    darkMode
                      ? "bg-[#0D0F11] border-gray-700"
                      : "bg-white border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  };
  