import React from "react";

// Input Component
const Input = ({id, type = "text", placeholder, ...rest}) => {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="border border-gray-300 p-2 rounded-md w-full"
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
      className="border border-gray-300 p-2 rounded-md w-full"
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
      className="border border-gray-300 p-2 rounded-md w-full"
      rows="4"
      {...rest}
    />
  );
};

// Button Component
const Button = ({type = "button", children, onClick}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {children}
    </button>
  );
};

// Export all components together
export {Input, Label, Select, Textarea, Button};
