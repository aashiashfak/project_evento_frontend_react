import React from "react";
import { ClipLoader, GridLoader } from "react-spinners";


const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={60} color="#7C3AED" />
    </div>
  );
};


const LoaderComponent = () => (
  <div className="flex justify-center items-center h-screen">
    <GridLoader color="#7C3AED" size={23} />
  </div>
);


export {Spinner, LoaderComponent};