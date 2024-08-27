import React, {useEffect, useState} from "react";
import {dashboardItems} from "../../api/vendorApi/vendorDashbord";
import ScrollableDashboard from "../../components/ScrollDashbordCards/ScrollableDashboardCards";
import {FaUsers} from "react-icons/fa";
import {MdOutlineEventNote} from "react-icons/md";
import {BsTicketPerforatedFill} from "react-icons/bs";
import {PiHandCoinsFill} from "react-icons/pi";
import BookingsChart from "../../components/admin/Dashborad/BookingsChart";
import TopUsersTable from "../../components/vendor/DashBoard/TopUsersTable";
import PieChart from "../../components/admin/Dashborad/PieChart";
import noDataGif from "../../assets/Gifs/noDataGif.mp4"; 
import VendorReport from "../../components/vendor/ReportGenerator/VendorReport";

const VendorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchvendorDashboardData();
  }, []);

  const fetchvendorDashboardData = async () => {
    try {
      const responseData = await dashboardItems();
      setDashboardData(responseData);

      console.log("VendorDashboard data:", responseData);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const eventStats = {
    active: dashboardData ? dashboardData.active_events_count : 0,
    completed: dashboardData ? dashboardData.completed_events_count : 0,
    disabled: dashboardData ? dashboardData.disabled_events_count : 0,
  };

  if (!dashboardData) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const cards = [
    {
      icon: MdOutlineEventNote,
      title: "Total Events",
      value: dashboardData.total_events_count,
      subValue: `${dashboardData.completed_events_count} Completed`,
    },
    {
      icon: BsTicketPerforatedFill,
      title: "Total Tickets",
      value: dashboardData.total_tickets_count,
      subValue: `${dashboardData.booked_tickets_count} Booked`,
    },
    {
      icon: PiHandCoinsFill,
      title: "Total Earnings",
      value: `₹${dashboardData.total_earnings}`,
    },
    {
      icon: FaUsers,
      title: "Total Followers",
      value: dashboardData.total_followers,
    },
  ];

  return (
    <div className="px-6 pt-4 pb-10 flex-grow flex flex-col">
      <div className="flex-grow px-4 ">
        <ScrollableDashboard cards={cards} />
      </div>
      <section className="flex-col md:flex mt-16">
        <div className="flex flex-col md:flex-row md:gap-2">
          <div className="md:w-1/2">
            <BookingsChart />
          </div>
          <div className="md:w-1/2 ">
            <h1 className=" font-semibold text-gray-800 border-b-2 border-gray-800 w-max mb-3">
              TOP USERS
            </h1>
            {dashboardData.top_users && dashboardData.top_users.length > 0 ? (
              <TopUsersTable topUsers={dashboardData.top_users} />
            ) : (
              <div className="flex flex-col items-center">
                <video autoPlay muted className="w-80 h-32">
                  <source src={noDataGif} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <p className="text-gray-500 mt-4">No top users available.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="mt-16">
        <h1 className="font-semibold text-gray-800 border-b-2 border-gray-800 w-max mb-3">
          EVENT STATUS DISTRIBUTION
        </h1>
        <PieChart data={eventStats} />
      </section>
      <div>
        <VendorReport/>
      </div>
    </div>
  );
};

export default VendorDashboard;
