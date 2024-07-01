import React, {useState, useEffect} from "react";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
import FilterSidebar from "../components/Events/SideBar";
import EventCardPageView from "../components/Events/EventCardPageView";
import {FiFilter} from "react-icons/fi";
import {useParams} from "react-router-dom";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({});
  const [showSidebar, setShowSidebar] = useState(false);
  const {categoryName} = useParams();
 const [initialLoad, setInitialLoad] = useState(true);

 
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("events/list_all_events/", {
          params: filters,
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (!initialLoad) {
      fetchEvents();
    }
  }, [filters, initialLoad]);

  useEffect(() => {
    // Only set filters based on categoryName if initialLoad is true
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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setShowSidebar(false); // Close the sidebar after applying filters
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="relative">
      <Header />
      <NavHeader />
      <div className="flex">
        <div className="fixed sm:top-28 top-32 left-4 z-50">
          <button
            onClick={toggleSidebar}
            className="bg-violet-700 text-white p-2 rounded-lg shadow-lg hover:bg-violet-600 flex items-center"
          >
            <FiFilter className="mr-2" /> {/* Add the filter icon */}
            {showSidebar ? "Hide Filters" : "Show Filters"}
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
          className={`flex-1 pt-12 sm:pt-10 px-4 sm:px-8 md:px-16 lg:px-20 ${
            showSidebar ? "overflow-hidden" : ""
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {events.map((event) => (
              <EventCardPageView key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllEvents;
