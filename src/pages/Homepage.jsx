import React, {useEffect, useState} from "react";
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
import UserFooter from "../components/userLayout/UserFooter";
import {TicketLoader} from "../components/spinner/Spinner";

const Homepage = () => {
  const dispatch = useDispatch();
  const locationId = useSelector((state) => state.locations.locationId);
  const user = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer)
  }, []);

  if (isLoading){
    return <TicketLoader />;
  }

  return (
    <div className="bg-white">
      <Header />
      <SearchBar />
      <Banner />
      <div className="px-4 sm:px-8 md:px-12 lg:px-16">
        <EventsByLocation locationID={locationId} />
        <Categories />
        <TrendingEvents />
      </div>

      <Promo />
      <UserFooter />
    </div>
  );
};

export default Homepage;
