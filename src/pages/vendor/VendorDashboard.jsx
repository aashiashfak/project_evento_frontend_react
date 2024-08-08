import React, {useEffect, useState} from "react";
import {dashboardItems} from "../../api/vendorApi/vendorDashbord";
import ScrollableDashboard from "../../components/ScrollDashbordCards/ScrollableDashboardCards";
import { FaUsers, FaThList} from "react-icons/fa";
import {MdOutlineEventNote} from "react-icons/md";
import {BsTicketPerforatedFill} from "react-icons/bs";
import {PiHandCoinsFill} from "react-icons/pi";

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
    <div className="flex-grow flex flex-col overflow-hidden">
      <div className="flex-grow px-4 py-6 relative">
        <ScrollableDashboard cards={cards} />
      </div>
    </div>
  );
};

export default VendorDashboard;
