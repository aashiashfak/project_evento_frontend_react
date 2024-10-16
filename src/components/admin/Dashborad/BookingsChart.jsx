import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import "chart.js/auto";
import axiosInstance from "../../../utilities/axios/axiosInstance";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import {useSelector} from "react-redux";
import noDataGraph from "../../../assets/StaticImages/noDataGraph.png";

const BookingsChart = () => {
  // Get the user's role from Redux
  const userRole = useSelector((state) => state.user.role);

  // Format the initial date as a string
  const initialDate = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Ticket Bookings",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  });

  const fetchData = async (date) => {
    try {
      // Determine the API endpoint based on the user's role
      const endpoint =
        userRole === "admin"
          ? `/superuser/events/bookings-per-day/${date}`
          : `vendors/vendor/ticket-booking-data/${date}`;

      const response = await axiosInstance.get(endpoint);
      console.log('booking chart data :', response.data)
      const data = response.data;

      const labels = data.map((item) => {
        const dateObj = new Date(item.date);
        return `${dateObj.getDate()} ${dateObj.toLocaleString("default", {
          month: "short",
        })}`;
      });
      const counts = data.map((item) => item.total_bookings);

      setChartData({
        labels,
        datasets: [
          {
            label: "Ticket Bookings",
            data: counts,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    // Convert selected date to a string format that Flatpickr can read
    const formattedDate = new Date(
      Date.UTC(date[0].getFullYear(), date[0].getMonth(), date[0].getDate())
    )
      .toISOString()
      .split("T")[0];
    setSelectedDate(formattedDate);
  };

  const chartOptions = {
    scales: {
      y: {
        ticks: {
          stepSize: 1, // Set step size to 1
          callback: (value) => value, // Ensure labels are whole numbers
        },
      },
    },
  };

  // Check if all values in the dataset are 0
  const allZero = chartData.datasets[0].data.every((val) => val === 0);

  return (
    <div>
      <h2>Ticket Bookings for the Last 7 Days from:</h2>
      <Flatpickr
        value={selectedDate}
        onChange={handleDateChange}
        className="border max-w-max mt-2"
        options={{
          dateFormat: "Y-m-d",
          maxDate: "today",
          enableTime: false,
        }}
      />
      {allZero ? (
        <div className="flex flex-col items-center justify-center">
          <img
            src={noDataGraph}
            alt="No data available"
            className="w-32 h-32"
          />

          <p>No data available for the selected date range.</p>
        </div>
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default BookingsChart;
