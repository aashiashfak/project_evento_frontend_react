import React, {useEffect, useState} from "react";
import axiosInstance from "../../utilities/axios/axiosInstance";
import "../../css/Global.css";
import TextHeading from "../texts/TextHeading";
import {useNavigate} from "react-router-dom";
import {BiCategory} from "react-icons/bi";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";

import {Autoplay} from "swiper/modules"; 

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

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
      <TextHeading Heading="CATEGORIES" icon={BiCategory} />
      <Swiper 
        spaceBetween={15}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]} 
        speed={3000}
        breakpoints={{
          320: {slidesPerView: 1}, 
          620: {slidesPerView: 2}, 
          905: {slidesPerView: 3}, 
          1250: {slidesPerView: 4},
        }}
        className="pb-4 pt-4 mt-5" 
      >
        {categories.map((category) => (
          <SwiperSlide key={category.id} className="group ">
            <div className="flex gap-4 bg-white shadow-md rounded-lg overflow-hidden relative">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-44 object-cover flex-grow"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-1 group-hover:bg-opacity-70 ease-in-out transition duration-200">
                <h2 className="text-white text-md font-normal text-center">
                  {category.name}
                </h2>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                className="w-full flex-grow bg-violet-700 text-white px-4 py-2 mt-2 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105"
                onClick={() => navigate(`all-events/${category.name}`)}
              >
                Find More
              </button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Categories;
