import React from "react";
import {useNavigate} from "react-router-dom";

const EventCardPageView = ({event}) => {
  const {
    id,
    event_name,
    start_date,
    venue,
    location,
    event_img_1,
    time,
    organizer_name,
  } = event;

  const navigate = useNavigate();

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
    <div className="bg-white border border-gray-200 rounded-lg shadow-md ">
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
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2">{event_name}</h3>
        <p className="text-gray-600 mb-2">{organizer_name}</p>
        <p className="text-gray-600 mb-2">
          {formattedDate} <span className="font-semibold">|</span>{" "}
          {formattedTime}
        </p>
        <p className="text-gray-600 mb-2">
          {venue} <span className="font-semibold">|</span> {location}
        </p>
        <button
          className="w-full bg-violet-700 text-white px-4 py-2 mt-2 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105"
          onClick={() => navigate(`/event-details/${id}`)}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventCardPageView;
