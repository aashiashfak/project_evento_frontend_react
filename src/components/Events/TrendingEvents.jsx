import React, {useEffect, useState} from "react";
import axiosInstance from "../../utilities/axios/axiosInstance";
import EventCard from "./EventCard";
import TextHeading from "../texts/TextHeading";
import {BsFillLightningFill} from "react-icons/bs";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "../../css/Global.css";
import {IoChevronBack, IoChevronForward} from "react-icons/io5"; // Import icons

const TrendingEvents = () => {
  const [trendingEvents, setTrendingEvents] = useState([]);

  useEffect(() => {
    const fetchTrendingEvents = async () => {
      try {
        const response = await axiosInstance.get("events/trending-events/");
        setTrendingEvents(response.data);
        console.log("trending events......", response.data);
      } catch (error) {
        console.log("Error fetching Trending Events", error);
      }
    };
    fetchTrendingEvents();
  }, []);

  // Number of slides per view based on the length of events
  const slidesPerView = Math.min(trendingEvents.length, 4); // Ensure a max of 4 slides per view

  return (
    <div className="mt-8 mb-10 px-4">
      <TextHeading Heading="TRENDING EVENTS" icon={BsFillLightningFill} />
      <div className="pt-4 pb-6 bg-white overflow-hidden relative">
        {trendingEvents.length > 0 ? (
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              breakpoints={{
                1365: {
                  slidesPerView: 4,
                },
                1100: {
                  slidesPerView: 3,
                },
                730: {
                  slidesPerView: 2,
                },
                0: {
                  slidesPerView: 1,
                },
              }}
            >
              {trendingEvents.map((event) => (
                <SwiperSlide key={event.id} className="flex justify-center">
                  <EventCard event={event} />
                </SwiperSlide>
              ))}
              <div className="swiper-button-prev custom-swiper-button">
                <IoChevronBack />
              </div>
              <div className="swiper-button-next custom-swiper-button">
                <IoChevronForward />
              </div>
            </Swiper>
          </div>
        ) : (
          <p className="text-center">No Trending Events available.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingEvents;
