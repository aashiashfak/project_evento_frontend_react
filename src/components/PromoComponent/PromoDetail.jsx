import React from "react";

const PromoDetail = ({heading, description, icon: IconComponent}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start my-4 w-full text-white">
      <div className="w-20 h-16 lg:order-2 flex items-center justify-center">
        <IconComponent className="text-4xl text-white" />
      </div>
      <div className="lg:order-1">
        <h3 className="text-xl font-bold mb-2">{heading}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default PromoDetail;
