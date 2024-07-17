import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Header from "../components/Header/Header";
import EventsByLocation from "../components/Events/EventsByLocation";
import Banner from "../components/Banner/Banner";
import TrendingEvents from "../components/Events/TrendingEvents";
import Categories from "../components/Events/Categories";
import SearchBar from "../components/Header/SearchBar";
import {setWishListItems} from "../redux/WishListSlice";
import Promo from "../components/PromoComponent/Promo";
import {getWishlistItems} from "../api/events/wishlist";

const Homepage = () => {
  const dispatch = useDispatch();
  const locationId = useSelector((state) => state.locations.locationId);
  const user = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);

  useEffect(() => {
    const fetchwishlist = async () => {
      if (user && user.accessToken && wishlistItems.length === 0) {
        try {
          const responseData = await getWishlistItems();
          dispatch(setWishListItems(responseData));
        } catch (error) {
          console.log("error fetching wishlist", error);
        }
      }
    };
    fetchwishlist();
  }, [user, wishlistItems.length, dispatch]);

  return (
    <div className="bg-white">
      <Header />
      <SearchBar />
      <Banner />
      <EventsByLocation locationID={locationId} />
      <Categories />
      <TrendingEvents />
      <Promo />
    </div>
  );
};

export default Homepage;
