import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import axiosInstance from "../../utilities/axios/axiosInstance";
import LoginModal from "../Protecters/LoginRequireModal";
import {setWishListItems} from "../../redux/WishListSlice";
import {FaCalendarDays, FaClock, FaCity} from "react-icons/fa6";
import {TbBuildingCircus} from "react-icons/tb";
import {PiCity} from "react-icons/pi";
import {IoLocationSharp} from "react-icons/io5";
import "react-tooltip/dist/react-tooltip.css";
import {Tooltip} from "react-tooltip";
import "../../css/custom_toast.css";
import {showToast} from "../../utilities/tostify/toastUtils";
import { convert24To12Hour } from "../../utilities/convert24to12Hour";

const EventCardPageView = ({event}) => {
  const {
    id,
    event_name,
    start_date,
    venue,
    location,
    event_img_1,
    time,
    location_url,
    status,
    ticket_types,
  } = event;

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);
  // console.log(wishlistItems)
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const minTicketPrice =
    ticket_types && ticket_types.length > 0
      ? Math.min(...ticket_types.map((t) => t.price))
      : null;

  useEffect(() => {
    // Check if the event is in the wishlist
    setIsWishlisted(
      wishlistItems.some((wishlistItem) => wishlistItem.event.id === id)
    );
  }, [wishlistItems, id]);

  const handleWishlistClick = () => {
    if (!user || !user.accessToken) {
      setShowLoginModal(true);
      return;
    }

    if (isWishlisted) {
      axiosInstance
        .delete(`events/wishlist/${id}/`)
        .then(() => {
          setIsWishlisted(false);
          showToast(`${event_name} removed from wishlist`, "error");
          dispatch(
            setWishListItems(
              wishlistItems.filter((item) => item.event.id !== id)
            )
          );
        })
        .catch((error) => {
          console.error("Error removing from wishlist:", error);
        });
    } else {
      axiosInstance
        .post(`events/wishlist/${id}/`)
        .then((response) => {
          setIsWishlisted(true);
          showToast(`${event_name} added to wishlist`, "success");
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

   const formattedTime = convert24To12Hour(time);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md max-h-[500px] w-[295px]">
      <div className="h-48 bg-gray-200 flex items-center justify-center rounded-t-lg ">
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
      <div className="p-4 relative">
        <div className="absolute top-2 right-2 p-2 ">
          {isWishlisted ? (
            <FaHeart
              size={24}
              className="cursor-pointer text-violet-700"
              onClick={handleWishlistClick}
            />
          ) : (
            <FaRegHeart
              size={24}
              className="cursor-pointer text-violet-700"
              onClick={handleWishlistClick}
            />
          )}
        </div>
        <div className="overflow-y-auto max-h-[124px] hide-scrollbar">
          <h3 className="font-bold text-lg">{event_name}</h3>
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
          className={`w-full px-4 py-2 mt-2 text-white rounded-lg ${
            status === "active"
              ? "bg-violet-700  transition duration-200  ease-in-out transform hover:bg-violet-900 hover:scale-105"
              : "bg-gray-400"
          }  `}
          onClick={() => navigate(`/event-details/${event.id}`)}
          disabled={status !== "active"}
          data-tooltip-id="my-tooltip"
          data-tooltip-content={
            status !== "active" ? "This event is not active" : ""
          }
          data-tooltip-place="bottom"
        >
          {" "}
          Book Now
        </button>
        <Tooltip id="my-tooltip" />
        <p className="text-sm text-gray-600 mb-1">₹ {minTicketPrice} Onwards</p>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default EventCardPageView;
