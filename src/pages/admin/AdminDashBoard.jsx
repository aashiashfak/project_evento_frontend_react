import React, {useEffect, useState, useRef} from "react";
import {useNavigate} from "react-router-dom";
import DashboardCard from "../../components/admin/Dashborad/DashboardCard";
import {
  FaHome,
  FaUserTie,
  FaUsers,
  FaThList,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import {fetchDashboardresponse} from "../../api/adminApi/AdminDashboard";
import "../../css/Global.css";

const AdminDashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const responseData = await fetchDashboardresponse();
        console.log("responseData....of admin Dashboard", responseData);
        setDashboardData(responseData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  useEffect(() => {
    const checkScrollable = () => {
      if (scrollContainerRef.current) {
        const {scrollWidth, clientWidth} = scrollContainerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
      }
    };

    checkScrollable();
    window.addEventListener("resize", checkScrollable);
    return () => window.removeEventListener("resize", checkScrollable);
  }, [dashboardData]);

  const handleScrollLeft = () => {
    scrollContainerRef.current.scrollBy({left: -250, behavior: "smooth"});
  };

  const handleScrollRight = () => {
    scrollContainerRef.current.scrollBy({left: 250, behavior: "smooth"});
  };

  const calculateTotalTickets = (ticketTypes) => {
    return ticketTypes.reduce((total, ticket) => total + ticket.count, 0);
  };

  const calculateTotalSoldTickets = (ticketTypes) => {
    return ticketTypes.reduce((total, ticket) => total + ticket.sold_count, 0);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const renderStatus = (status) => {
    switch (status) {
      case "active":
        return (
          <span className="bg-green-500 text-white rounded-full px-2 py-1">
            Active
          </span>
        );
      case "disabled":
        return (
          <span className="bg-gray-500 text-white rounded-full px-2 py-1">
            Disabled
          </span>
        );
      case "completed":
        return (
          <span className="bg-red-500 text-white rounded-full px-2 py-1">
            Complete
          </span>
        );
      default:
        return status;
    }
  };

  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <div className="flex-grow p-6 relative">
        <div className="flex items-center justify-center ">
          {isScrollable && (
            <button
              onClick={handleScrollLeft}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full shadow-md"
            >
              <FaChevronLeft />
            </button>
          )}
          <div
            ref={scrollContainerRef}
            className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pt-2 pb-5 px-4 hide-scrollbar"
          >
            {dashboardData && (
              <>
                <DashboardCard
                  icon={FaHome}
                  title="Total Events"
                  value={dashboardData.total_events}
                  subValue={`${dashboardData.completed_events} Completed`}
                />
                <DashboardCard
                  icon={FaUserTie}
                  title="Total Organizers"
                  value={dashboardData.total_vendors}
                />
                <DashboardCard
                  icon={FaUsers}
                  title="Total Users"
                  value={dashboardData.total_users}
                />
                <DashboardCard
                  icon={FaThList}
                  title="Categories"
                  value={dashboardData.total_categories}
                />
              </>
            )}
          </div>
          {isScrollable && (
            <button
              onClick={handleScrollRight}
              className="p-2 bg-gray-300 hover:bg-gray-400 rounded-full shadow-md"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
        <div className="mt-12 font-semibold text-gray-800  border-b-2 border-gray-800 w-max mb-3">
          ALL EVENTS
        </div>
        <div className="mt-4f overflow-x-auto shadow-xl">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-800 text-white text-left text-sm">
              <tr className="">
                <th className="px-4 py-2 border">Event Name</th>
                <th className="px-4 py-2 border">Organizer Name</th>
                <th className="px-4 py-2 border">Start Date</th>
                <th className="px-4 py-2 border">Location</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Total Count</th>
                <th className="px-4 py-2 border">Sold Count</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.new_events.map((event) => (
                <tr key={event.id} className="border-t">
                  <td className="px-4 py-2 border">{event.event_name}</td>
                  <td className="px-4 py-2 border">{event.organizer_name}</td>
                  <td className="px-4 py-2 border">
                    {new Date(event.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border">{event.location}</td>
                  <td className="px-4 py-2 border text-center">
                    {renderStatus(event.status)}
                  </td>
                  <td className="px-4 py-2 border">
                    {calculateTotalTickets(event.ticket_types)}
                  </td>
                  <td className="px-4 py-2 border">
                    {calculateTotalSoldTickets(event.ticket_types)}
                  </td>
                  <td className="px-4 py-2 border">
                    <button
                      className="bg-purple-500 text-white rounded-full px-4 py-1"
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
    </div>
  );
};

export default AdminDashBoard;
