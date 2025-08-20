import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";
import React, { useState, useRef } from "react";
import Modal from "react-modal";

import Field from "./Field";
import Button from "./Button";
import Select from "./Select";

const SettingsModal = ({ modalIsOpen, closeModal, setPrompt }) => {
  const formikRef = useRef();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      backgroundColor: "transparent",
    },
  };

  const imageStyles = [
    { label: "Professional", value: "professional" },
    { label: "Creative", value: "creative" },
    { label: "Casual", value: "casual" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Minimalist", value: "minimalist" },
  ];

  const genders = [
    { label: "None selected", value: "none selected" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Non-binary", value: "non-binary" },
  ];

  const [imageStyle, setImageStyle] = useState("professional");
  const [gender, setGender] = useState("none selected");
  const [arr, setArr] = useState([]);

  const addInput = (e) => {
    e.preventDefault();
    setArr((s) => {
      return [
        ...s,
        {
          type: "text",
          value: "",
        },
      ];
    });
  };

  const handleChange = (e) => {
    e.preventDefault();

    const index = e.target.id;
    setArr((s) => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  const removeInput = (index) => {
    setArr(() => {
      const newArr = arr.filter((_, i) => i !== index);

      return newArr;
    });
  };

  const generatePrompt = async (values) => {
    const promptSettings = {
      style: values.imageStyle,
      gender: values.gender,
      additionalPrompts: values.additionalPrompts
        ? values.additionalPrompts.toString()
        : "",
    };
    setPrompt(promptSettings);
    closeModal();
  };

  const GeneratePromptSchema = Yup.object().shape({
    imageStyle: Yup.string().required("Required"),
    gender: Yup.string().required("Required"),
    additionalPrompts: Yup.array(),
  });

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <Formik
        innerRef={formikRef}
        initialValues={{
          imageStyle,
          gender,
        }}
        validationSchema={GeneratePromptSchema}
        onSubmit={async (values) => {
          generatePrompt(values);
        }}
      >
        {({ values }) => (
          <Form className="bg-white shadow rounded-lg mb-6 p-5">
            <div className="text-gray-600 text-lg font-semibold mt-2 mb-7">
              AI Image Generation Settings
            </div>
            <Select
              label="Image Style"
              name="imageStyle"
              id="imageStyle"
              options={imageStyles}
              className="w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-purple-500 focus:text-gray-900 focus:shadow-outline-blue custom-br-25"
            />
            <Select
              label="Gender"
              name="gender"
              id="gender"
              options={genders}
            />
            <FieldArray
              name="additionalPrompts"
              render={(arrayHelpers) => (
                <div>
                  {arr.map((item, i) => (
                    <div key={i}>
                      <Field
                        key={i}
                        name={`additionalPrompts.${i}`}
                        placeholder={"Additional Parameter"}
                      />
                      <button
                        value={"Remove"}
                        type="button"
                        className={`px-4 mt-2 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50`}
                        onClick={(e) => {
                          arrayHelpers.remove(i);
                          removeInput(i);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            />
            <button
              className="mx-auto mt-2 px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
              onClick={addInput}
            >
              Add additional prompts{" "}
            </button>
            <footer className="flex justify-end mt-8">
              <Button text="Generate Image" />
            </footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default SettingsModal;
