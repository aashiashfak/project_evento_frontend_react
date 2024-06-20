import React, {useEffect, useState} from "react";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
import EventsByLocation from "../components/Events/EventsByLocation";
import {useSelector} from "react-redux";
import axiosInstance from "../api/axiosInstance";

const Homepage = () => {
  const [locations, setLocations] = useState([]);
  const locationId = useSelector((state) => state.locations.locationId);
  const location = locations.find((location) => location.id === locationId)
  const locationName = location ? location.name : "unknown Location"

  console.log(locationName)

  useEffect(() => {
    console.log("enter in heder useEffect");
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

  return (
    <div className="">
      <Header locations={locations} />
      <NavHeader />
      <EventsByLocation locationID={locationId} locationName={locationName} />
    </div>
  );
};

export default Homepage;
