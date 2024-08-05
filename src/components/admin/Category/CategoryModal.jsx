import React, {useState, useEffect} from "react";

const CategoryModal = ({category, onClose, handleSubmit}) => {
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setOriginalName(category.name);
      setThumbnail(category.image);
    } else {
      setName("");
      setOriginalName("");
      setThumbnail(null);
    }
  }, [category]);

  const handleSave = () => {

    if (name.trim() === "") {
      setErrorMessage("Category Name is required");
      return;
    }
    if (thumbnail === null) {
      setErrorMessage("Image is required");
      return;
    }

    handleSubmit({
      id: category?.id,
      name,
      originalName,
      thumbnailFile,
      setErrorMessage,
    });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]));
    setThumbnailFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center min-h-screen z-20 ">
      <div className="bg-white p-6 rounded-md w-full max-w-md text-sm">
        <h2 className="text-xl font-bold mb-4 ">
          {category ? "Edit Category" : "Add Category"}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Category Name:</label>
          <input
            type="text"
            className="w-full border px-4 py-2"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrorMessage("");
            }}
          />
        </div>
        <div className="mb-2">
          <label className="block mb-2">Image:</label>
          <input type="file" onChange={handleThumbnailChange} />
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              className="w-16 h-16 mt-2 object-cover"
            />
          )}
        </div>
        <div className="text-sm text-red-600 p-2">
          {errorMessage && <p>{errorMessage}</p>}
        </div>
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

export default CategoryModal;
