import React, {useEffect, useState} from "react";
import EventCard from "./EventCard";
import TextHeading from "../texts/TextHeading";
import {PiCity} from "react-icons/pi";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "../../css/Global.css";
import {IoChevronBack, IoChevronForward} from "react-icons/io5";
import axiosInstance from "../../utilities/axios/axiosInstance";

const EventsByLocation = ({locationID}) => {
  const [events, setEvents] = useState([]);

  const loc = events.length > 0 ? events[0].location : "";
  console.log("location is :.....", loc);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get(
          `events/by_location/${locationID}/`
        );
        setEvents(response.data.slice(0, 15));
        console.log("eventsbylocation.....", response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (locationID) {
      fetchEvents();
    }
  }, [locationID]);

  return (
    <div className="mt-8 mb-10 px-4">
      <TextHeading Heading={`EVENTS IN ${loc.toUpperCase()}`} icon={PiCity} />
      <div className="pt-6 pb-8 bg-white overflow-hidden">
        {events.length > 0 ? (
          <div className="relative">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={16}
              loop={true}
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
              className="w-full"
            >
              {events.map((event) => (
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
          <p className="text-center text-gray-600">
            No events available for this location.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventsByLocation;
