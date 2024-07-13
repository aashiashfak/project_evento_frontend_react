import React from "react";

const PromoDetail = ({heading, description, image}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4 items-start my-4 w-full">
      <div className="lg:order-1">
        <h3 className="text-xl font-bold mb-2">{heading}</h3>
        <p>{description}</p>
      </div>
      <img src={image} alt={heading} className="w-20 h-16 lg:order-2" />
    </div>
  );
};

export default PromoDetail;
