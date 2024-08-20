const TicketCard = ({ticket}) => {
  // Define the status color mapping
  const statusColors = {
    active: " bg-green-500",
    canceled: "bg-red-500",
    used: "bg-gray-500",
  };
  

  const statusColor = statusColors[ticket.ticket_status] || "bg-gray-500"; 

  return (
    <div className="relative bg-white flex flex-col sm:flex-row shadow-lg mb-6 w-full max-w-lg mx-auto rounded-lg border border-gray-300 border-dashed">
      <div className="flex-grow p-6 pt-8 pb-8 bg-gradient-to-br from-white to-gray-100 rounded-l-lg    ticket-body">
        <section className="text-gray-700">
          <h3 className=" text-black font-bold mb-4">
            {ticket.event_name}
          </h3>
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
              {new Date(ticket.booking_date).toLocaleDateString()}
            </span>
          </p>
          <p>
            Organizer:{" "}
            <span className="font-medium">{ticket.organizer_name}</span>
          </p>
        </section>
      </div>

      <div className="flex flex-col justify-center items-center p-4  border-gray-300">
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
