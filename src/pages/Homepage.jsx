import React from "react";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
import EventsByLocation from "../components/Events/EventsByLocation";
import { useSelector } from "react-redux";
import Banner from "../components/Banner/Banner";
import TrendingEvents from "../components/Events/TrendingEvents";
import Categories from "../components/Events/Categories";
// import axiosInstance from "../api/axiosInstance"; 




const Homepage = () => {
  const locationId = useSelector((state) => state.locations.locationId);


  return (
    <div className="bg-white">
      <Header />
      <NavHeader />
      <Banner />
      <EventsByLocation locationID={locationId} />
      <Categories/>
      <TrendingEvents/>
    </div>
  );
};

export default Homepage;
