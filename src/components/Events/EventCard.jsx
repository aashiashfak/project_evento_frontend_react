import React from "react";

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
    <div className="border rounded-lg shadow-md w-64 flex-shrink-0">
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
        <button className="w-full bg-violet-700 text-white px-4 py-2 mt-2 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default EventCard;
