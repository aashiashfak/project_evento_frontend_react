import React, {useEffect, useState} from "react";
import axiosInstance from "../../api/axiosInstance";
import EventCard from "./EventCard";

const TrendingEvents = () => {
  const [trendingEvents, setTrendingEvents] = useState([]);

  useEffect(() => {
    const fetchTrendingEvents = async () => {
      try {
        const response = await axiosInstance.get("events/trending-events/");
        setTrendingEvents(response.data);
      } catch (error) {
        console.log("Error fetching Trending Events");
      }
    };
    fetchTrendingEvents();
  }, []);
  return (
    <div>
      <h1 className="font-semibold text-violet-700 text-2xl ml-6 md:ml-14 lg:ml-20">
        TRENDING EVENTS
      </h1>
      <div className="pb-4 pt-4  px-6 md:px-16 lg:px-20 bg-white overflow-x-auto overflow-y-hidden ">
        {trendingEvents.length > 0 ? (
          <div className="inline-flex space-x-4 pr-6 sm:pr-14 md:pr-20">
            {trendingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-center">No Trendingevents available.</p>
        )}
      </div>
    </div>
  );
};

export default TrendingEvents;
