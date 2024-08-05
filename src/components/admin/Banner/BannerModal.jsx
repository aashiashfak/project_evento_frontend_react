import React, {useState, useEffect} from "react";

const BannerModal = ({banner, onClose, handleSubmit}) => {
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (banner) {
      setDescription(banner.description);
      setThumbnail(banner.image);
    } else {
      setDescription("");
      setThumbnail(null);
    }
  }, [banner]);

  const handleSave = () => {
    
    if (description.trim() === ""){
      setErrorMessage('Description is required')
      return
    }

    if (thumbnail === null){
      setErrorMessage("Image is required")
      return
    }

    handleSubmit({
      id: banner?.id,
      description,
      thumbnailFile,
      setErrorMessage,
    });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]));
    setThumbnailFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center min-h-screen z-30">
      <div className="bg-white p-6 rounded-md w-full max-w-md text-sm">
        <h2 className="text-xl font-bold mb-4">
          {banner ? "Edit Banner" : "Add Banner"}
        </h2>
        <div className="mb-4">
          <label className="block mb-2">Description:</label>
          <textarea
            className="w-full border px-4 py-2 h-16"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrorMessage("");
            }}
            rows={4}
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

export default BannerModal;
