import React from "react";
import Header from "../components/Header/Header";
import {useSelector} from "react-redux";
import EventCardPageView from "../components/Events/EventCardPageView";
import TextHeading from "../components/texts/TextHeading";

const WishList = () => {
  const wishlistItems = useSelector((state) => state.wishlist.WishListItems);

  const BASE_URL = "http://127.0.0.1:8000";

  function completeImageUrl(url) {
    if (url && !url.startsWith("http")) {
      console.log("completeImageUrl fn called ", url);
      return `${BASE_URL}${url}`;
    }
    return url;
  }

  const transformedWishlistItems = wishlistItems.map((item) => ({
    ...item,
    event: {
      ...item.event,
      event_img_1: completeImageUrl(item.event.event_img_1),
    },
  }));


  return (
    <div>
      <Header />
      <div className="relative">
        <div className="flex">
          <div className="flex justify-center flex-wrap pt-4 sm:pt-10 w-full px-8 sm:px-10 md:px-16 lg:px-20">
            <div className="grid grid-cols-1 c-tablet:grid-cols-2 c-desktop:grid-cols-3 gap-4">
              {transformedWishlistItems.length > 0 ? (
                transformedWishlistItems.map((item) => (
                  <EventCardPageView key={item.id} event={item.event} />
                ))
              ) : (
                <div className="flex items-center justify-center w-full mx-auto">
                  <img
                    src="https://www.godachi.com/assets/img/no-item.png"
                    alt=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishList;
