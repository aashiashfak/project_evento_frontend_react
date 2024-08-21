import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axiosInstance from "../utilities/axios/axiosInstance";
import Header from "../components/Header/Header";
import {useSelector} from "react-redux";
import PageNotFound from "../components/Error/PageNotFound";
import {toast} from "react-toastify";

const ConfirmPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {eventId, ticketTypeId, quantity, price} = location.state || {};
  const [eventDetails, setEventDetails] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [foundTicketType, setFoundTicketType] = useState(null);
  const username = useSelector((state) => state.user.username || "guest");

  useEffect(() => {
    if (eventId && ticketTypeId) {
      const fetchEventDetails = async () => {
        try {
          const response = await axiosInstance.get(
            `events/event_details/${eventId}/`
          );
          const ticketType = response.data.ticket_types.find(
            (ticket) => ticket.id === ticketTypeId
          );
          setEventDetails(response.data);
          setFoundTicketType(ticketType);
        } catch (error) {
          console.error("Error fetching event details:", error);
        }
      };

      fetchEventDetails();
    }
  }, [eventId, ticketTypeId]);

  useEffect(() => {
    if (eventDetails) {
      const subtotal = quantity * price;
      const bookingFee = subtotal * 0.04; // 4% booking fee
      const tax = subtotal * 0.1; // 10% tax
      setTotalPrice((subtotal + bookingFee + tax).toFixed(2));
    }
  }, [eventDetails, quantity, price]);

  const handlePayment = async () => {
    try {
      const paymentData = {
        ticket_id: ticketTypeId,
        ticket_count: quantity,
      };

      const response = await axiosInstance.post(
        `events/ticket/booking/${ticketTypeId}/`,
        paymentData
      );

      if (response.status === 200) {
        const {order_id, currency, amount, key} = response.data;
        const options = {
          key, // Razorpay Key ID
          amount, // Amount in paisa
          currency,
          name: "Evento",
          description: `Payment for ${eventDetails.event_name} - ${foundTicketType.type_name}`,
          order_id, // Pass the order ID
          handler: async function (response) {
            // Payment success, create the ticket
            try {
              const ticketResponse = await axiosInstance.post(
                "/events/confirm-payment/",
                {
                  order_id: response.razorpay_order_id,
                  payment_id: response.razorpay_payment_id,
                  ticket_id: ticketTypeId,
                  ticket_count: quantity,
                }
              );
              if (ticketResponse.status === 201) {
                toast.success("Ticket booked successfully!");
                navigate("/user-tickets", {state: ticketResponse.data});
              } else {
                toast.error(
                  "Failed to book the ticket. Please contact support."
                );
              }
            } catch (error) {
              console.error("Error creating ticket:", error);
              toast.error("An error occurred during ticket creation.");
            }
          },
          prefill: {
            name: username,
            email: "user@example.com",
            contact: "9999999999", 
          },
          notes: {
            address: "Event location address",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        toast.error("Payment initiation failed. Please try again.");
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
      toast.error("An error occurred during payment initiation.");
    }
  };

  if (!eventId || !ticketTypeId) {
    return <PageNotFound />;
  }

  if (!eventDetails || !foundTicketType) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="container mx-auto px-8 sm:px-10 md:px-16 lg:px-20 mt-8">
        <h2 className="text-2xl text-violet-700 font-bold mb-4 text-center">
          CONFIRM PAYMENT
        </h2>
        <div className="border rounded-lg p-6 bg-white shadow-lg">
          <div className="mb-4">
            <strong>USER:</strong> {username}
          </div>
          <div className="mb-4">
            <strong>ORDER SUMMARY:</strong>
          </div>
          <div className="p-4">
            <div className="flex justify-between mb-2">
              <div>
                <div className="font-bold">
                  {eventDetails.event_name} - {foundTicketType.type_name}
                </div>
                <div>
                  {new Date(eventDetails.start_date).toLocaleDateString()}
                </div>
              </div>
              <div className="text-right">
                <div>QTY: {quantity}</div>
                <div>₹ {(price * quantity).toFixed(2)}</div>
              </div>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <div>Booking Fee</div>
                <div>₹ {(price * quantity * 0.04).toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>Base Fee</div>
                <div>₹ {(price * quantity * 0.1).toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>CGST</div>
                <div>₹ {(price * quantity * 0.05).toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>SGST</div>
                <div>₹ {(price * quantity * 0.05).toFixed(2)}</div>
              </div>
              <div className="flex justify-between font-bold border-t pt-2 mt-2">
                <div>Total</div>
                <div>₹ {totalPrice}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handlePayment}
              className="w-full sm:w-1/3 bg-violet-700 text-white px-4 py-2 mt-4 transition duration-200 rounded-lg ease-in-out transform hover:bg-violet-900 hover:scale-105"
            >
              Confirm and Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPayment;
