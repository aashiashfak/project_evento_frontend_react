import React, {useEffect, useState} from "react";
import axios from "axios";
import EventCard from "./EventCard";

const EventsByLocation = ({locationID}) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/events/by_location/${locationID}/`
        );
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (locationID) {
      fetchEvents();
    }
  }, [locationID]);

  return (
    <div className="">
      <h1 className="font-semibold text-violet-700 text-2xl mt-8 ml-6 md:ml-14 lg:ml-20">
        {/* Events In {locationName} */} EVENTS BY LOCATION
      </h1>
      <div className="pt-4 pb-6 px-6 md:px-14 lg:px-20 bg-white overflow-x-auto overflow-y-hidden">
        {events.length > 0 ? (
          <div className="inline-flex space-x-4 pr-6 sm:pr-14 md:pr-20">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center">No events available for this location.</p>
        )}
      </div>
    </div>
  );
};

export default EventsByLocation;
