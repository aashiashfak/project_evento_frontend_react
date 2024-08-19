import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {FaHome, FaUserTie, FaUsers, FaThList} from "react-icons/fa";
import {fetchDashboardresponse} from "../../api/adminApi/AdminDashboard";
import "../../css/Global.css";
import TopVendorsTable from "../../components/admin/Dashborad/TopVendorsTable";
import BookingsChart from "../../components/admin/Dashborad/BookingsChart";
import PieChart from "../../components/admin/Dashborad/PieChart";
import ScrollableDashboard from "../../components/ScrollDashbordCards/ScrollableDashboardCards";

const AdminDashBoard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusData, setStatusData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const responseData = await fetchDashboardresponse();
        setDashboardData(responseData);
        setLoading(false);
        console.log(responseData);

        if (responseData.new_events) {
          const statusCount = responseData.new_events.reduce((acc, event) => {
            const {status} = event;
            if (!acc[status]) {
              acc[status] = 0;
            }
            acc[status] += 1;
            return acc;
          }, {});

          setStatusData(statusCount);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError(error);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

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
        return <h1 className="text-green-500 rounded-full">Active</h1>;
      case "disabled":
        return <h1 className="text-gray-500 rounded-full">Disabled</h1>;
      case "completed":
        return <h1 className="text-red-500 rounded-full">Complete</h1>;
      default:
        return status;
    }
  };

  const cards = [
    {
      icon: FaHome,
      title: "Total Events",
      value: dashboardData.total_events,
      subValue: `${dashboardData.completed_events} Completed`,
    },
    {
      icon: FaUserTie,
      title: "Total Organizers",
      value: dashboardData.total_vendors,
    },
    {
      icon: FaUsers,
      title: "Total Users",
      value: dashboardData.total_users,
    },
    {
      icon: FaThList,
      title: "Categories",
      value: dashboardData.total_categories,
    },
  ];

  return (
    <div className="flex-grow flex flex-col overflow-hidden">
      <div className="flex-grow px-4 py-6 relative">
        <ScrollableDashboard cards={cards} />
        <section className="flex-col md:flex mt-16">
          <div className="flex flex-col md:flex-row md:gap-2">
            <div className="md:w-1/2 ">
              <BookingsChart />
            </div>
            <div className="md:w-1/2 ">
              <h1 className="mt-12 font-semibold text-gray-800 border-b-2 border-gray-800 w-max mb-3">
                TOP VENDORS
              </h1>
              <TopVendorsTable vendors={dashboardData.top_vendors} />
            </div>
          </div>
        </section>
        <section className="mt-16">
          <h1 className="font-semibold text-gray-800 border-b-2 border-gray-800 w-max mb-3">
            EVENT STATUS DISTRIBUTION
          </h1>
          <PieChart data={statusData} />
        </section>
        <h1 className="mt-12 font-semibold text-gray-800  border-b-2 border-gray-800 w-max mb-3">
          ALL EVENTS
        </h1>
        <div className=" overflow-x-auto shadow-xl overflow-y-auto h-[calc(100vh-170px)]">
          <table className="min-w-full bg-white border text-sm ">
            <thead className="bg-gray-800 text-white text-left  sticky top-0 z-10 ">
              <tr className="">
                <th className="px-4 py-2 ">#</th>
                <th className="px-4 py-2 ">Event Name</th>
                <th className="px-4 py-2 ">Organizer Name</th>
                <th className="px-4 py-2 ">Start Date</th>
                <th className="px-4 py-2 ">Location</th>
                <th className="px-4 py-2 ">Status</th>
                <th className="px-4 py-2 ">Total Count</th>
                <th className="px-4 py-2 ">Sold Count</th>
                <th className="px-4 py-2 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.new_events.map((event, idx) => (
                <tr
                  key={event.id}
                  className={` hover:bg-gray-200 ${
                    idx % 2 == 0 ? "bg-gray-100" : ""
                  }`}
                >
                  <td className="px-4 py-2 ">{idx + 1}</td>
                  <td className="px-4 py-2 ">{event.event_name}</td>
                  <td className="px-4 py-2 ">{event.organizer_name}</td>
                  <td className="px-4 py-2 ">
                    {new Date(event.start_date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 ">{event.location}</td>
                  <td className="px-4 py-2  ">{renderStatus(event.status)}</td>
                  <td className="px-4 py-2 ">
                    {calculateTotalTickets(event.ticket_types)}
                  </td>
                  <td className="px-4 py-2">
                    {calculateTotalSoldTickets(event.ticket_types)}
                  </td>
                  <td className="px-4 py-2 ">
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
    </div>
  );
};

export default AdminDashBoard;
