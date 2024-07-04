import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaHeart, FaRegHeart} from "react-icons/fa";
import {useSelector, useDispatch} from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import LoginModal from "../accounts/LoginModal";
import {setWishListItems} from "../../redux/WishListSlice"; 

const EventCard = ({event}) => {
  const {
    event_name,
    start_date,
    venue,
    location,
    event_img_1,
    time,
    organizer_name,
  } = event;

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);
  const dispatch = useDispatch();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    // Check if the event is in the wishlist
    setIsWishlisted(
      wishlistItems.some((wishlistItem) => wishlistItem.event === event.id)
    );
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
              wishlistItems.filter((item) => item.event !== event.id)
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
    <div className="border rounded-lg shadow-md w-64 flex-shrink-0 relative">
      <div className="h-64 bg-gray-200 flex items-center justify-center rounded-t-lg">
        <div className="absolute right-2 top-2">
          {isWishlisted ? (
            <FaHeart
              size={24}
              className="cursor-pointer text-white"
              onClick={handleWishlistClick}
            />
          ) : (
            <FaRegHeart
              size={24}
              className="cursor-pointer text-white"
              onClick={handleWishlistClick}
            />
          )}
        </div>
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
      <div className="py-2 px-4">
        <div>
          <h3 className="font-bold text-lg">{event_name}</h3>
          <h2>{organizer_name}</h2>
          <p>
            {formattedDate} <span className="font-semibold">|</span>{" "}
            {formattedTime}
          </p>
          <p>
            {venue} <span className="font-semibold">|</span> {location}
          </p>
        </div>
        <button
          className="w-full bg-violet-700 text-white px-4 py-2 mt-2 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105"
          onClick={() => navigate(`/event-details/${event.id}`)}
        >
          Book Now
        </button>
      </div>
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default EventCard;
