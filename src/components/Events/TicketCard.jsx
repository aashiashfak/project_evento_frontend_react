import {useState} from "react";
import {cancelUserTicket} from "../../api/events/tIckets";
import {Button} from "../FormComponents/FormComponents";
import "../../css/ticket.css"

const TicketCard = ({ticket, setTickets, setFilteredTickets}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const statusColors = {
    active: "bg-green-500",
    canceled: "bg-red-500",
    used: "bg-gray-500",
  };

  const ticketBgStatusColors = {
    active: "bg-gradient-to-br from-white to-green-300",
    canceled: "bg-gradient-to-br from-white to-red-300",
    used: "bg-gradient-to-br from-white to-gray-300",
  };

  const ticketBgColor =
    ticketBgStatusColors[ticket.ticket_status] ||
    "bg-gradient-to-br from-white to-gray-300";

  const statusColor = statusColors[ticket.ticket_status] || "bg-gray-500";

  const handleCancel = async (ticketID) => {
    try {
      const response = await cancelUserTicket(ticketID);
      console.log(response);
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket.id === ticketID
            ? {...ticket, ticket_status: "canceled"}
            : ticket
        )
      );
      setFilteredTickets((prevFilteredTickets) =>
        prevFilteredTickets.filter((ticket) => ticket.id !== ticketID)
      );
    } catch (error) {
      const errorMsg = error.response?.data?.error || "Failed to cancel ticket";
      setErrorMessage(errorMsg);
      console.log("error: cannot cancel ticket", errorMsg);
    }
  };

  // Calculate the time difference between now and the booking date
  const bookingDate = new Date(ticket.booking_date);
  const currentTime = new Date();
  const timeDifference = (currentTime - bookingDate) / 1000 / 60; // Difference in minutes

  return (
    <div className="ticket relative shadow-md mb-6 w-full max-w-lg mx-auto">
      <div className="ticket-content-wrapper p-6 pt-8 pb-8 rounded-lg">
        <section className="text-gray-700">
          <h3 className="text-black font-bold mb-4">{ticket.event_name}</h3>
          <p>
            Ticket Type:{" "}
            <span className="font-medium">{ticket.ticket_type}</span>
          </p>
          <p>
            Price: ₹ <span className="font-medium">{ticket.ticket_price}</span>
          </p>
          <p>
            Count: <span className="font-medium">{ticket.ticket_count}</span>
          </p>
          <p className="flex items-center">
            Status:
            <span
              className={`w-3 h-3 rounded-full inline-block ml-2 ${statusColor}`}
            ></span>
            <span className="ml-2 font-medium">{ticket.ticket_status}</span>
          </p>
          <p>
            Booking Date:{" "}
            <span className="font-medium">
              {bookingDate.toLocaleDateString()}{" "}
              {bookingDate.toLocaleTimeString()}
            </span>
          </p>
          <p>
            Organizer:{" "}
            <span className="font-medium">{ticket.organizer_name}</span>
          </p>

          {/* Show the Cancel button only if the ticket is active and was booked less than 2 minutes ago */}
          {ticket.ticket_status === "active" && timeDifference <= 2 && (
            <div className="flex justify-end">
              <Button
                onClick={() => handleCancel(ticket.id)}
                backgroundColor="bg-red-500"
                hover="hover:bg-red-800"
              >
                Cancel
              </Button>
            </div>
          )}
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </section>
      </div>

      <div className="flex flex-col justify-center items-center p-4 border-gray-300">
        {ticket.qr_code && (
          <img
            src={ticket.qr_code}
            alt="QR Code"
            className="w-24 h-24 object-contain"
          />
        )}
      </div>

      {/* Perforated line */}
      <div className="absolute top-1/2 left-0 w-full border-t border-dashed border-gray-300 transform -translate-y-1/2"></div>
    </div>
  );
};

export default TicketCard;
