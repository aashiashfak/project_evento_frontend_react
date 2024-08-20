import UserFooter from  "./UserFooter"
import React from 'react'
import {Outlet} from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Outlet />
      </main>
      <UserFooter />
    </div>
  );
};

export default UserLayout
