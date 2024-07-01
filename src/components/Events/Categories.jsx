import React, {useEffect, useState} from "react";
import axiosInstance from "../../api/axiosInstance";
import "../../css/Global.css";
import TextHeading from "../texts/TextHeading";
import { useNavigate } from "react-router-dom";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("events/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="pb-4">
    <TextHeading Heading='CATEGORIES'/>
      <div className="flex overflow-x-auto space-x-4 pb-4 pt-4 px-6 md:px-14 lg:px-20 hide-scrollbar">
        {categories.map((category) => (
          <div key={category.id} className="flex-none group">
            <div className=" w-64 bg-white shadow-md rounded-lg overflow-hidden relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-44 object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-1 group-hover:bg-opacity-70 ease-in-out transition duration-200">
                <h2 className="text-white text-md font-normal text-center">
                  {category.name}
                </h2>
              </div>
            </div>

            <div>
              <button className="w-full bg-violet-700 text-white px-4 py-2 mt-2 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105"
              onClick={()=>navigate(`all-events/${category.name}`)}>
                Find More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
