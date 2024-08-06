import React, {useState, useEffect} from "react";
import {Line} from "react-chartjs-2";
import "chart.js/auto";
import axiosInstance from "../../../utilities/axios/axiosInstance";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css"; // You can choose different themes

const BookingsChart = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
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
      const response = await axiosInstance.get(
        `/superuser/events/bookings-per-day/${date}`
      );
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
    // Convert the selected date to UTC before sending it to the API
    const utcDate = new Date(
      Date.UTC(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate()
      )
    )
      .toISOString()
      .split("T")[0];
    fetchData(utcDate);
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date[0]);
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

  return (
    <div>
      <h2>Ticket Bookings for the Last 7 Days from:</h2>
      <Flatpickr
        value={selectedDate}
        onChange={handleDateChange}
        options={{
          dateFormat: "Y-m-d",
          maxDate: "today",
          enableTime: false,
        }}
      />
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default BookingsChart;
