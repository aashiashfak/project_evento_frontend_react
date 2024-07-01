import React, {useEffect, useState} from "react";
import axios from "axios";
import EventCard from "./EventCard";
import TextHeading from "../texts/TextHeading";

const EventsByLocation = ({locationID}) => {
  const [events, setEvents] = useState([]);

 const loc = events.length>0 ? events[0].location : '';
 console.log('location is :.....',loc);

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

  // const location = events[0].location
  // console.log('locataaaaaion............',location)

  return (
    <div className="mt-6">
      <TextHeading Heading={`EVENTS IN ${loc.toUpperCase()}`} />
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
