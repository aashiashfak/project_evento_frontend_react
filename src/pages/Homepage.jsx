import React from "react";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
import EventsByLocation from "../components/Events/EventsByLocation";
import { useSelector } from "react-redux";
// import axiosInstance from "../api/axiosInstance"; 

const Homepage = () => {
  const locationId = useSelector((state) => state.locations.locationId);

  return (
    <div className=" bg-gray-100">
      <Header/>
      <NavHeader/>
      <EventsByLocation locationID={locationId}/>
    </div>
  );
};

export default Homepage;
