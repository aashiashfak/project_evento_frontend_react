import React, {useEffect, useState} from "react";
import AntTable from "../../components/Table/AntTable";
import {getBookedUsers} from "../../api/vendorApi/vendorDashbord";

const BookedUsersTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookedUsers = async () => {
      try {
        setLoading(true);
        const response = await getBookedUsers(searchTerm);
        console.log("response...........", response);
        setData(response.results);
      } catch (error) {
        console.error("Error fetching booked users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedUsers();
  }, [searchTerm]); // Depend on searchTerm to refetch data

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      sorter: (a, b) => a.username.localeCompare(b.username),
      render: (text) => text || "N/A",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (text) => text || "N/A",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
      render: (text) => text || "N/A",
    },
    {
      title: "Ticket Type",
      dataIndex: "ticket_type_name",
      key: "ticket_type_name",
      sorter: (a, b) => a.ticket_type_name.localeCompare(b.ticket_type_name),
      render: (text) => text || "N/A",
    },
    {
      title: "Event Name",
      dataIndex: "event_name",
      key: "event_name",
      sorter: (a, b) => a.event_name.localeCompare(b.event_name),
      render: (text) => text || "N/A",
    },
    {
      title: "Price",
      dataIndex: "ticket_price",
      key: "ticket_price",
      sorter: (a, b) => a.ticket_price - b.ticket_price,
      render: (text) => text || "N/A",
    },
    {
      title: "Quantity",
      dataIndex: "ticket_count",
      key: "ticket_count",
      sorter: (a, b) => a.ticket_count - b.ticket_count,
      render: (text) => text || "N/A",
    },
    {
      title: "Status",
      dataIndex: "ticket_status",
      key: "ticket_status",
      sorter: (a, b) => a.ticket_status.localeCompare(b.ticket_status),
      render: (text) => text || "N/A",
    },
  ];

  return (
    <section className="px-5 py-2">
      <div className="flex items-center justify-between mb-3">
        <h1 className="mt-12 font-semibold text-gray-800 border-b-2 border-gray-800 w-max">
          BOOKED USERS
        </h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          className="border rounded px-4 py-2"
        />
      </div>
      <div className="overflow-x-auto">
        <AntTable
          data={data}
          columns={columns}
          loading={loading}
          emptyText="No booked users available"
        />
      </div>
    </section>
  );
};

export default BookedUsersTable;
