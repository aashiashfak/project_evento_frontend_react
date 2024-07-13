import React from "react";
import PromoDetail from "./PromoDetail";
import EventImage from "../../assets/EventPromo/EventImage.png";
import quickSetupImage from "../../assets/EventPromo/quick-setup.png";
import wideDistributionImage from "../../assets/EventPromo/wide-distribution.jpg";
import easyInsightsImage from "../../assets/EventPromo/easy-insights.jpg";

const Promo = () => {
  return (
    <div className="container  px-8 sm:px-10 md:px-16 lg:px-20 mt-8">
      <h1 className="text-3xl font-bold text-left text-violet-700 mb-8">
        PUBLISH YOUR EVENT
      </h1>
      <div className="flex flex-col lg:flex-row lg:gap-4 justify-around items-start lg:items-center mb-8">
        <div className="lg:w-3/4 ">
          <p className="text-left text-xl mb-8">
            "List your events hassle-free on EVENTO and reach a wide audience
            effortlessly. Our user-friendly platform offers seamless execution,
            dedicated support, and unparalleled visibility. From large-scale
            conferences to intimate performances by independent artists, we've
            got you covered. Join our community today and elevate your event
            experience!"
          </p>
          <button className="bg-violet-700 text-white px-4 py-2 rounded-lg transition duration-200 transform hover:bg-violet-900 hover:scale-105">
            LIST YOUR EVENT
          </button>
        </div>
        <div className="w-full lg:w-1/4  lg:mb-24 ">
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
          image={quickSetupImage}
        />
        <PromoDetail
          heading="Wide Distribution"
          description="Utilize our platform to amplify your event's exposure with our wide distribution reach. Benefit from our extensive network and reach a large audience effortlessly, ensuring your event receives the attention it deserves."
          image={wideDistributionImage}
        />
        <PromoDetail
          heading="Easy Insights"
          description="Easily monitor how your event is performing and gain valuable insights into its success."
          image={easyInsightsImage}
        />
      </div>
    </div>
  );
};

export default Promo;
