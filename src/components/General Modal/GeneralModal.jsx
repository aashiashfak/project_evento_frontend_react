import React, {useState, useEffect} from "react";
import {FaTimes} from "react-icons/fa";

const GeneralModal = ({
  fields,
  initialData = {},
  onSubmit,
  onClose,
  title,
  isEditing,
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  console.log(isEditing);
  console.log("initial data in general modal ", initialData);

  useEffect(() => {
    setFormData(initialData); 
    setErrors(initialData.backendErrors || {}); 
  }, [initialData]);

  const handleChange = (e) => {
    const {name, type, files, value} = e.target;

    // Remove the error for the field being changed
    setErrors((prevErrors) => {
      const newErrors = {...prevErrors};
      delete newErrors[name]; // Remove the error for the current field
      return newErrors;
    });

    // Update form data
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    fields.forEach((field) => {
      // Skip validation for image fields
      if (field.type !== "file" && field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return; // Prevent submission if validation fails
    }

    // Handle submission logic
    if (!isEditing) {
      onSubmit(formData);
      return;
    }

    const changedData = {};
    let changesMade = false;

    // Check for changed data in edit mode
    for (const key in formData) {
      if (formData[key] !== initialData[key]) {
        changedData[key] = formData[key];
        changesMade = true;
      }
    }

    if (changesMade) {
      onSubmit(changedData); // Submit only the changed data
    } else {
      console.log("No changes occurred");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-600" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {fields.map((field, idx) => (
            <div key={idx} className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor={field.name}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={
                  field.type !== "file" ? formData[field.name] || "" : undefined
                }
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } rounded-md`}
                placeholder={field.placeholder}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm">{errors[field.name]}</p>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg px-4 py-2 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default GeneralModal;
