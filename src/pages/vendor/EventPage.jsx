import React, {useState, useEffect} from "react";
import EventForm from "../../components/vendor/EventForm/EventForm";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import axiosInstance from "../../utilities/axios/axiosInstance";

const EventPage = () => {
  const navigate = useNavigate();
  const {eventId} = useParams();

  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [initialValues, setInitialValues] = useState({
    event_name: "",
    categories: [],
    start_date: "",
    end_date: "",
    time: "",
    location: "",
    venue: "",
    event_img_1: "",
    about: "",
    instruction: "",
    terms_and_conditions: "",
    location_url: "",
    ticket_types: [
      {
        type_name: "",
        ticket_image: "",
        price: "",
        count: "",
        sold_count: "",
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const baseUrl ="http://localhost:8000/"
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (eventId) {
            const response = await axiosInstance.get(
              `vendors/vendor/event/${eventId}/`
            );

            const eventData = response.data;

            // Convert datetime to date for the date fields
            const startDate = eventData.start_date
              ? eventData.start_date.split("T")[0]
              : "";
            const endDate = eventData.end_date
              ? eventData.end_date.split("T")[0]
              : "";

            setInitialValues((prevValues) => ({
              ...prevValues,
              ...eventData,
              start_date: startDate,
              end_date: endDate,
              event_img_1: eventData.event_img_1, // Set the image file path as value
              ticket_types: eventData.ticket_types.map((ticket) => ({
                ...ticket,
                ticket_image: ticket.ticket_image, // Set the image file path as value
              })),
            }));
          }

          const [locationResponse, categoryResponse, venueResponse] =
            await Promise.all([
              axiosInstance.get("events/locations/"),
              axiosInstance.get("events/categories/"),
              axiosInstance.get("events/venues/"),
            ]);

          setLocations(locationResponse.data);
          setCategories(categoryResponse.data);
          setVenues(venueResponse.data);
        } catch (error) {
          console.error("Failed to fetch data:", error);
          toast.error("Failed to fetch data.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [eventId]);

  const handleFormSubmit = async (values, actions) => {
    try {
      let response;
      if (eventId) {
        response = await axiosInstance.put(`/events/${eventId}/`, values, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Event updated successfully!");
      } else {
        response = await axiosInstance.post(
          "/vendors/vendor/get-create-event",
          values,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        toast.success("Event created successfully!");
      }
      navigate("/vendor/events");
    } catch (error) {
      console.error("Form submission error:", error);
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;

        const formattedErrors = {};
        Object.keys(serverErrors).forEach((key) => {
          formattedErrors[key] = serverErrors[key].join(", ");
        });

        actions.setErrors(formattedErrors);
      }
      toast.error(
        `Failed to ${eventId ? "update" : "create"} event. Please try again.`
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        {eventId ? "Edit Event" : "Create Event"}
      </h2>
      <EventForm
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        mode={eventId ? "edit" : "create"}
        locations={locations}
        categories={categories}
        venues={venues}
      />
    </div>
  );
};

export default EventPage;