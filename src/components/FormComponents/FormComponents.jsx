import React from "react";

// Input Component
const Input = ({id, width, type = "text", placeholder, ...rest}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className={`border-t-0 border-gray-300 p-2 rounded-md border-b-2 shadow-md focus:ring-1 outline-none focus:ring-gray-300 ${
        width ? width : "w-full"
      }`}
      {...rest}
    />
  );
};

// Label Component
const Label = ({htmlFor, children}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-sm font-medium text-gray-700 mb-2"
    >
      {children}
    </label>
  );
};

// Select Component
const Select = ({id, children, ...rest}) => {
  return (
    <select
      id={id}
      className="border-b-2 border  border-t-0 border-gray-300 p-2 shadow-md rounded-md w-full outline-none focus:ring-1 focus:ring-gray-300"
      {...rest}
    >
      {children}
    </select>
  );
};

// Textarea Component
const Textarea = ({id, placeholder, ...rest}) => {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      className="border-b-2 border-t-0 border-gray-300 p-2 rounded-md w-full border shadow-md outline-none focus:ring-1 focus:ring-gray-300"
      rows="4"
      {...rest}
    />
  );
};

// Button Component
const Button = ({type = "button", width, children, onClick}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gray-400 text-white p-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
        width && width }`}
    >
      {children}
    </button>
  );
};

// Export all components together
export {Input, Label, Select, Textarea, Button};
