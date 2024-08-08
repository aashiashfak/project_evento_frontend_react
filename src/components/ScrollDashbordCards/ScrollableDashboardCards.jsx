import React, {useRef, useEffect, useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import DashboardCard from "../../components/admin/Dashborad/DashboardCard";

const ScrollableDashboard = ({cards}) => {
  const scrollContainerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const {scrollWidth, clientWidth} = scrollContainerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [cards]);

  const handleScrollLeft = () => {
    scrollContainerRef.current.scrollBy({left: -250, behavior: "smooth"});
  };

  const handleScrollRight = () => {
    scrollContainerRef.current.scrollBy({left: 250, behavior: "smooth"});
  };

  return (
    <div className="flex items-center justify-center ">
      {isScrollable && (
        <button
          onClick={handleScrollLeft}
          className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full shadow-md"
        >
          <FaChevronLeft />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pt-2 pb-5 px-4 hide-scrollbar"
      >
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      {isScrollable && (
        <button
          onClick={handleScrollRight}
          className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full shadow-md"
        >
          <FaChevronRight />
        </button>
      )}
    </div>
  );
};

export default ScrollableDashboard;
