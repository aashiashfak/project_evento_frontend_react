import React from "react";

const DashboardCard = ({icon: Icon, title, value, subValue}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col w-52">
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">{title}</div>
        <Icon className="text-2xl text-purple-600 mb-2" />
      </div>

      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500">{subValue}</div>
    </div>
  );
};

export default DashboardCard;
