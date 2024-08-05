import React, {useState, useEffect} from "react";
import {FaPlus} from "react-icons/fa";
import BannerModal from "../../components/admin/Banner/BannerModal";
import BannerTable from "../../components/admin/Banner/BannerTable";
import {listBanners, deleteBanner} from "../../api/adminApi/AdminBanners";
import DeleteModal from "../../components/admin/DeleteModal/DeleteModal";

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

  return (
    <div className="p-4">
      <div className="flex justify-between items-center bg-gray-800 rounded-t-xl p-4">
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
          setBanners={setBanners}
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
