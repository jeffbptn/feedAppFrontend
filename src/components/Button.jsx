import React from "react";

const Button = ({ text, fullWidth = true }) => {
  return (
    <>
      <input
        type="submit"
        className={`${
          fullWidth && "w-full"
        } px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50`}
        value={text}
      />
    </>
  );
};

export default Button;
