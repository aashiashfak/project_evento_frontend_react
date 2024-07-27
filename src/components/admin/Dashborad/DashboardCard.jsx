import React from "react";

const DashboardCard = ({icon: Icon, title, value, subValue}) => {
  return (
    <div className="bg-gray-200 shadow-lg rounded-lg p-4 flex flex-col w-52">
      <div className="flex justify-between">
        <div className="font-semibold text-gray-500 mt-1 mr-">{title}</div>
        <div className="bg-white p-2 rounded-lg">
          <Icon className="text-2xl text-gray-800  " />
        </div>
      </div>

      <div className="text-2xl font-bold">{value}</div>
      <div className="text-sm text-gray-500 mt-2">{subValue}</div>
    </div>
  );
};

export default DashboardCard;
