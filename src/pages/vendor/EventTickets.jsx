import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {FaEdit, FaPlus, FaTrash} from "react-icons/fa";
import GeneralModal from "../../components/General Modal/GeneralModal";
import {
  getTicketTypes,
  addTicketTypes,
  deleteTicketTypes,
  editTicketTypes,
} from "../../api/vendorApi/vendorTickets";
import DeleteModal from "../../components/admin/DeleteModal/DeleteModal";

const EventTickets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [modalData, setModalData] = useState({});
  const {eventId, eventName} = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteObj, setDeleteObj] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const baseUrl = "http://localhost:8000/";

  useEffect(() => {
    const fetchTicketTypes = async () => {
      setLoading(true); // Start loading state
      try {
        const responseData = await getTicketTypes(eventId);
        setTicketTypes(responseData); // Update ticket types state
        setError(null); // Clear any previous errors
      } catch (err) {
        setError("Failed to fetch ticket types. Please try again."); // Set error message
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchTicketTypes();
  }, [eventId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const fields = [
    {
      name: "type_name",
      label: "Ticket Name",
      type: "text",
      placeholder: "Enter ticket name",
      required: "Ticket Name  is required",
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "Enter price",
      required: "Ticket Name  is",
    },
    {
      name: "count",
      label: "Total Count",
      type: "number",
      placeholder: "Enter total count",
      required: "Total Count  is required",
    },
    {
      name: "sold_count",
      label: "Sold Count",
      type: "number",
      placeholder: "Enter sold count",
      required: "Sold count  is required",
    },
    {
      name: "ticket_image",
      label: "Ticket Image",
      type: "file",
      placeholder: "Enter image URL",
      required: "Ticket Image is required",
    },
  ];

  const handleAdd = () => {
    setModalData({}); // Set empty object for new ticket
    setIsModalOpen(true);
  };

  const handleEdit = (ticket) => {
    setModalData(ticket);
    setIsModalOpen(true);
    setIsEditing(true);
  };

  const handleDelete = (id, value) => {
    setDeleteObj({
      id,
      value,
      eventId: eventId,
    });
    setDeleteModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      const formDataToSend = new FormData();
      let changesMade = false;

      for (let key in formData) {
        if (formData[key] !== modalData[key]) {
          formDataToSend.append(key, formData[key]);
          changesMade = true;
        }
      }

      if (modalData.id && changesMade) {
        // Edit existing ticket
        await editTicketTypes(eventId, modalData.id, formDataToSend);
        setTicketTypes((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket.id === modalData.id ? {...ticket, ...formData} : ticket
          )
        );
      } else if (!modalData.id) {
        // Add new ticket
        formDataToSend.append("event", eventName);
        const newTicket = await addTicketTypes(eventId, formDataToSend);
        setTicketTypes((prevTickets) => [...prevTickets, newTicket]);
      } else {
        console.log("No changes made");
      }

      setIsModalOpen(false);
    } catch (error) {
      if (error.response && error.response.data) {
        // Capture backend validation errors and pass them to the modal
        const backendErrors = error.response.data;
        setModalData((prevData) => ({
          ...prevData,
          backendErrors: backendErrors,
        }));
      } else {
        console.error("Error submitting form:", error);
      }
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="px-4 pt-4">
      <div className="flex justify-between items-center bg-gray-800 rounded-t-xl p-4">
        <h1 className="text-xl font-semibold text-white">Ticket Types</h1>
        <button
          className="bg-gray-400 bg-opacity-50 text-white rounded-full px-4 py-1 flex items-center"
          onClick={handleAdd}
        >
          <FaPlus className="mr-2" />
          Add
        </button>
      </div>

      <div className="overflow-x-auto shadow-xl overflow-y-auto max-h-[calc(100vh-170px)]">
        <table className="min-w-full bg-white text-sm">
          <thead className="bg-gray-600 text-white text-left sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Ticket Name</th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Total Count</th>
              <th className="px-4 py-2">Sold Count</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {ticketTypes.map((ticket, idx) => (
              <tr
                key={ticket.id}
                className={`hover:bg-gray-200 ${
                  idx % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{ticket.type_name}</td>
                <td className="px-4 py-2">
                  <img
                    className="w-20 h-20 rounded-md"
                    src={
                      ticket.ticket_image.startsWith(baseUrl)
                        ? ticket.ticket_image
                        : `${baseUrl}${ticket.ticket_image}`
                    }
                    alt={ticket.type_name}
                  />
                </td>
                <td className="px-4 py-2">₹{ticket.price}</td>
                <td className="px-4 py-2">{ticket.count}</td>
                <td className="px-4 py-2">{ticket.sold_count}</td>
                <td className="px-2 py-2">
                  <div className="flex">
                    <button
                      className="p-2 bg-gray-300 rounded-md mr-3"
                      onClick={() => handleEdit(ticket)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 bg-gray-300 rounded-md"
                      onClick={() => handleDelete(ticket.id, ticket.type_name)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <GeneralModal
          fields={fields}
          initialData={modalData}
          onSubmit={handleModalSubmit}
          onClose={() => {
            setIsModalOpen(false);
            setIsEditing(false);
          }}
          title={modalData.id ? "Edit Ticket Type" : "Add Ticket Type"}
          isEditing={isEditing}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          identifier={"Ticket_Type"}
          onDeleteModalClose={setDeleteModalOpen}
          setList={setTicketTypes}
          deleteObj={deleteObj}
          deleteApi={deleteTicketTypes}
        />
      )}
    </div>
  );
};

export default EventTickets;
