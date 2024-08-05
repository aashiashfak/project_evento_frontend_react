import React, {useState, useEffect} from "react";
import {addBanner, editBanner} from "../../../api/adminApi/AdminBanners";

const BannerModal = ({banner, onClose, setBanners}) => {
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

  const handleSave = async () => {
    let bannerData;

    if (thumbnailFile) {
      bannerData = new FormData();
      bannerData.append("description", description);
      bannerData.append("image", thumbnailFile);
    } else {
      bannerData = {description};
    }

    try {
      if (banner) {
        const response = await editBanner(
          banner.id,
          bannerData,
          thumbnailFile ? "put" : "patch"
        );
        setBanners((prev) =>
          prev.map((b) => (b.id === response.data.id ? response.data : b))
        );
      } else {
        const response = await addBanner(bannerData);
        setBanners((prev) => [...prev, response.data]);
      }
      onClose();
    } catch (error) {
      console.error("Error saving banner:", error);
      if (error.response && error.response.data) {
        const errors = error.response.data;
        if (errors.non_field_errors) {
          setErrorMessage(errors.non_field_errors.join(", "));
        } else {
          setErrorMessage(Object.values(errors).flat().join(", "));
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(URL.createObjectURL(e.target.files[0]));
    setThumbnailFile(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center min-h-screen z-30">
      <div className="bg-white p-6 rounded-md w-full max-w-md ">
        <h2 className="text-xl font-semibold mb-4">
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
        <div className="flex justify-center space-x-2">
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
