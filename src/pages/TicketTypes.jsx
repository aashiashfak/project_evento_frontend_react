import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {FaPlus, FaMinus} from "react-icons/fa";

const TicketTypes = () => {
  const {id: eventId} = useParams(); 
  const [ticketTypes, setTicketTypes] = useState(null);
  const [ticketCounts, setTicketCounts] = useState({});

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `events/event/${eventId}/tickets/`
        );
        setTicketTypes(response.data);
      } catch (error) {
        console.log("error fetching ticketTypes", error);
      }
    };
    fetchTicketDetails();
  }, [eventId]);

  const incrementCount = (ticketId) => {
    setTicketCounts((prevCounts) => {
      const newCount = (prevCounts[ticketId] || 0) + 1;
      if (newCount > 5) {
        toast.error("You can only add up to 5 tickets.");
        return prevCounts;
      }
      return {...prevCounts, [ticketId]: newCount};
    });
  };

  const decrementCount = (ticketId) => {
    setTicketCounts((prevCounts) => {
      const newCount = (prevCounts[ticketId] || 0) - 1;
      if (newCount < 0) return prevCounts;
      return {...prevCounts, [ticketId]: newCount};
    });
  };

  if (!ticketTypes) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="mx-auto p-6 lg:px-20">
        {ticketTypes.map((ticketType) => (
          <div
            key={ticketType.id}
            className="flex flex-col md:flex-row items-center md:space-x-4 mb-4 bg-white rounded-lg shadow-md p-4"
          >
            <div className="w-full md:w-3/4">
              <img
                className="w-full h-48 object-cover rounded-md"
                src={ticketType.ticket_image || "placeholder-image-url"}
                alt={ticketType.type_name}
              />
            </div>
            <div className="w-full md:w-1/4 flex flex-col items-start p-4">
              <h1 className="text-2xl font-bold mb-2">
                {ticketType.type_name} - ₹ {ticketType.price}
              </h1>
              <div className="flex items-center space-x-4 mb-2">
                <p>Quantity</p>
                <div className="flex items-center space-x-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                    onClick={() => incrementCount(ticketType.id)}
                  >
                    <FaPlus />
                  </button>
                  <p className="p-2 ">{ticketCounts[ticketType.id] || 0}</p>
                  <button
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300"
                    onClick={() => decrementCount(ticketType.id)}
                  >
                    <FaMinus />
                  </button>
                </div>
              </div>
              <p className="mb-2">
                Total - ₹{" "}
                {(
                  ticketType.price * (ticketCounts[ticketType.id] || 0)
                ).toFixed(2)}
              </p>
              <button className="w-full bg-violet-700 text-white px-4 py-2 mt-2 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105">
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default TicketTypes;
