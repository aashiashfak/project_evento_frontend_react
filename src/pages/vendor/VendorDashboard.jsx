import React, {useEffect, useState} from "react";
import {dashboardItems, getBookedUsers} from "../../api/vendorApi/vendorDashbord";
import ScrollableDashboard from "../../components/ScrollDashbordCards/ScrollableDashboardCards";
import {FaUsers, FaThList} from "react-icons/fa";
import {MdOutlineEventNote} from "react-icons/md";
import {BsTicketPerforatedFill} from "react-icons/bs";
import {PiHandCoinsFill} from "react-icons/pi";
import BookingsChart from "../../components/admin/Dashborad/BookingsChart";
import TopVendorsTable from "../../components/admin/Dashborad/TopVendorsTable";
import TopUsersTable from "../../components/vendor/DashBoard/TopUsersTable";

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
      console.log('VendorDashboard data:',responseData)
    } catch (error) {
      console.log(error);
      setError(error);
    }
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
    <div className="px-6 pt-2 py-4 flex-grow flex flex-col overflow-hidden">
      <div className="flex-grow px-4 py-6 relative">
        <ScrollableDashboard cards={cards} />
      </div>
      <section className="flex-col md:flex mt-16">
        <div className="flex flex-col md:flex-row md:gap-2">
          <div className="md:w-1/2">
            <BookingsChart />
          </div>
          <div className="md:w-1/2 ">
            <h1 className="mt-12 font-semibold text-gray-800 border-b-2 border-gray-800 w-max mb-3">
              TOP USERS
            </h1>
            <TopUsersTable topUsers={dashboardData.top_users} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorDashboard;
