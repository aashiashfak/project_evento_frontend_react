import React, {useState, useEffect} from "react";
import axiosInstance from "../utilities/axios/axiosInstance";
import Header from "../components/Header/Header";
import FilterSidebar from "../components/Events/SideBar";
import EventCardPageView from "../components/Events/EventCardPageView";
import {FiFilter} from "react-icons/fi";
import {useParams} from "react-router-dom";
import "../../src/css/Global.css";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(false); // New state for loading
  const [hasMore, setHasMore] = useState(true); // New state to track if more data is available
  const [page, setPage] = useState(1); // New state to track the current page
  const {categoryName} = useParams();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const fetchEvents = async (pageNum) => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("events/list_all_events/", {
          params: {...filters, page: pageNum},
        });
        setEvents((prevEvents) => [...prevEvents, ...response.data.results]);
        setHasMore(response.data.next !== null); // If there is no next page, set hasMore to false
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    if (!initialLoad) {
      fetchEvents(page);
    }
  }, [filters, initialLoad, page]);

  useEffect(() => {
    if (initialLoad) {
      if (categoryName) {
        setFilters((prevFilters) => ({
          ...prevFilters,
          category: categoryName,
        }));
      }
      setInitialLoad(false);
    }
  }, [categoryName, initialLoad]);

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowSidebar(false);
    setEvents([]); // Reset events when filters change
    setPage(1); // Reset page to 1 when filters change
    setHasMore(true); // Reset hasMore when filters change
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="relative">
      <Header />
      <div className="flex">
        {/* Sidebar Toggle Button */}
        <div className="fixed sm:top-[93px] md:top-[78px] top-[88px] left-4 z-50">
          <button
            onClick={toggleSidebar}
            className="bg-violet-700 text-white p-4 rounded-full shadow-lg opacity-40 hover:bg-violet-600 flex items-center hover:opacity-100"
          >
            <FiFilter className="" />
          </button>
        </div>

        {/* Overlay */}
        {showSidebar && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowSidebar(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-white transform transition-transform duration-300 ease-in-out ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } overflow-y-auto overflow-x-hidden`}
        >
          <FilterSidebar
            onFilterChange={handleFilterChange}
            closeSidebar={() => setShowSidebar(false)}
            initialCategory={categoryName}
          />
        </div>

        {/* Event cards */}
        <div
          className={`flex justify-center flex-wrap py-12 w-full sm:pt-10 px-6 sm:px-10 md:px-16 lg:px-20 ${
            showSidebar ? "overflow-hidden" : ""
          }`}
        >
          <div className="grid grid-cols-1 c-tablet:grid-cols-2 c-desktop:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCardPageView key={event.id} event={event} />
            ))}
          </div>

          {/* Load more trigger */}
          <div id="load-more" className="h-10 w-full"></div>

          {loading && <p>Loading more events...</p>}
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
