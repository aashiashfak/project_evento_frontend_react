import React from "react";
import {ClipLoader, GridLoader} from "react-spinners";
import TicketLoadGif from "../../assets/Gifs/TicketLoadGif.webm";

// Spinner component
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={60} color="#7C3AED" />
    </div>
  );
};

// LoaderComponent using GridLoader
const LoaderComponent = () => (
  <div className="flex justify-center items-center h-screen">
    <GridLoader color="#7C3AED" size={23} />
  </div>
);

// TicketLoader with GIF
const TicketLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <video autoPlay loop muted className="h-32">
      <source src={TicketLoadGif} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export {Spinner, LoaderComponent, TicketLoader};
