import React from "react";
import { useField } from "formik";

const Select = ({ label, options, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="block mb-2 text-sm text-gray-600">{label}</label>
      <select
        {...field}
        {...props}
        className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md  focus:border-purple-400 focus:ring-purple-400 focus:outline-none focus:ring focus:ring-opacity-40"
      >
        {options.map((option) => (
          <option key={option.value}>{option.label}</option>
        ))}
      </select>
      {meta.touched && meta.error ? (
        <p className="text-red-600 text-xs italic mt-1">{meta.error}</p>
      ) : null}
    </>
  );
};

export default Select;
