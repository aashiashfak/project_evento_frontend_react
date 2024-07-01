import React, {useEffect, useState} from "react";
import {Carousel} from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axiosInstance from "../../api/axiosInstance";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosInstance.get("superuser/Banners/");
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  return (
    <div className="banner-carousel-container">
      <Carousel
        showArrows
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        emulateTouch
        swipeable
      >
        {banners.map((banner) => (
          <div key={banner.id} className="carousel-slide group relative">
            <img
              src={banner.image}
              alt="Banner"
              className="object-cover w-full h-48 sm:h-64 md:h-72 lg:h-93"
            />

            <div className="text-sm absolute w-full bottom-0 p-4 bg-black bg-opacity-20 rounded-lg text-white text-opacity-35 transition-opacity duration-300 ease-in-out group-hover:bg-opacity-50 group-hover:text-opacity-100">
              <p className="text-center mb-3">{banner.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
