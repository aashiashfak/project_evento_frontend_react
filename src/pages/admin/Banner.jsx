import React, {useState, useEffect} from "react";
import {FaPlus} from "react-icons/fa";
import BannerModal from "../../components/admin/Banner/BannerModal";
import BannerTable from "../../components/admin/Banner/BannerTable";
import {listBanners, deleteBanner, addBanner, updateBanner} from "../../api/adminApi/AdminBanners";
import DeleteModal from "../../components/admin/DeleteModal/DeleteModal";
import { showToast } from "../../utilities/tostify/toastUtils";

const BannerList = () => {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteObj, setDeleteObj] = useState({});

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await listBanners();
        setBanners(response);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  const handleAddClick = () => {
    setEditBanner(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (banner) => {
    setEditBanner(banner);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditBanner(null);
  };

  const handleDeleteClick = (id, value) => {
    setDeleteObj({
      id,
      value,
    });
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async ({
    id,
    description,
    thumbnailFile,
    setErrorMessage,
  }) => {
    let bannerData;

    if (thumbnailFile) {
      bannerData = new FormData();
      bannerData.append("description", description);
      bannerData.append("image", thumbnailFile);
    } else {
      bannerData = {description};
    }

    try {
      let response;
      if (id) {
        response = await updateBanner(
          id,
          bannerData,
          thumbnailFile ? "put" : "patch"
        );
        setBanners((prev) =>
          prev.map((b) => (b.id === response.data.id ? response.data : b))
        );
        showToast("Banner updated successfully!");
      } else {
        response = await addBanner(bannerData);
        setBanners((prev) => [...prev, response.data]);
        showToast("Banner added successfully!");
      }
      setIsModalOpen(false);
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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center  bg-gray-800 rounded-t-xl p-4">
        <h1 className="text-xl font-semibold text-white">Banner List</h1>
        <button
          className="bg-gray-400 bg-opacity-50 text-white rounded-full px-4 py-1 flex items-center"
          onClick={handleAddClick}
        >
          <FaPlus className="mr-2" />
          Add
        </button>
      </div>
      <BannerTable
        banners={banners}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      {isModalOpen && (
        <BannerModal
          banner={editBanner}
          onClose={handleCloseModal}
          handleSubmit={handleSubmit}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          identifier={"Banner"}
          onDeleteModalClose={setIsDeleteModalOpen}
          setList={setBanners}
          deleteObj={deleteObj}
          deleteApi={deleteBanner}
        />
      )}
    </div>
  );
};

export default BannerList;
