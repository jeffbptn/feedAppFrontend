import React from "react";
import { useField } from "formik";

const AddFeedField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <textarea
        {...field}
        {...props}
        className="w-full rounded-lg p-2 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400"
        onKeyPress={(e) => {
          if (e.key === "Enter") e.preventDefault();
        }}
      ></textarea>

      {meta.touched && meta.error ? (
        <p className="text-red-600 text-xs italic mt-1">{meta.error}</p>
      ) : null}
    </>
  );
};

export default AddFeedField;
