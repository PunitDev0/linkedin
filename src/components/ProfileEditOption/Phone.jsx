export const Phone = ({ darkMode, register, handleSubmit, onSubmit }) => {
    const currentYear = new Date().getFullYear();
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
      <form onSubmit={handleSubmit(onSubmit)} className="px-6">
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
              Phone Number*
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              className={`w-full ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
            />
          </div>
  
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address
            </label>
            <textarea
              {...register("address")}
              id="address"
              rows={3}
              className={`w-full ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-300"
              } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
            ></textarea>
          </div>
  
          <div>
            <label className="block text-sm font-medium mb-1">Birthday</label>
            <div className="flex space-x-4">
              <div className="flex-1">
                <select
                  {...register("birthMonth")}
                  className={`w-full ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
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
                  {...register("birthDay")}
                  className={`w-full ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
                      : "bg-white border-gray-300"
                  } border rounded px-3 py-2 focus:outline-none focus:border-blue-500`}
                >
                  <option value="">Day</option>
                  {days.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <select
                  {...register("birthYear")}
                  className={`w-full ${
                    darkMode
                      ? "bg-gray-800 border-gray-700"
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