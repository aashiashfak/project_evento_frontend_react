import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import LoginModal from "../Protecters/LoginRequireModal";
import {setWishListItems} from "../../redux/WishListSlice";
import {FaCalendarDays, FaClock} from "react-icons/fa6";
import {TbBuildingCircus} from "react-icons/tb";
import {PiCity} from "react-icons/pi";
import {IoLocationSharp} from "react-icons/io5";


const EventCard = ({event}) => {
  const {
    event_name,
    start_date,
    venue,
    location,
    event_img_1,
    time,
    location_url,
    ticket_types,
  } = event;

  console.log("evnetns....", event);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const minTicketPrice = ticket_types && ticket_types.length > 0 
  ? Math.min(...ticket_types.map((t) => t.price))
  : null;

  useEffect(() => {
    setIsWishlisted(
      wishlistItems.some((wishlistItem) => wishlistItem.event.id === event.id)
    );
    console.log("isWIshlisted", isWishlisted);
  }, [wishlistItems, event.id]);

  const handleWishlistClick = () => {
    if (!user || !user.accessToken) {
      setShowLoginModal(true);
      return;
    }

    if (isWishlisted) {
      axiosInstance
        .delete(`events/wishlist/${event.id}/`)
        .then(() => {
          setIsWishlisted(false);
          dispatch(
            setWishListItems(
              wishlistItems.filter((item) => item.event.id !== event.id)
            )
          );
        })
        .catch((error) => {
          console.error("Error removing from wishlist:", error);
        });
    } else {
      axiosInstance
        .post(`events/wishlist/${event.id}/`)
        .then((response) => {
          setIsWishlisted(true);
          dispatch(setWishListItems([...wishlistItems, response.data]));
        })
        .catch((error) => {
          console.error("Error adding to wishlist:", error);
        });
    }
  };

  // Format the date
  const eventDate = new Date(start_date);
  const dateOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  const formattedDate = eventDate.toLocaleDateString("en-US", dateOptions);

  // Format the time to include AM/PM
  const eventTime = new Date(`1970-01-01T${time}Z`);
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const formattedTime = eventTime.toLocaleTimeString("en-US", timeOptions);

  return (
    <div className="border rounded-lg shadow-md w-64 flex-shrink-0 ">
      <div className="h-64 bg-gray-200 flex items-center justify-center rounded-t-lg">
        {event_img_1 ? (
          <img
            src={event_img_1}
            alt="Event"
            className="w-full h-full object-cover rounded-t-lg"
          />
        ) : (
          <span className="text-gray-500">No image available</span>
        )}
      </div>
      <div className="py-2 px-4 relative">
        <div className="absolute right-2 top-2">
          {isWishlisted ? (
            <FaHeart
              size={24}
              className="cursor-pointer text-violet-600 "
              onClick={handleWishlistClick}
            />
          ) : (
            <FaRegHeart
              size={24}
              className="cursor-pointer text-violet-600  "
              onClick={handleWishlistClick}
            />
          )}
        </div>
        <div>
          <h3 className="font-bold text-md">{event_name}</h3>
          <div className=" text-sm text-gray-600">
            <div className="flex mt-1">
              <div className="flex ">
                <FaCalendarDays className="mr-1 mt-1" />
                <p className="mr-1">{formattedDate}</p>
                <span className="font-semibold mr-1">|</span>{" "}
              </div>
              <div className="flex">
                <FaClock className="mr-1 mt-1" />
                <p className="mr-1">{formattedTime}</p>
              </div>
            </div>
            <div className="flex mt-1 mb-2">
              <div className="flex">
                <TbBuildingCircus className="mr-1 mt-1" />
                <p className="mr-1">{venue}</p>
                <span className="font-semibold mr-1">|</span>{" "}
              </div>
              <div className="flex">
                <PiCity className="mr-1 mt-1" />
                <p>{location}</p>
              </div>
            </div>
            <div className="flex">
              <IoLocationSharp className="mr-1 mt-1" />
              {location_url ? (
                <a href={location_url}>Event Location</a>
              ) : (
                <p>No location</p>
              )}
            </div>
          </div>
        </div>
        <button
          className="w-full bg-violet-700 text-white px-4 py-2 mt-2 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105"
          onClick={() => navigate(`/event-details/${event.id}`)}
        >
          Book Now
        </button>
        <p className="text-sm text-gray-600 mb-1">₹ {minTicketPrice} Onwards</p>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default EventCard;
