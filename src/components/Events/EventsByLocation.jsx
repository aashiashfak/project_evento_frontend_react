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
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (locationID) {
      fetchEvents();
    }
  }, [locationID]);

  return (
    <div className="p-4 bg-white">
      {events.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p>No events available for this location.</p>
      )}
    </div>
  );
};

export default EventsByLocation;
