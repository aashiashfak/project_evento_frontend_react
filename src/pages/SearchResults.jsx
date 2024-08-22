import React, {useEffect, useState, useRef} from "react";
import axiosInstance from "../utilities/axios/axiosInstance";
import {useLocation} from "react-router-dom";
import Header from "../components/Header/Header";
import EventCardPageView from "../components/Events/EventCardPageView";
import SearchBar from "../components/Header/SearchBar";
import Lottie from "react-lottie";
import noDataAnimation from "../assets/LottieJson/NoDataAnimation.json";
import { Spinner } from "../components/spinner/Spinner";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const query = useQuery();
  const searchTerm = query.get("search");
  const prevSearchTermRef = useRef(""); // Keep track of previous search term

  useEffect(() => {
    const fetchEvents = async (pageNum) => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("events/list_all_events/", {
          params: {
            search: searchTerm,
            page: pageNum,
          },
        });
        setEvents((prevEvents) => {
          // Ensure no duplicate data is added
          const newEvents = response.data.results.filter(
            (newEvent) =>
              !prevEvents.some((prevEvent) => prevEvent.id === newEvent.id)
          );
          return [...prevEvents, ...newEvents];
        });
        setHasMore(response.data.next !== null);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    if (searchTerm && searchTerm !== prevSearchTermRef.current) {
      setEvents([]); // Clear events only when the search term changes
      setPage(1); // Reset page to 1
      setHasMore(true);
      prevSearchTermRef.current = searchTerm; // Update the ref to track the current search term
    }

    if (searchTerm) {
      fetchEvents(page);
    }
  }, [searchTerm, page]);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prevPage) => prevPage + 1);
      }
    });

    const target = document.querySelector("#load-more");
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [hasMore, loading]);

  if (loading){
    <Spinner/>
  }

  return (
    <div>
      <Header />
      <SearchBar />
      <div className="pt-4">
        <div>
          <h2 className="pl-6 sm:pl-8 md:pl-14 lg:pl-20 text-xl font-semibold mb-4 text-violet-700">
            SEARCH RESULTS
          </h2>
        </div>
        {events.length > 0 ? (
          <div className="flex justify-center flex-wrap pt-4 sm:pt-4 w-full px-8 sm:px-10 md:px-16 lg:px-20">
            <div className="grid grid-cols-1 c-tablet:grid-cols-2 c-desktop:grid-cols-3 gap-4">
              {events.map((event) => (
                <EventCardPageView key={event.id} event={event} />
              ))}
            </div>
          </div>
        ) : (
          !loading && (
            <div className="flex justify-center items-center flex-col mt-10">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: noDataAnimation,
                  rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice",
                  },
                }}
                height={200}
                width={200}
              />
              <p className="text-gray-500 mt-4">
                No results found for "{searchTerm}".
              </p>
            </div>
          )
        )}
        {/* Load more trigger */}
        <div id="load-more" className="h-10 w-full"></div>
        {loading && <p>Loading more events...</p>}
      </div>
    </div>
  );
};

export default SearchResults;
