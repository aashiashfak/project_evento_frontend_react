import React, {useEffect, useState} from "react";
import axiosInstance from "../api/axiosInstance";
import {useLocation} from "react-router-dom";
import Header from "../components/Header/Header";
import EventCardPageView from "../components/Events/EventCardPageView";
import SearchBar from "../components/Header/SearchBar";

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
      <SearchBar />
      <div className="pt-4">
        <div>
          <h2 className="pl-6 sm:pl-8 md:pl-14 lg:pl-20 md text-xl font-semibold mb-4 text-violet-700">
            SEARCH RESULTS
          </h2>
        </div>
        {events.length > 0 ? (
          <div className="flex justify-center flex-wrap pt-4 sm:pt-4  w-full  px-8 sm:px-10 md:px-16 lg:px-20">
            <div className="grid grid-cols-1 c-tablet:grid-cols-2 c-desktop:grid-cols-3 gap-4">
              {events.map((event) => (
                <EventCardPageView key={event.id} event={event} />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 ml-20">
            No results found for "{searchTerm}".
          </p>
        )}
      </div>
    </div>
  );
};
export default SearchResults;
