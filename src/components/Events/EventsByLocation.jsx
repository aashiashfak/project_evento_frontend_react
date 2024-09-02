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
import { Spinner } from "../spinner/Spinner";
import LoginModal from "../Protecters/LoginRequireModal";


const EventsByLocation = ({locationID}) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false);

  const loc = events.length > 0 ? events[0].location : "";
  console.log("location is :.....", loc);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true)
      try {
        const response = await axiosInstance.get(
          `events/by_location/${locationID}/`
        );
        setEvents(response.data.slice(0, 15));
        console.log("eventsbylocation.....", response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }finally{
        setIsLoading(false)
      }
    };

    if (locationID) {
      fetchEvents();
    }
  }, [locationID]);

  if (isLoading){
    <Spinner/>
  }

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
                  <EventCard event={event} setShowModal={setShowModal} />
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
      {showModal && <LoginModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default EventsByLocation;
