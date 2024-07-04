import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/Header/Header";
import EventsByLocation from "../components/Events/EventsByLocation";
import Banner from "../components/Banner/Banner";
import TrendingEvents from "../components/Events/TrendingEvents";
import Categories from "../components/Events/Categories";
import SearchBar from "../components/Header/SearchBar";
import axiosInstance from "../api/axiosInstance";
import {setWishListItems} from "../redux/WishListSlice";

const Homepage = () => {
  const dispatch = useDispatch();
  const locationId = useSelector((state) => state.locations.locationId);
  const user = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);

  useEffect(() => {
    if (user && user.accessToken && wishlistItems.length === 0) {
      axiosInstance
        .get("events/wishlist/")
        .then((response) => {
          const responseData = response.data;
          dispatch(setWishListItems(responseData));
          console.log('wihslist response data from home page',responseData);
        })
        .catch((error) => {
          console.error("Error fetching wishlist items:", error);
        });
    }
  }, [user, wishlistItems.length, dispatch]);



  return (
    <div className="bg-white">
      <Header />
      <SearchBar />
      <Banner />
      <EventsByLocation locationID={locationId} />
      <Categories />
      <TrendingEvents />
    </div>
  );
};

export default Homepage;
