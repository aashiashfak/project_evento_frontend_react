import React, {useState, useEffect} from "react";
import axiosInstance from "../../utilities/axios/axiosInstance";
import TicketCard from "../../components/Events/TicketCard";
import Header from "../../components/Header/Header";
import NoDataGif from "../../assets/Gifs/noDataGif.mp4";
import {TicketLoader} from "../../components/spinner/Spinner";

const UserTicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("accounts/user-tickets/")
      .then((res) => {
        setTickets(res.data);
        console.log('user Tickets:...',res.data)
        handleFilterTickets(res.data, "upcoming");
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false)); 
  }, []);

  const handleFilterTickets = (tickets, status) => {
    let filtered = [];
    if (status === "upcoming") {
      filtered = tickets.filter((ticket) => ticket.ticket_status === "active");
    } else if (status === "expired") {
      filtered = tickets.filter((ticket) => ticket.ticket_status === "used");
    } else if (status === "canceled") {
      filtered = tickets.filter(
        (ticket) => ticket.ticket_status === "canceled"
      );
    }
    setFilteredTickets(filtered);
  };

  const handleTabClick = (status) => {
    setActiveTab(status);
    handleFilterTickets(tickets, status);
  };

  // Display the loader while data is being fetched
  if (isLoading) {
    return <TicketLoader />;
  }

  return (
    <div>
      <Header />
      <div className="flex mb-6 px-6 pt-6 sticky top-14 z-10 bg-white w-full">
        <button
          className={`py-2 px-4 text-black font-semibold border-b-4 ${
            activeTab === "upcoming" ? "border-black" : "border-transparent"
          }`}
          onClick={() => handleTabClick("upcoming")}
        >
          Upcoming
        </button>
        <button
          className={`py-2 px-4 font-semibold border-b-4 ${
            activeTab === "expired" ? "border-black" : "border-transparent"
          }`}
          onClick={() => handleTabClick("expired")}
        >
          Expired
        </button>
        <button
          className={`py-2 px-4 font-semibold border-b-4 ${
            activeTab === "canceled" ? "border-black" : "border-transparent"
          }`}
          onClick={() => handleTabClick("canceled")}
        >
          Canceled
        </button>
      </div>

      <div className="grid grid-cols-1  px-4">
        {filteredTickets.length > 0 ? (
          filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} setTickets={setTickets} setFilteredTickets={setFilteredTickets}/>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <video
              src={NoDataGif}
              autoPlay
              muted
              className="w-full max-w-md h-36"
            />
            <p className="mt-4 text-center font-bold">No tickets available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserTicketsPage;
