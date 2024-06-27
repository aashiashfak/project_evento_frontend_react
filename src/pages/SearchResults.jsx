import React, {useEffect, useState} from "react";
import axiosInstance from "../api/axiosInstance";
import {useLocation} from "react-router-dom";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
import EventCardPageView from "../components/Events/EventCardPageView";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const [events, setEvents] = useState([]);
  const query = useQuery();
  const searchTerm = query.get("search");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("events/list_all_events/", {
          params: {
            search: searchTerm,
          },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (searchTerm) {
      fetchEvents();
    }
  }, [searchTerm]);

  return (
    <div>
      <Header />
      <NavHeader />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Search Results</h2>
        {events.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-20 md:px-14 sm:px-8 px-6">
            {events.map((event) => (
              <EventCardPageView key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No results found for "{searchTerm}".</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
