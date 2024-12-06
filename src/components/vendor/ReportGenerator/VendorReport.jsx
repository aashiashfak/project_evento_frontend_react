import React, {useState, useEffect} from "react";
import axiosInstance from "../../../utilities/axios/axiosInstance";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Logo from "../../Header/Logo";

const VendorReport = () => {
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [reportData, setReportData] = useState(null);
  const [totalCanceledTickets, setTotalCanceledTickets] = useState(0);

  const handleDateChange = (e) => setDate(e.target.value);

  useEffect(() => {
    if (reportData) {
      const canceledTicketsCount = Object.keys(
        reportData.daily_bookings
      ).reduce((total, dateKey) => {
        return (
          total +
          reportData.daily_bookings[dateKey].reduce((count, info) => {
            return info.ticket_status === "canceled"
              ? count + info.ticket_count
              : count;
          }, 0)
        );
      }, 0);
      setTotalCanceledTickets(canceledTicketsCount);
    }
  }, [reportData]);

  const generateReport = async () => {
    if (!date) return setError("Please select a date");

    setError(null);
    setLoading(true);

    try {
      const {data} = await axiosInstance.get(`/vendors/vendor/report/${date}/`);
      setReportData(data);
      console.log("Vendor report:", data);
    } catch (error) {
      setError("Failed to generate report. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    if (!reportData) return;

    const doc = new jsPDF();

    // Add the logo text "Evento" at the top left
    doc.setFontSize(16);
    doc.setTextColor(148, 0, 211); // Violet color
    doc.text("Evento", 14, 15);

    doc.setTextColor(0, 0, 0); // Reset color to black
    doc.setFontSize(12);
    doc.text("Ticket Booking Report", 14, 30);
    doc.setFontSize(10);
    doc.text(
      `Date Range: ${reportData.start_date} to ${reportData.end_date}`,
      14,
      40
    );
    doc.text(`Total Tickets Sold: ${reportData.total_tickets}`, 14, 45);
    doc.text(`Total Amount Collected: ${reportData.total_amount}`, 14, 50);
    doc.text(`Total Canceled Tickets: ${totalCanceledTickets}`, 14, 55);

    const headers = [
      "Date",
      "Event Name",
      "Username",
      "Email",
      "Phone Number",
      "Ticket Count",
      "Ticket Price",
      "Ticket Status",
      "Ticket Type",
    ];

    // Extract and log data rows
    const dataRows = Object.keys(reportData.daily_bookings).flatMap(
      (dateKey) => {
        console.log(`Processing date: ${dateKey}`);
        const dateRows = reportData.daily_bookings[dateKey].map((info) => {
          const row = [
            info.date || "N/A",
            info.event_name || "N/A",
            info.username || "N/A",
            info.email || "N/A",
            info.phone_number || "N/A",
            info.ticket_count || "N/A",
            info.ticket_price || "N/A",
            info.ticket_status || "N/A",
            info.ticket_type || "N/A",
          ];
          console.log("Row data:", row);
          return row;
        });
        return dateRows;
      }
    );

    console.log("Total rows generated:", dataRows.length);

    if (dataRows.length === 0) {
      // Add "No data available" message if there are no data rows
      doc.setFontSize(10);
      doc.setTextColor(255, 0, 0); // Red color for the message
      doc.text("No data available in this period", 14, 70);
    } else {
      doc.autoTable({
        head: [headers],
        body: dataRows,
        startY: 70, // Adjust this to start after the text logo and report details
        styles: {fontSize: 8},
        theme: "striped",
        columnStyles: {
          0: {cellWidth: "auto"},
          1: {cellWidth: "auto"},
          2: {cellWidth: "auto"},
          3: {cellWidth: "auto"},
          4: {cellWidth: "auto"},
          5: {cellWidth: "auto"},
          6: {cellWidth: "auto"},
          7: {cellWidth: "auto"},
          8: {cellWidth: "auto"},
        },
        didParseCell: function (data) {
          if (data.cell.raw === "canceled") {
            data.cell.styles.textColor = [255, 0, 0];
            data.cell.styles.fontStyle = "bold";
          }
        },
      });
    }

    doc.save(`Ticket_Booking_Report_${date}.pdf`);
  };

  return (
    <div className="p-4 mt-6">
      <h2 className="font-semibold text-gray-800 border-b-2 border-gray-800 w-max mb-3">
        GENERATE TICKET BOOKING REPORT
      </h2>
      <div className="mb-4">
        <label
          htmlFor="reportDate"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Select Date:
        </label>
        <input
          type="date"
          id="reportDate"
          value={date}
          onChange={handleDateChange}
          className="border rounded p-2 max-w-max"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={generateReport}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Report"}
      </button>
      {reportData && (
        <button
          onClick={downloadPDF}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Download PDF
        </button>
      )}
    </div>
  );
};

export default VendorReport;
