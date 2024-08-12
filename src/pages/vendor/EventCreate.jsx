import React, {useState, useEffect} from "react";
import EventForm from "../../components/vendor/EventForm/EventForm";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";
import axiosInstance from "../../utilities/axios/axiosInstance";

const CreateEventPage = () => {
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    console.log("entered in event create page ");
    const fetchLocations = async () => {
      try {
        const response = await axiosInstance.get("events/locations/");
        setLocations(response.data);
        console.log("locations", response.data);
      } catch (error) {
        toast.error("Failed to fetch locations.");
      }
    };
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("events/categories/");
        setCategories(response.data);
        console.log("categories", response.data);
      } catch (error) {
        toast.error("Failed to fetch categories.");
      }
    };
    const fetchVenues = async () => {
      try {
        const response = await axiosInstance.get("events/venues/");
        setVenues(response.data);
        console.log("Venues", response.data);
      } catch (error) {
        toast.error("Failed to fetch venues.");
      }
    };

    fetchLocations();
    fetchCategories();
    fetchVenues();
  }, []);

  const initialValues = {
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
  };

  const handleFormSubmit = async (values, actions) => {
    try {
      const response = await axiosInstance.post(
        "/vendors/vendor/get-create-event",
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Event created successfully!");
      navigate("/vendor/events");
    } catch (error) {
      if (error.response && error.response.data) {
        const serverErrors = error.response.data;

        const formattedErrors = {};
        Object.keys(serverErrors).forEach((key) => {
          formattedErrors[key] = serverErrors[key].join(", ");
        });

        actions.setErrors(formattedErrors);
      }
      toast.error("Failed to create event. Please try again.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Event</h2>
      <EventForm
        initialValues={initialValues}
        onSubmit={handleFormSubmit}
        mode="create"
        locations={locations}
        categories={categories}
        venues={venues}
      />
    </div>
  );
};

export default CreateEventPage;
