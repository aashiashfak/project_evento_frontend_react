import React from "react";

const EventCard = ({ event }) => {
  const { event_name, start_date, venue, location, event_img_1 } = event;

  // Format the date and time
  const eventDate = new Date(start_date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = eventDate.toLocaleDateString("en-US", options);

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h3 className="font-bold text-lg">{event_name}</h3>
      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
        {event_img_1 ? (
          <img src={event_img_1} alt="" className="w-full h-full object-cover rounded-t-lg" />
        ) : (
          <span className="text-gray-500">No image available</span>
        )}
      </div>
      <p>{formattedDate}</p>
      <p>{venue}</p>
      <p>{location}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
        Book Now
      </button>
    </div>
  );
};

export default EventCard;
