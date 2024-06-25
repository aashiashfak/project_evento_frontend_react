import React from "react";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
import EventsByLocation from "../components/Events/EventsByLocation";
import { useSelector } from "react-redux";
import Banner from "../components/Banner/Banner";
// import axiosInstance from "../api/axiosInstance"; 




const Homepage = () => {
  const locationId = useSelector((state) => state.locations.locationId);


  return (
    <div className="">
      <Header />
      <NavHeader />
      <Banner />
      <EventsByLocation locationID={locationId} />
    </div>
  );
};

export default Homepage;
