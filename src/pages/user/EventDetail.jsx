import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FaHeart, FaRegHeart, FaShareAlt} from "react-icons/fa";
import axiosInstance from "../../utilities/axios/axiosInstance";
import Header from "../../components/Header/Header";
import Accordion from "../../components/Events/Accordion";
import {setWishListItems} from "../../redux/WishListSlice";
import LoginRequireModal from "../../components/Protecters/LoginRequireModal";
import {FaCalendarDays, FaClock} from "react-icons/fa6";
import {TbBuildingCircus} from "react-icons/tb";
import {PiCity} from "react-icons/pi";
import {IoLocationSharp, IoTicket} from "react-icons/io5";
import "react-tooltip/dist/react-tooltip.css";
import {Tooltip} from "react-tooltip";
import Organizer from "../../components/Events/Organizer";
import {showToast} from "../../utilities/tostify/toastUtils";
import {Spinner} from "../../components/spinner/Spinner";
import {convert24To12Hour} from "../../utilities/convert24to12Hour";

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

    const ID = parseInt(eventID);
    try {
      if (isWishlisted) {
        const response = await axiosInstance.delete(`events/wishlist/${ID}/`);
        console.log('wishlist removed',response);
        setIsWishlisted(false);
        showToast(`${event_name} removed from wishlist`, "error");
        dispatch(
          setWishListItems(wishlistItems.filter((item) => item.event.id !== ID))
        );
      } else {
        const response = await axiosInstance.post(`events/wishlist/${ID}/`);
        console.log('wishlist added',response);
        setIsWishlisted(true);
        showToast(`${event_name} added to wishlist`, "success");
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
    return <Spinner />;
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
    organizer_id,
    organizer_email,
    organizer_phone,
    organizer_profile_photo,
    about,
    instruction,
    terms_and_conditions,
    ticket_types,
    time,
    location_url,
    status,
  } = eventDetails;

  const eventDate = new Date(start_date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  const formattedTime = convert24To12Hour(time);

  const totalTickets = ticket_types.reduce(
    (acc, ticket) => acc + ticket.count,
    0
  );
  const soldTickets = ticket_types.reduce(
    (acc, ticket) => acc + ticket.sold_count,
    0
  );
  const availableTickets = totalTickets - soldTickets;
  const minTicketPrice = Math.min(...ticket_types.map((t) => t.price));

  let ticketStatusText = "";
  let isTicketsAvailable = true;

  if (availableTickets === 0) {
    ticketStatusText = "No tickets available";
    isTicketsAvailable = false;
  } else if (availableTickets < 20) {
    ticketStatusText = "Only a few left";
  }

  console.log("eventDetails", eventDetails);

  const generateEmbedUrl = (url) => {
    if (!url) return null;
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
      <div className="container mx-auto sm:px-4 md:px-20 lg:px-28 pt-6 p-4">
        <div className="">
          <div className="w-full mb-5  h-80 shadow-md rounded ">
            {event_img_1 ? (
              <img
                src={event_img_1}
                alt={event_name}
                className="object-cover rounded shadow-md w-full h-full"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded shadow-lg mb-5">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          <div className="w-full relative ">
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
              <div className="absolute top-20 right-2 hidden sm:block w-max">
                <button
                  className={`w-full mt-1 flex items-center justify-center gap-2 ${
                    isTicketsAvailable && status === "active"
                      ? "bg-violet-700 hover:bg-violet-900 hover:scale-105"
                      : "bg-gray-400 cursor-default opacity-50"
                  } text-white px-4 py-2 transition duration-200 rounded-lg ease-in-out transform `}
                  onClick={() =>
                    isTicketsAvailable &&
                    status === "active" &&
                    navigate(`/ticket-types/${id}`)
                  }
                  disabled={!isTicketsAvailable || status !== "active"}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={
                    !isTicketsAvailable
                      ? "No tickets available"
                      : status !== "active"
                      ? "This event is not active"
                      : ""
                  }
                  data-tooltip-place="top"
                >
                  <p>Buy Tickets</p>
                  <IoTicket />
                </button>
                <Tooltip id="my-tooltip" />
                <p className="text-gray-500 text-sm mb-1">
                  ₹ {minTicketPrice} Onwards
                </p>
                <div className="mt-2 w-full sm:w-1/3 lg:w-full text-sm mb-2">
                  {ticketStatusText && (
                    <div className="text-red-500 text-sm w-full">
                      <h1
                        className="bg-red-600 opacity-50 w-auto rounded-lg text-white px-4 "
                        style={{width: "max-content"}}
                      >
                        {ticketStatusText}
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md  pt-6">
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
              </div>
              <div className="sm:hidden">
                <button
                  className={`w-full sm:w-1/3 lg:w-full mt-1 flex items-center justify-center gap-2 ${
                    isTicketsAvailable && status === "active"
                      ? "bg-violet-700 hover:bg-violet-900 hover:scale-105"
                      : "bg-gray-400 cursor-default opacity-50"
                  } text-white px-4 py-2 transition duration-200 rounded-lg ease-in-out transform `}
                  onClick={() =>
                    isTicketsAvailable && navigate(`/ticket-types/${id}`)
                  }
                  disabled={!isTicketsAvailable || status !== "active"}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={
                    status !== "active" ? "This event is not active" : ""
                  }
                  data-tooltip-place="bottom"
                >
                  <p>View Tickets</p>{" "}
                  <span>
                    <IoTicket />
                  </span>
                </button>
                <Tooltip id="my-tooltip" />
                <p className="text-gray-500 text-sm mb-1">
                  ₹ {minTicketPrice} Onwards
                </p>
                <div className="mt-2 w-full sm:w-1/3 lg:w-full text-sm mb-2">
                  {ticketStatusText && (
                    <div className="text-red-500 text-sm w-full">
                      <h1
                        className="bg-red-600 opacity-50 w-auto rounded-lg text-white px-4 "
                        style={{width: "max-content"}}
                      >
                        {ticketStatusText}
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {location_url && (
          <div className="">
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
        )}
        <div className="mt-4 flex mb-4">
          <Organizer
            vendor_id={organizer_id}
            email={organizer_email}
            phone={organizer_phone}
            name={organizer_name}
            photo={organizer_profile_photo}
          />
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
