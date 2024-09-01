import React, { useState } from "react";
import PromoDetail from "./PromoDetail";
import EventImage from "../../assets/EventPromo/EventImage.png";
import { FaGlobe, FaChartLine} from "react-icons/fa";
import {IoSpeedometerSharp} from "react-icons/io5";
import publish_bg from "../../assets/EventPromo/publish_events_background.jpg";
import { useSelector } from "react-redux";

const Promo = () => {

  const role = useSelector((state) => state.user.role);
  return (
    <div
      className="relative w-full bg-cover bg-center py-4"
      style={{backgroundImage: `url(${publish_bg})`}}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
      {/* Dark overlay */}
      <div className="relative container px-8 sm:px-10 md:px-16 lg:px-20 mt-8">
        <h1 className="text-3xl font-bold text-left text-white mb-8 pt-4">
          PUBLISH YOUR EVENT
        </h1>
        <div className="flex flex-col lg:flex-row lg:gap-4 justify-around items-start lg:items-center mb-8">
          <div className="lg:w-3/4">
            <p className="text-left text-lg mb-8 text-white">
              "List your events hassle-free on EVENTO and reach a wide audience
              effortlessly. Our user-friendly platform offers seamless
              execution, dedicated support, and unparalleled visibility. From
              large-scale conferences to intimate performances by independent
              artists, we've got you covered. Join our community today and
              elevate your event experience!"
            </p>
            {(!role || (role !== "admin" && role !== "vendor")) && (
              <button className="bg-violet-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:bg-violet-900 hover:scale-105">
                LIST YOUR EVENT
              </button>
            )}
          </div>
          <div className="w-full lg:w-1/4 lg:mb-24">
            <div className="hidden lg:block w-32 h-32">
              <img
                src={EventImage}
                alt="Event"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <PromoDetail
            heading="Quick & Easy Event Setup"
            description="List your event under five minutes. Our all-in-one platform lets you set up, sell event tickets, host them, generate reports and collect payments."
            icon={IoSpeedometerSharp}
          />
          <PromoDetail
            heading="Wide Distribution"
            description="Utilize our platform to amplify your event's exposure with our wide distribution reach. Benefit from our extensive network and reach a large audience effortlessly, ensuring your event receives the attention it deserves."
            icon={FaGlobe}
          />
          <PromoDetail
            heading="Easy Insights"
            description="Easily monitor how your event is performing and gain valuable insights into its success."
            icon={FaChartLine}
          />
        </div>
      </div>
    </div>
  );
};

export default Promo;
