import React from "react";
import Header from "../components/Header/Header";
import {useSelector} from "react-redux";
import EventCardPageView from '../components/Events/EventCardPageView'

const WishLIst = () => {
  // const user = useSelector((state) => state.user);
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);

  console.log('wishlistItems in WishlistPage ',wishlistItems)

  
  return (
    <div>
      <Header />
      <div className="flex-1 pt-12 sm:pt-10 px-4 sm:px-8 md:px-10 lg:px-10">
        <div className="grid grid-cols-1 c-tablet:grid-cols-2 c-laptop:grid-cols-3 c-desktop:grid-cols-4 gap-4">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <EventCardPageView key={item.id} event={item.event} />
            ))
          ) : (
            <h1>No events in wishlist</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishLIst;
