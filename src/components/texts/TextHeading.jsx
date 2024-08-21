import React from "react";

const TextHeading = ({Heading, icon: Icon}) => {
  return (
    <div className="flex items-center">
      {Icon && <Icon className="text-violet-700 mr-2 text-lg" />}
      <h1 className="font-semibold text-violet-700 text-lg">{Heading}</h1>
    </div>
  );
};

export default TextHeading;
