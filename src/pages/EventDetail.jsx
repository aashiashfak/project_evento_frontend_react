import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaHeart, FaRegHeart, FaShareAlt} from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header/Header";
import Accordion from "../components/Events/Accordion";
import {setWishListItems} from "../redux/WishListSlice";
import LoginRequireModal from "../components/Protecters/LoginRequireModal";
import {FaCalendarDays, FaClock} from "react-icons/fa6";
import {TbBuildingCircus} from "react-icons/tb";
import {PiCity} from "react-icons/pi";
import {IoLocationSharp} from "react-icons/io5";

const EventDetail = () => {
  const {eventID} = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `events/event_details/${eventID}`
        );
        setEventDetails(response.data);
      } catch (error) {
        console.log("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventID]);

  useEffect(() => {
    setIsWishlisted(
      wishlistItems.some(
        (wishlistItem) => wishlistItem.event.id === parseInt(eventID)
      )
    );
  }, [wishlistItems, eventID]);



  const handleWishlistClick = async () => {
    if (!user || !user.accessToken) {
      setShowLoginModal(true);
      return;
    }

    const ID = parseInt(eventID)
    try {
      if (isWishlisted) {
        await axiosInstance.delete(`events/wishlist/${ID}/`);
        setIsWishlisted(false);
        dispatch(
          setWishListItems(
            wishlistItems.filter((item) => item.event.id !== ID)
          )
        );
      } else {
        const response = await axiosInstance.post(
          `events/wishlist/${ID}/`
        );
        setIsWishlisted(true);
        dispatch(setWishListItems([...wishlistItems, response.data]));
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleShareClick = () => {
    const shareData = {
      title: eventDetails.event_name,
      text: `${eventDetails.event_name}\n${formattedDate} at ${formattedTime}`,
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          console.log("Shared successfully!");
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard
        .writeText(
          `${eventDetails.event_name}\n${formattedDate} at ${formattedTime}\n${window.location.href}`
        )
        .then(() => {
          console.log("copied to clipboard");
        })
        .catch((error) => console.log("Error copying to clipboard", error));
    }
  };


  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const {
    id,
    event_name,
    categories,
    start_date,
    event_img_1,
    venue,
    location,
    organizer_name,
    about,
    instruction,
    terms_and_conditions,
    ticket_types,
    time,
    location_url,
  } = eventDetails;

  const eventDate = new Date(start_date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const eventTime = new Date(`1970-01-01T${time}Z`);
  const formattedTime = eventTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

 const generateEmbedUrl = (url) => {
    const regex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
    const match = url.match(regex);
    if (match) {
      const latitude = match[1];
      const longitude = match[2];
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyBCZsKGqzSmrvA9sLOLAb9_VeIo_LTN5Po&q=${latitude},${longitude}&zoom=14`;
    }
    return url; 
  };

 const googleMapsEmbedUrl = generateEmbedUrl(location_url);

  return (
    <div>
      <Header />
      <div className="container mx-auto sm:px-8 md:px-14 lg:px-16 pt-6 p-4">
        <div className="flex flex-col lg:flex-row lg:space-x-4 justify-center">
          <div className="w-full lg:w-2/3 mb-4 lg:mb-0 h-80 shadow-md rounded ">
            {event_img_1 ? (
              <img
                src={event_img_1}
                alt={event_name}
                className="object-cover rounded shadow-md w-full h-full"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded shadow-lg">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          <div className="w-full lg:w-1/3 relative ">
            <div className="absolute right-4 top-7 ">
              <div className="flex gap-3 text-violet-700">
                {isWishlisted ? (
                  <FaHeart
                    size={24}
                    className="cursor-pointer"
                    onClick={handleWishlistClick}
                  />
                ) : (
                  <FaRegHeart
                    size={24}
                    className="cursor-pointer"
                    onClick={handleWishlistClick}
                  />
                )}
                <FaShareAlt
                  size={24}
                  className="cursor-pointer"
                  onClick={handleShareClick}
                />
              </div>
              <div className="absolute hidden sm:block lg:hidden top-9 right-2 w-80">
                <div className="mt-4 flex text-xl text-violet-700 mb-4 font-semibold">
                  <IoLocationSharp className="mt-1" size={24} />
                  <h1>Event Location </h1>
                </div>
                <div className="flex justify-center aspect-h-9 w-full lg:w-1/3 mb-4 mt-4">
                  <iframe
                    src={googleMapsEmbedUrl}
                    frameBorder="0"
                    className="w-full "
                    title="Google Maps Location"
                  ></iframe>
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md h-80 pt-6">
              <h1 className="text-xl font-bold mb-2">{event_name}</h1>
              <div className="text-gray-600">
                <div className="flex ">
                  <FaCalendarDays className="mr-1 mt-1" />
                  <p className="mr-1">{formattedDate}</p>
                </div>
                <div className="flex mt-1">
                  <FaClock className="mr-1 mt-1" />
                  <p className="mr-1">{formattedTime}</p>
                </div>
                <div className="flex">
                  <TbBuildingCircus className="mr-1 mt-1" />
                  <p className="mr-1">{venue}</p>
                </div>
                <div className="flex mt-1">
                  <PiCity className="mr-1 mt-1" />
                  <p>{location}</p>
                </div>
                <p className="mt-1">{categories.join(" | ")}</p>
                <p className="mt-1">{organizer_name}</p>
              </div>

              <button
                className="w-full sm:w-1/3 lg:w-full bg-violet-700 text-white px-4 py-2 mt-4 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105"
                onClick={() => navigate(`/ticket-types/${id}`)}
              >
                Tickets
              </button>
              <p className="mt-2 text-gray-500">
                ₹ {Math.min(...ticket_types.map((t) => t.price))} Onwards
              </p>
            </div>
          </div>
        </div>
        <div className="sm:hidden lg:block">
          <div className="mt-4 flex text-2xl text-violet-700 mb-4 font-semibold">
            <IoLocationSharp className="mt-1" size={24} />
            <h1>Event Location </h1>
          </div>
          <div className="flex justify-center aspect-h-9 w-full lg:w-1/3 mb-4 mt-4">
            <iframe
              src={googleMapsEmbedUrl}
              frameBorder="0"
              className="w-full "
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>

        <div className="mt-4">
          <div className="shadow-md rounded-lg mb-4">
            <Accordion title="ABOUT" description={about} />
          </div>
          <div className="shadow-md rounded-lg mb-4">
            <Accordion title="INSTRUCTION" description={instruction} />
          </div>
          <div className="shadow-md rounded-lg">
            <Accordion
              title="TERMS AND CONDITION"
              description={terms_and_conditions}
            />
          </div>
        </div>
      </div>
      {showLoginModal && (
        <LoginRequireModal onClose={() => setShowLoginModal(false)} />
      )}
    </div>
  );
};

export default EventDetail;
