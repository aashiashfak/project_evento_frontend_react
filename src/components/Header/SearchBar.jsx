import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";

const SearchBar = ({locations, onLocationChange}) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex relative w-full mt-1">
      <input
        type="text"
        placeholder="Discover thrilling adventures, electrifying concerts, and scenic hikes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 pr-14 border focus:outline-none hover:bg-gray-50 focus:bg-gray-200 border-gray-300 rounded-l-full flex-grow truncate placeholder-ellipsis placeholder:text-gray-500"
      />
      <FaSearch
        className={`absolute right-40 top-1/2 transform -translate-y-1/2 ${
          searchTerm ? "text-blue-500" : "text-gray-400"
        }`}
      />
      <select
        className="p-2 border border-gray-300 bg-violet-700 text-white hover:bg-violet-800 rounded-r-lg focus:outline-none"
        onChange={onLocationChange}
      >
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
    </div>
  );
};

export default SearchBar;
