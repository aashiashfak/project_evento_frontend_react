import React, { useState } from "react";
import Header from "../../components/admin/Header/Header";

const AdminDashBoard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);

  };
  return (
    <div>
      <Header onToggleSidebar={handleToggleSidebar}/>
      <h1>Entered in admin dashboard</h1>
    </div>
  );
};

export default AdminDashBoard;
