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
          <div key={banner.id} className="carousel-slide">
            <img
              src={banner.image}
              alt="Banner"
              className="object-cover w-full h-48 sm:h-64 md:h-72 lg:h-96"
            />
            <p className="legend">{banner.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Banner;
