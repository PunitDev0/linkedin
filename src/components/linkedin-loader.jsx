export const LinkedLoader = () => {
  return (
    <div className="flex justify-center items-center ">
      <div className="relative w-16 h-16 flex justify-center items-center  animate-spin-slow">
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className="absolute w-2 h-5 bg-gray-300 rounded-full opacity-70 transform origin-center"
            style={{
              transform: `rotate(${index * 30}deg) translate(0, -150%)`,
              animation: `fade 1.2s infinite ease-in-out ${index * 0.1}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
