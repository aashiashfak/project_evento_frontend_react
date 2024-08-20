import React, {useEffect, useState} from "react";
import AntTable from "../../components/Table/AntTable";
import {getBookedTickets} from "../../api/vendorApi/vendorDashbord";

const BookedTicketsTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce the search term by 1 second
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    // Cleanup the timeout if the searchTerm changes
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Fetch data whenever the debounced search term changes
  useEffect(() => {
    const fetchBookedUsers = async () => {
      try {
        setLoading(true);
        const response = await getBookedTickets(debouncedSearchTerm);
        console.log("response...........", response);
        setData(response.results);
      } catch (error) {
        console.error("Error fetching booked users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookedUsers();
  }, [debouncedSearchTerm]);

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
          BOOKED TICKETS
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

export default BookedTicketsTable;
