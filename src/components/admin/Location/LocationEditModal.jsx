import React, {useState, useEffect} from "react";

const LocationEditModal = ({location, onClose, handleSubmit}) => {
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (location) {
      setName(location.name);
    } else {
      setName("");
    }
  }, [location]);

  const handleSave = () => {
    handleSubmit({
      id: location?.id,
      name,
      setErrorMessage,
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center min-h-screen">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {location ? "Edit Location" : "Add Location"}
        </h2>
        <div className="mb-1">
          <label className="block mb-2">Location Name</label>
          <input
            type="text"
            className="w-full border px-4 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {errorMessage && (
          <div className="text-sm text-red-600 p-2 mb-1">
            <p>{errorMessage}</p>
          </div>
        )}
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationEditModal;
