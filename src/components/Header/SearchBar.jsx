import React, {useEffect, useState} from "react";
import {FaSearch} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {setLocationId} from "../../redux/locationIDSlice";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../../utilities/axios/axiosInstance";
import {PiCity} from "react-icons/pi";

const SearchBar = () => {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const storedLocation = useSelector((state) => state.locations.locationId);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("enter in serchbar useEffect");
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get("/events/locations/");
        setLocations(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchLocations();
  }, []);

  const handleLocationChange = (event) => {
    const selectedLocation = locations.find(
      (location) => location.name === event.target.value
    );
    if (selectedLocation) {
      dispatch(setLocationId(selectedLocation.id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search-results?search=${searchTerm}`);
    }
  };

  return (
    <div className="flex w-full pb-4 px-8 shadow-lg  sm:pt-0 sticky top-[60px] sm:top-[72px] z-10 bg-white md:top-[56px]">
      <form onSubmit={handleSubmit} className="flex w-full ">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Discover thrilling adventures, electrifying concerts, and scenic hikes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 text-sm pr-14 border focus:outline-none hover:bg-gray-50 focus:bg-gray-200 border-gray-300 rounded-l-full w-full truncate placeholder-ellipsis placeholder:text-gray-500 shadow-md"
          />
          <button
            type="submit"
            className="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <FaSearch
              className={
                searchTerm ? "text-blue-500 cursor-pointer" : "text-gray-400"
              }
            />
          </button>
        </div>
        <div className="relative ">
          <select
            className="p-2 border border-gray-300 bg-violet-700 text-white hover:bg-violet-800 rounded-r-full focus:outline-none text-sm shadow-md pr-8 cursor-pointer"
            onChange={handleLocationChange}
            value={
              locations.find((location) => location.id === storedLocation)
                ?.name || ""
            }
          >
            <option value="" disabled>
              Select a city
            </option>
            {locations.map((location) => (
              <option
                key={location.id}
                value={location.name}
                className="bg-white text-black text-sm sm:text-md hover:bg-gray-200"
              >
                {location.name}
              </option>
            ))}
          </select>
          <PiCity className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white cursor-pointer" />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
