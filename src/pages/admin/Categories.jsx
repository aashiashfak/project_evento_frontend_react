import React, {useState, useEffect} from "react";
import {FaPlus} from "react-icons/fa";
import CategoryModal from "../../components/admin/Category/CategoryModal";
import CategoryTable from "../../components/admin/Category/CategoryTable";
import {categoryList} from "../../api/adminApi/AdminCategories";
import DeleteModal from "../../components/admin/Category/DeleteModal";
import { deleteCategory } from "../../api/adminApi/AdminCategories";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteobj,setDeleteobj] = useState({})

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

  const handleDeleteClick = (id, categoryName)=>{
    setDeleteobj({
      id,
      categoryName,
    })
    setIsDeleteModalOpen(true)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center  bg-violet-700 rounded-t-xl p-4">
        <h1 className="text-xl font-semibold text-white ">Category List</h1>
        <button
          className="bg-purple-500 text-white rounded-full px-4 py-1 flex items-center"
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
          setCategories={setCategories}
          onDeleteModalClose={setIsDeleteModalOpen}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          identifier={"Category"}
          onDeleteModalClose={setIsDeleteModalOpen}
          setCategories={setCategories}
          deleteObj={deleteobj}
          deleteApi={deleteCategory}
        />
      )}
    </div>
  );
};

export default CategoryList;
