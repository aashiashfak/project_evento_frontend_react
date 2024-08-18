import React from "react";
import {Table, ConfigProvider} from "antd";

const AntTable = ({data, columns, loading, pagination, onChange}) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#2d3748", // Tailwind's bg-gray-800 color
            headerColor: "#ffffff", // White color for header text and filter button
            headerSortActiveBg: "#4a5568", // Tailwind's bg-gray-700 color for sorted columns
            headerSortHoverBg: "#4a5568", // Hover color for sorted columns
            rowHoverBg: "#e2e8f0", // Tailwind's bg-gray-200 color for row hover
            headerFilterHoverBg: "#4a5568", // Tailwind's bg-gray-700 color for filter button hover
            headerSplitColor: "#ffffff", // White color for header split border
            fixedHeaderSortActiveBg: "#4a5568", // Background color for fixed header when sorted
            fixedHeaderSortActiveBg: "#4a5568", // Background color for fixed header when sorted
          },
        },
      }}
    >
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={pagination}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};

export default AntTable;
