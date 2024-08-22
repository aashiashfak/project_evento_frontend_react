import React, {useState, useEffect} from "react";
import axiosInstance from "../../utilities/axios/axiosInstance";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FaArrowLeft} from "react-icons/fa";
import '../../css/DatePickerStyles.css'
import '../../css/Global.css'

const FilterSidebar = ({onFilterChange, closeSidebar, initialCategory}) => {
  const [startDate, setStartDate] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceSort, setPriceSort] = useState("");
  const [timeFilter, setTimeFilter] = useState("");


   const formatDate = (date) => {
     const year = date.getFullYear();
     const month = (date.getMonth() + 1).toString().padStart(2, "0"); 
     const day = date.getDate().toString().padStart(2, "0");
     return `${year}-${month}-${day}`;
   };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("events/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  console.log('startDate......',startDate)

  const handleApplyFilters = () => {
    const filters = {
      category: selectedCategories.join(","),
      start_date: startDate ? formatDate(startDate) : "",
      sort_by_price: priceSort,
      today: timeFilter === "today",
      weekend: timeFilter === "weekend",
    };
    onFilterChange(filters);
    closeSidebar();
  };

  const clearFilter = () => {
    setSelectedCategories([]);
    setStartDate(null);
    setPriceSort("");
    setTimeFilter("");
  };

  return (
    <div className="left-0 h-full w-72  bg-white shadow-md p-4 z-50 overflow-y-scroll text-sm hide-scrollbar">
      <div>
        <button
          className="mt-2 mb-6 text-gray-600 hover:text-black transform transition duration-200"
          onClick={closeSidebar}
        >
          <FaArrowLeft size={20} />
        </button>
      </div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold text-violet-700">FILTERS</h2>
        <button
          onClick={clearFilter}
          className="text-gray-500 hover:text-black"
        >
          ClearAll
        </button>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Date</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="w-full p-2 border rounded-lg"
          minDate={new Date()}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Price</label>
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select</option>
          <option value="price">Low to High</option>
          <option value="-price">High to Low</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Category</label>
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`m-1 p-2 border rounded-lg ${
                selectedCategories.includes(category.name)
                  ? "bg-violet-700 text-white"
                  : "bg-white text-black"
              }`}
              onClick={() => handleCategoryChange(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Time Filter</label>
        <select
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="">Select</option>
          <option value="today">Today</option>
          <option value="weekend">This Weekend</option>
        </select>
      </div>

      <button
        onClick={handleApplyFilters}
        className="w-full p-2 bg-violet-700 text-white rounded"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
