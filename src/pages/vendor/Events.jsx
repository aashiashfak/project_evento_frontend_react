import React, {useEffect, useState} from "react";
import {getVendorEvents} from "../../api/vendorApi/vendorEvents";
import {FaEdit, FaPlus, FaTrash} from "react-icons/fa";
import {useNavigate} from "react-router-dom";

const Events = () => {
  const [vendorData, setVendorData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchVendorEvents();
  }, []);

  const fetchVendorEvents = async () => {
    try {
      const responseData = await getVendorEvents();
      setVendorData(responseData);
    } catch (error) {
      console.error("Error fetching vendor events", error);
    }
  };

  const handleAddClick = () => {
    navigate("/vendor/add-event");
  };

  

  const calculateTotalTickets = (ticketTypes) => {
    return ticketTypes.reduce((total, ticket) => total + ticket.count, 0);
  };

  const calculateTotalSoldTickets = (ticketTypes) => {
    return ticketTypes.reduce((total, ticket) => total + ticket.sold_count, 0);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "active":
        return <h1 className="text-green-500 rounded-full">Active</h1>;
      case "disabled":
        return <h1 className="text-gray-500 rounded-full">Disabled</h1>;
      case "completed":
        return <h1 className="text-red-500 rounded-full">Complete</h1>;
      default:
        return status;
    }
  };
  const baseUrl = "http://localhost:8000/";

  return (
    <div className="px-4 pt-4">
      <div className="flex justify-between items-center bg-gray-800 rounded-t-xl p-4">
        <h1 className="text-xl font-semibold text-white">Events List</h1>
        <button
          className="bg-gray-400 bg-opacity-50 text-white rounded-full px-4 py-1 flex items-center"
          onClick={handleAddClick}
        >
          <FaPlus className="mr-2" />
          Add
        </button>
      </div>

      <div className="overflow-x-auto shadow-xl overflow-y-auto max-h-[calc(100vh-170px)]">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-600 text-white text-left sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Event Name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">StartDate</th>
              <th className="px-4 py-2">Venue</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Total Count</th>
              <th className="px-4 py-2">Sold Count</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {vendorData.map((event, idx) => (
              <tr
                key={event.id}
                className={`hover:bg-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{event.event_name}</td>
                <td className="px-4 py-2">
                  <img
                    className="w-20 h-20 rounded-md"
                    src={`${baseUrl}${event.event_img_1}`}
                    alt={event.event_name}
                  />
                </td>
                <td className="px-4 py-2">
                  {new Date(event.start_date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2">{event.venue}</td>
                <td className="px-4 py-2">{event.location}</td>
                <td className="px-4 py-2">{renderStatus(event.status)}</td>
                <td className="px-4 py-2">
                  {calculateTotalTickets(event.ticket_types)}
                </td>
                <td className="px-4 py-2">
                  {calculateTotalSoldTickets(event.ticket_types)}
                </td>
                <td className="px-2 py-2">
                  <div className="flex "></div>
                  <button
                    className="p-2 bg-gray-300 rounded-md mr-3"
                    onClick={() => navigate(`/vendor/edit-event/${event.id}`)}
                  >
                    <FaEdit />
                  </button>
                  <button className="p-2 bg-gray-300 rounded-md mr-3">
                    <FaTrash />
                  </button>
                  <button
                    className="bg-blue-500 text-white rounded-lg px-4 py-1"
                    onClick={() => navigate(`/event-details/${event.id}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Events;
