import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Header from "../components/Header/Header";
import NavHeader from "../components/Header/navHeader/NavHeader";
import Accordion from "../components/Events/Accordion";

const EventDetail = () => {
  const {eventID} = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axiosInstance.get(
          `events/event_details/${eventID}`
        );
        setEventDetails(response.data);
        console.log(response.data)
      } catch (error) {
        console.log("error fetching Event Details", error);
      }
    };

    fetchEventDetails();
  }, [eventID]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  const {
    id,
    event_name,
    categories,
    start_date,
    event_img_1,
    venue,
    location,
    organizer_name,
    about,
    instruction,
    terms_and_conditions,
    ticket_types,
    time,
  } = eventDetails;

  // Format the date and time
  const eventDate = new Date(start_date);
  const formattedDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const eventTime = new Date(`1970-01-01T${time}Z`);
  const formattedTime = eventTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div>
      <Header />
      <div className="container mx-auto md:px-16 lg:px-20 pt-6 p-4">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="w-full md:w-2/3 mb-4 md:mb-0 h-80 shadow-md rounded">
            {event_img_1 ? (
              <img
                src={event_img_1}
                alt={event_name}
                className="object-cover rounded shadow-md  w-full h-full"
              />
            ) : (
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center rounded shadow-lg">
                <span className="text-gray-500">No image available</span>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/3 ">
            <div className="bg-white p-4 rounded-lg shadow-md h-80 pt-6">
              <h1 className="text-2xl font-bold mb-2">{event_name}</h1>
              <p className="text-lg text-gray-700">{categories.join(" | ")}</p>
              <p className="mt-2">
                {formattedDate} | {formattedTime}
              </p>
              <p className="mt-2">
                {venue} | {location}
              </p>
              <p className="mt-2 text-gray-700">{organizer_name}</p>
              <button
                className="w-full bg-violet-700 text-white px-4 py-2 mt-4 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105"
                onClick={() => navigate(`/ticket-types/${id}`)}
              >
                Tickets
              </button>
              <p className="mt-2 text-gray-500">
                ₹ {Math.min(...ticket_types.map((t) => t.price))} Onwards
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="shadow md rounded-lg mb-4">
            <Accordion title="ABOUT" description={about} />
          </div>
          <div className="shadow md rounded-lg mb-4">
            <Accordion title="INSTRUCTION" description={instruction} />
          </div>
          <div className="shadow md rounded-lg ">
            <Accordion
              title="TERMS AND CONDITION"
              description={terms_and_conditions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
