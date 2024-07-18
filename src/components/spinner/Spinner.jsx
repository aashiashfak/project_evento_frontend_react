import React from "react";
import { ClipLoader } from "react-spinners";


const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <ClipLoader size={60} color="#7C3AED" />
    </div>
  );
};

export default Spinner;
