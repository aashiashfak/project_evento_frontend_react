import React from "react";

const TextHeading = ({Heading, icon: Icon}) => {
  return (
    <div className="flex items-center ml-6 md:ml-14 lg:ml-20">
      {Icon && <Icon className="text-violet-700 mr-2 text-2xl" />}
      <h1 className="font-semibold text-violet-700 text-2xl">{Heading}</h1>
    </div>
  );
};

export default TextHeading;
