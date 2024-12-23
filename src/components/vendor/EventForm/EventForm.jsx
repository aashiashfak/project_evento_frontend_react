import React, {useState} from "react";
import {Formik, Field, FieldArray, ErrorMessage} from "formik";
import * as Yup from "yup";
import DeleteModal from "../../admin/DeleteModal/DeleteModal";
import {
  Input,
  Label,
  Select,
  Textarea,
  Button,
} from "../../FormComponents/FormComponents";
import {AiOutlineClose} from "react-icons/ai";
import {FiTrash2, FiPlus} from "react-icons/fi";
import {useNavigate} from "react-router-dom";
import {deleteEvents} from "../../../api/vendorApi/vendorEvents";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import {ClipLoader} from "react-spinners";

const EventForm = ({
  initialValues,
  onSubmit,
  locations,
  categories,
  venues,
  mode,
}) => {
  const [isAddingVenue, setIsAddingVenue] = useState(false);
  const [formError, setFormError] = useState("");
  const baseUrl = "https://api.evento.ink";
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteObj, setDeleteObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const date = new Date();

  const [imagePreviews, setImagePreviews] = useState({
    event_img_1: initialValues.event_img_1
      ? initialValues.event_img_1.startsWith(baseUrl)
        ? initialValues.event_img_1
        : `${baseUrl}${initialValues.event_img_1}`
      : "",
    ticket_types: initialValues.ticket_types.map((ticket) =>
      ticket.ticket_image
        ? ticket.ticket_image.startsWith(baseUrl)
          ? ticket.ticket_image
          : `${baseUrl}${ticket.ticket_image}`
        : ""
    ),
  });


  const validationSchema = Yup.object({
    event_name: Yup.string()
      .required("Event name is required")
      .max(25, "Event name cannot be more than 25 characters"),
    categories: Yup.array()
      .of(Yup.string())
      .min(1, "At least one category is required"),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date()
      .required("End date is required")
      .min(Yup.ref("start_date"), "End date cannot be before start date"),
    time: Yup.string().required("Time is required"),
    location: Yup.string().required("Location is required"),
    venue: isAddingVenue
      ? Yup.string().notRequired()
      : Yup.string().required("Venue is required"),
    new_venue_name: isAddingVenue
      ? Yup.string().required("New venue name is required")
      : Yup.string().notRequired(),
    event_img_1: Yup.mixed().required("Event image is required"),
    about: Yup.string().required("Event description is required"),
    instruction: Yup.string().required("Instruction is required"),
    terms_and_conditions: Yup.string(),
    location_url: Yup.string().url("Invalid URL"),
    ...(mode === "create" && {
      ticket_types: Yup.array().of(
        Yup.object({
          type_name: Yup.string().required("Ticket type name is required"),
          ticket_image: Yup.mixed().required("Ticket image is required"),
          price: Yup.number()
            .required("Price is required")
            .positive("Price must be positive"),
          count: Yup.number()
            .required("Count is required")
            .integer("Count must be an integer"),
          sold_count: Yup.number()
            .integer("Sold count must be an integer")
            .default(0)
            .min(0, "Sold count cannot be less than 0")
            .test(
              "sold-count",
              "Sold count cannot be greater than count",
              function (value) {
                const {count} = this.parent;
                return value <= count;
              }
            ),
        })
      ),
    }),
  });

  const handleDelete = (id, value) => {
    setIsDeleteModalOpen(true);
    setDeleteObj({
      id,
      value,
    });
  };

  const handleFormSubmit = (values, actions) => {
    let updatedFields = {};

    setIsLoading(true);

    if (mode === "edit") {
      // Loop through all keys to detect changes
      Object.keys(values).forEach((key) => {
        // Handle special case for categories
        if (key === "categories") {
          if (
            JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])
          ) {
            updatedFields[key] = values[key];
          }
        }
        // Handle other keys
        else if (
          JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])
        ) {
          updatedFields[key] = values[key];
        }
      });

      if (isAddingVenue) {
        updatedFields.venue = values.new_venue_name;
        delete updatedFields.new_venue_name;
      }

      // If no changes detected, show an error
      if (Object.keys(updatedFields).length === 0) {
        setFormError("No changes made");
        setIsLoading(false)
        return;
      }

      // Submit the updated fields
      onSubmit(updatedFields, actions);
      setIsLoading(false);
    } else {


      const updatedValues = {...values};

      if (isAddingVenue) {
        updatedValues.venue = values.new_venue_name;
        delete updatedValues.new_venue_name;
      }
      
      // Submit the values for creation
      onSubmit(updatedValues, actions);
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({values, handleChange, setFieldValue, handleSubmit}) => (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          encType="multipart/form-data"
        >
          <div className="px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:gap-4">
              {/* Event Name */}
              <div className="w-full sm:w-1/2">
                <Label htmlFor="event_name">Event Name</Label>
                <Input
                  id="event_name"
                  name="event_name"
                  value={values.event_name}
                  onChange={(e) => {
                    handleChange(e);
                    setFormError("");
                  }}
                  placeholder="Enter event name"
                />
                <ErrorMessage
                  name="event_name"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Categories */}
              <div className="w-full sm:w-1/2">
                <Label htmlFor="categories">Categories</Label>
                <Select
                  id="categories"
                  name="categories"
                  multiple
                  value={values.categories} // This should be an array of selected values
                  onChange={(e) => {
                    const options = e.target.options;
                    const selected = [];
                    for (let i = 0; i < options.length; i++) {
                      if (options[i].selected) {
                        selected.push(options[i].value);
                      }
                    }
                    setFieldValue("categories", selected);
                    setFormError("");
                  }}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Select>
                <ErrorMessage
                  name="categories"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              <div className="flex flex-col sm:flex-row sm:gap-2 w-1/2 flex-wrap">
                {/* Start Date */}
                <div className="">
                  <Label htmlFor="start_date">Start Date</Label>
                  <Flatpickr
                    name="start_date"
                    value={values.start_date ? values.start_date : date}
                    onChange={(date) => setFieldValue("start_date", date[0])}
                    options={{
                      dateFormat: "Y-m-d H:i",
                      minDate: "today",
                      enableTime: true,
                    }}
                    className="border-t-0 border-gray-300 p-2 rounded-md border-b-2 shadow-md focus:ring-1 outline-none focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="start_date"
                    component="div"
                    className="text-red-500"
                  />
                </div>

                {/* End Date */}
                <div className="">
                  <Label htmlFor="end_date">End Date</Label>
                  <Flatpickr
                    name="end_date"
                    value={values.end_date ? values.end_date : date}
                    onChange={(date) => setFieldValue("end_date", date[0])}
                    options={{
                      dateFormat: "Y-m-d H:i",
                      minDate: values.start_date || "today",
                      enableTime: true,
                    }}
                    className="border-t-0 border-gray-300 p-2 rounded-md border-b-2 shadow-md focus:ring-1 outline-none focus:ring-gray-300"
                  />
                  <ErrorMessage
                    name="end_date"
                    component="div"
                    className="text-red-500"
                  />
                </div>
              </div>

              {/* Event Time */}
              <div className="flex flex-col sm:flex-row sm:gap-2 w-1/2 flex-wrap">
                <div>
                  <Label htmlFor="time">Event Time</Label>
                  <Input
                    type="time"
                    id="time"
                    name="time"
                    value={values.time}
                    onChange={(e) => {
                      handleChange(e);
                      setFormError("");
                    }}
                    width="w-36"
                  />
                  <ErrorMessage
                    name="time"
                    component="div"
                    className="text-red-500"
                  />
                </div>
                <div>
                  {/* Status (for edit mode) */}
                  {mode === "edit" && (
                    <div className="w-full">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        id="status"
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="disabled">Disabled</option>
                        <option value="completed">Completed</option>
                      </Select>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:gap-4">
              {/* Location */}
              <div className="w-full sm:w-1/2">
                <Label htmlFor="location">Location</Label>
                <Field
                  className="border-b-2 border  border-t-0 border-gray-300 p-2 shadow-md rounded-md w-full outline-none focus:ring-1 focus:ring-gray-300"
                  as="select"
                  id="location"
                  name="location"
                  onChange={(e) => {
                    handleChange(e);
                    setFormError("");
                  }}
                >
                  <option value="" disabled className="bg-gray-400 opacity-50">
                    Select Location
                  </option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.name}>
                      {location.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="location"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Venue Selection or Adding New Venue */}
              {!isAddingVenue ? (
                <div className="w-full sm:w-1/2">
                  <Label htmlFor="venue">Venue</Label>
                  <Select
                    id="venue"
                    name="venue"
                    value={values.venue}
                    onChange={(e) => {
                      if (e.target.value === "add_new") {
                        setIsAddingVenue(true);
                        setFieldValue("venue", "");
                        setFormError("");
                      } else {
                        setIsAddingVenue(false);
                        setFieldValue("venue", e.target.value);
                        setFormError("");
                      }
                    }}
                  >
                    <option
                      value=""
                      className="bg-gray-300 opacity-50 "
                      disabled
                    >
                      Select a venue
                    </option>
                    <option
                      value="add_new"
                      className="font-semibold text-white bg-blue-400"
                    >
                      Add New Venue +
                    </option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.name}>
                        {venue.name}
                      </option>
                    ))}
                  </Select>
                  <ErrorMessage
                    name="venue"
                    component="div"
                    className="text-red-500 mt-1"
                  />
                </div>
              ) : (
                <div className="flex gap-3 w-full sm:w-1/2">
                  <div className="">
                    <Label htmlFor="new_venue_name">Add New Venue</Label>
                    <Input
                      id="new_venue_name"
                      name="new_venue_name"
                      value={values.new_venue_name}
                      onChange={(e) => {
                        handleChange(e);
                        setFormError("");
                      }}
                      placeholder="Enter new venue name"
                    />
                    <ErrorMessage
                      name="new_venue_name"
                      component="div"
                      className="text-red-500 mt-1"
                    />
                  </div>
                  <button
                    type="button "
                    onClick={() => {
                      setIsAddingVenue(false);
                      setFieldValue("new_venue_name", ""); // Clear the new venue input field
                    }}
                    className="text-red-500 hover:text-red-700 mt-2 font-semibold text-2xl"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-4">
              {/* Event Image */}
              <div className="w-full sm:w-1/2 ">
                <Label htmlFor="event_img_1">Event Image</Label>
                <div className="flex gap-3">
                  <Input
                    type="file"
                    id="event_img_1"
                    name="event_img_1"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      setFieldValue("event_img_1", file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreviews((prev) => ({
                            ...prev,
                            event_img_1: reader.result,
                          }));
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setImagePreviews((prev) => ({
                          ...prev,
                          event_img_1: "",
                        }));
                      }
                    }}
                  />
                  {imagePreviews.event_img_1 && (
                    <img
                      src={imagePreviews.event_img_1}
                      alt="Event"
                      className="mt-2 w-16 h-16 object-cover rounded-md"
                    />
                  )}
                </div>

                <ErrorMessage
                  name="event_img_1"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* About */}
              <div className="w-full sm:w-1/2">
                <Label htmlFor="about">About the Event</Label>
                <Textarea
                  id="about"
                  name="about"
                  value={values.about}
                  onChange={(e) => {
                    handleChange(e);
                    setFormError("");
                  }}
                  placeholder="Enter event description"
                />
                <ErrorMessage
                  name="about"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:gap-4">
              {/* Instructions */}
              <div className="w-full sm:w-1/2">
                <Label htmlFor="instruction">Instructions</Label>
                <Textarea
                  id="instruction"
                  name="instruction"
                  value={values.instruction}
                  onChange={(e) => {
                    handleChange(e);
                    setFormError("");
                  }}
                  placeholder="Enter instructions"
                />
                <ErrorMessage
                  name="instruction"
                  component="div"
                  className="text-red-500"
                />
              </div>

              {/* Terms and Conditions */}
              <div className="w-full sm:w-1/2">
                <Label htmlFor="terms_and_conditions">Terms & Conditions</Label>
                <Textarea
                  id="terms_and_conditions"
                  name="terms_and_conditions"
                  value={values.terms_and_conditions}
                  onChange={handleChange}
                  placeholder="Enter terms and conditions"
                />
                <ErrorMessage
                  name="terms_and_conditions"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>

            {/* Location URL */}
            <div>
              <Label htmlFor="location_url">Location URL</Label>
              <Input
                id="location_url"
                name="location_url"
                value={values.location_url}
                onChange={(e) => {
                  handleChange(e);
                  setFormError("");
                }}
                placeholder="Enter location URL"
              />
              <ErrorMessage
                name="location_url"
                component="div"
                className="text-red-500"
              />
            </div>

            {/* Conditionally render ticket types field only in 'create' mode */}
            {mode === "create" && (
              <FieldArray name="ticket_types">
                {({push, remove}) => (
                  <div>
                    <Label>Ticket Types</Label>
                    {values.ticket_types.map((ticket, index) => (
                      <div
                        key={index}
                        className="border rounded shadow-md p-4 mb-4"
                      >
                        <div className="flex justify-end gap-3">
                          <h4 className="text-end">#{index + 1}</h4>
                          <Button type="button" onClick={() => remove(index)}>
                            <FiTrash2 />
                          </Button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="w-full sm:w-1/2">
                            <Label htmlFor={`ticket_types.${index}.type_name`}>
                              Ticket Type Name
                            </Label>
                            <Input
                              id={`ticket_types.${index}.type_name`}
                              name={`ticket_types.${index}.type_name`}
                              value={ticket.type_name}
                              onChange={(e) => {
                                handleChange(e);
                                setFormError("");
                              }}
                              placeholder="Enter ticket type name"
                            />
                            <ErrorMessage
                              name={`ticket_types.${index}.type_name`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>

                          <div className="w-full sm:w-1/2 text-sm">
                            <Label
                              htmlFor={`ticket_types.${index}.ticket_image`}
                            >
                              Ticket Image
                            </Label>
                            <div className="flex gap-3">
                              <Input
                                type="file"
                                id={`ticket_types.${index}.ticket_image`}
                                name={`ticket_types.${index}.ticket_image`}
                                onChange={(event) => {
                                  const file = event.target.files[0];
                                  setFieldValue(
                                    `ticket_types.${index}.ticket_image`,
                                    file
                                  );
                                  if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                      setImagePreviews((prev) => {
                                        const updatedPreviews = [
                                          ...prev.ticket_types,
                                        ];
                                        updatedPreviews[index] = reader.result;
                                        return {
                                          ...prev,
                                          ticket_types: updatedPreviews,
                                        };
                                      });
                                    };
                                    reader.readAsDataURL(file);
                                  } else {
                                    setImagePreviews((prev) => {
                                      const updatedPreviews = [
                                        ...prev.ticket_types,
                                      ];
                                      updatedPreviews[index] = "";
                                      return {
                                        ...prev,
                                        ticket_types: updatedPreviews,
                                      };
                                    });
                                  }
                                }}
                              />
                              {imagePreviews.ticket_types[index] && (
                                <img
                                  src={imagePreviews.ticket_types[index]}
                                  alt="Event"
                                  className="mt-2 w-16 h-16 object-cover rounded-md"
                                />
                              )}
                            </div>
                            <ErrorMessage
                              name={`ticket_types.${index}.ticket_image`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:gap-3">
                          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-1/2 flex-wrap">
                            <div className="">
                              <Label htmlFor={`ticket_types.${index}.price`}>
                                Price
                              </Label>
                              <Input
                                type="number"
                                id={`ticket_types.${index}.price`}
                                name={`ticket_types.${index}.price`}
                                value={ticket.price}
                                onChange={(e) => {
                                  handleChange(e);
                                  setFormError("");
                                }}
                                placeholder="Enter ticket price"
                                width="w-32"
                              />
                              <ErrorMessage
                                name={`ticket_types.${index}.price`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>

                            <div className="">
                              <Label htmlFor={`ticket_types.${index}.count`}>
                                Count
                              </Label>
                              <Input
                                type="number"
                                id={`ticket_types.${index}.count`}
                                name={`ticket_types.${index}.count`}
                                value={ticket.count}
                                onChange={(e) => {
                                  handleChange(e);
                                  setFormError("");
                                }}
                                placeholder="Enter total ticket count"
                                width="w-32"
                              />
                              <ErrorMessage
                                name={`ticket_types.${index}.count`}
                                component="div"
                                className="text-red-500"
                              />
                            </div>
                          </div>
                          <div className="w-full sm:w-1/2">
                            <Label htmlFor={`ticket_types.${index}.sold_count`}>
                              Sold Count
                            </Label>
                            <Input
                              type="number"
                              id={`ticket_types.${index}.sold_count`}
                              name={`ticket_types.${index}.sold_count`}
                              value={ticket.sold_count}
                              width="w-32"
                              onChange={(e) => {
                                const newSoldCount =
                                  e.target.value === "" ? 0 : e.target.value;
                                setFieldValue(
                                  `ticket_types.${index}.sold_count`,
                                  newSoldCount
                                );
                                setFormError("");
                              }}
                              placeholder="Enter sold count"
                            />
                            <ErrorMessage
                              name={`ticket_types.${index}.sold_count`}
                              component="div"
                              className="text-red-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex justify-end">
                      <Button
                        type="button"
                        onClick={() =>
                          push({
                            type_name: "",
                            ticket_image: "",
                            price: "",
                            count: "",
                            sold_count: 0,
                          })
                        }
                      >
                        <FiPlus />
                      </Button>
                    </div>
                  </div>
                )}
              </FieldArray>
            )}

            <div className="flex gap-2 items-start mt-8">
              <Button
                type="submit"
                backgroundColor={"bg-green-500"}
                hover={"hover:bg-green-600"}
              >
                {isLoading ? (
                  <ClipLoader />
                ) : mode === "edit" ? (
                  "Save"
                ) : (
                  "Create"
                )}
              </Button>
              {mode === "edit" && (
                <Button
                  backgroundColor={"bg-red-500"}
                  hover={"hover:bg-red-600"}
                  onClick={() => handleDelete(values.id, values.event_name)}
                >
                  Delete
                </Button>
              )}
              <Button onClick={() => navigate("/vendor/events")}>Cancel</Button>
            </div>
            {formError && (
              <p className="text-sm text-red-500 mt-2">{formError}</p>
            )}
          </div>
          {isDeleteModalOpen && (
            <DeleteModal
              identifier={"Event"}
              onDeleteModalClose={setIsDeleteModalOpen}
              deleteObj={deleteObj}
              deleteApi={deleteEvents}
            />
          )}
        </form>
      )}
    </Formik>
  );
};

export default EventForm;
