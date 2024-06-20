import React, {useEffect, useState} from "react";
import axios from "axios";
import EventCard from "./EventCard";

const EventsByLocation = ({locationID, locationName}) => {
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
    <div className="bg-white">
      <h1 className="font-semibold text-violet-700 text-2xl mt-8 ml-8 sm:ml-12 md:ml-16">
        Events In {locationName}
      </h1>
      <div className="py-8 px-10 sm:px-14 md:px-20 bg-white overflow-x-auto overflow-y-hidden whitespace-nowrap">
        {events.length > 0 ? (
          <div className="inline-flex space-x-4 pr-10 sm:pr-14 md:pr-20">
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
