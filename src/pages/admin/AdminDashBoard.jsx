import React, {useEffect, useState, useRef} from "react";
import Header from "../../components/admin/Header/Header";
import Sidebar from "../../components/admin/sidebar/SideBar";
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

const AdminDashBoard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollContainerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

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

  const handleToggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleScrollLeft = () => {
    scrollContainerRef.current.scrollBy({left: -250, behavior: "smooth"});
  };

  const handleScrollRight = () => {
    scrollContainerRef.current.scrollBy({left: 250, behavior: "smooth"});
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div className="flex">
      <Sidebar isVisible={isSidebarVisible} />
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        <Header onToggleSidebar={handleToggleSidebar} />
        <div className="flex-grow p-6 overflow-y-auto ml-0 md:ml-64 relative">
          <div className="flex items-center justify-center">
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
              className="grid grid-flow-col auto-cols-max gap-4 overflow-x-auto pt-2 pb-5 px-4 "
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
          {/* Additional dashboard content can go here */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
