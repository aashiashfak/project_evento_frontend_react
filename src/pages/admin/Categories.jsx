import React, {useState, useEffect} from "react";
import {FaPlus} from "react-icons/fa";
import {categoryList} from "../../api/adminApi/AdminDashboard";
import CategoryModal from "./CategoryModal";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

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

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-violet-700">
          Event Category List
        </h1>
        <button
          className="bg-purple-500 text-white rounded-full px-4 py-1 flex items-center"
          onClick={handleAddClick}
        >
          <FaPlus className="mr-2" />
          Add Category
        </button>
      </div>
      <CategoryTable categories={categories} onEditClick={handleEditClick} />
      {isModalOpen && (
        <CategoryModal category={editCategory} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default CategoryList;
