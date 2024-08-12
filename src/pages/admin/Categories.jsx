import React, {useState, useEffect} from "react";
import {FaPlus} from "react-icons/fa";
import CategoryModal from "../../components/admin/Category/CategoryModal";
import CategoryTable from "../../components/admin/Category/CategoryTable";
import {categoryList} from "../../api/adminApi/AdminCategories";
import DeleteModal from "../../components/admin/DeleteModal/DeleteModal";
import {deleteCategory} from "../../api/adminApi/AdminCategories";
import {showToast} from "../../utilities/tostify/toastUtils";
import {addCategory, updateCategory} from "../../api/adminApi/AdminCategories";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteobj, setDeleteobj] = useState({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryList();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddClick = () => {
    setEditCategory(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (category) => {
    setEditCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditCategory(null);
  };

  const handleDeleteClick = (id, value) => {
    setDeleteobj({
      id,
      value,
    });
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async ({
    id,
    name,
    originalName,
    thumbnailFile,
    setErrorMessage,
  }) => {
    let categoryData;

    if (thumbnailFile) {
      categoryData = new FormData();
      if (originalName !== name) {
        categoryData.append("name", name);
      }
      categoryData.append("image", thumbnailFile);
    } else {
      categoryData = {name};
    }

    try {
      let response;
      if (id) {
        response = await updateCategory(
          id,
          categoryData,
          thumbnailFile && name !== originalName ? "put" : "patch"
        );
        setCategories((prev) =>
          prev.map((cat) => (cat.id === response.data.id ? response.data : cat))
        );
        showToast(`Category ${name} updated successfully!`, "success");
      } else {
        response = await addCategory(categoryData);
        setCategories((prev) => [...prev, response.data]);
        showToast(`Category ${name} added successfully!`);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.log("Error occurred in edit or update", error);
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
    <div className="px-4 pt-4">
      <section>
        <div className="flex justify-between items-center  bg-gray-800 rounded-t-xl p-4">
          <h1 className="text-xl font-semibold text-white">Category List</h1>
          <button
            className="bg-gray-400 bg-opacity-50 text-white rounded-full px-4 py-1 flex items-center"
            onClick={handleAddClick}
          >
            <FaPlus className="mr-2" />
            Add
          </button>
        </div>

        <CategoryTable
          categories={categories}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />

        {isModalOpen && (
          <CategoryModal
            category={editCategory}
            onClose={handleCloseModal}
            handleSubmit={handleSubmit}
          />
        )}
        {isDeleteModalOpen && (
          <DeleteModal
            identifier={"Category"}
            onDeleteModalClose={setIsDeleteModalOpen}
            setList={setCategories}
            deleteObj={deleteobj}
            deleteApi={deleteCategory}
          />
        )}
      </section>
    </div>
  );
};

export default CategoryList;
