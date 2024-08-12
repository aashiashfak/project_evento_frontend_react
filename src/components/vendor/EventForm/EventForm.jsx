import React, {useState} from "react";
import {Formik, Field, FieldArray, ErrorMessage} from "formik";
import * as Yup from "yup";
import {
  Input,
  Label,
  Select,
  Textarea,
  Button,
} from "../../FormComponents/FormComponents";
import {AiOutlineClose} from "react-icons/ai"; // Import cancel icon

const EventForm = ({
  initialValues,
  onSubmit,
  locations,
  categories,
  venues,
}) => {
  const [isAddingVenue, setIsAddingVenue] = useState(false);

  const validationSchema = Yup.object({
    event_name: Yup.string().required("Event name is required"),
    categories: Yup.array()
      .of(Yup.string())
      .min(1, "At least one category is required"),
    start_date: Yup.date().required("Start date is required"),
    end_date: Yup.date().required("End date is required"),
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
          .min(0, "Sold count cannot be less than 0"),
      })
    ),
  });

  const handleFormSubmit = (values, actions) => {
    // Ensure sold_count is set to 0 if it is empty or undefined
    const updatedValues = {
      ...values,
      ticket_types: values.ticket_types.map((ticket) => ({
        ...ticket,
        sold_count:
          ticket.sold_count === "" || ticket.sold_count == null
            ? 0
            : ticket.sold_count,
      })),
    };
    if (isAddingVenue) {
      updatedValues.venue = updatedValues.new_venue_name; 
      delete updatedValues.new_venue_name; 
    }

    onSubmit(updatedValues, actions);
    console.log(updatedValues.ticket_types);
    console.log(updatedValues.categories);
    console.log(updatedValues);
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
          {/* Event Name */}
          <div>
            <Label htmlFor="event_name">Event Name</Label>
            <Input
              id="event_name"
              name="event_name"
              value={values.event_name}
              onChange={handleChange}
              placeholder="Enter event name"
            />
            <ErrorMessage
              name="event_name"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Categories */}
          <div>
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

          {/* Start Date */}
          <div>
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              type="datetime-local"
              id="start_date"
              name="start_date"
              value={values.start_date}
              onChange={handleChange}
            />
            <ErrorMessage
              name="start_date"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* End Date */}
          <div>
            <Label htmlFor="end_date">End Date</Label>
            <Input
              type="datetime-local"
              id="end_date"
              name="end_date"
              value={values.end_date}
              onChange={handleChange}
            />
            <ErrorMessage
              name="end_date"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Event Time */}
          <div>
            <Label htmlFor="time">Event Time</Label>
            <Input
              type="time"
              id="time"
              name="time"
              value={values.time}
              onChange={handleChange}
            />
            <ErrorMessage
              name="time"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Location */}
          <div>
            <Label htmlFor="location">Location</Label>
            <Field
              as="select"
              id="location"
              name="location"
              onChange={handleChange}
            >
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
            <div>
              <Label htmlFor="venue">Venue</Label>
              <Select
                id="venue"
                name="venue"
                value={values.venue}
                onChange={(e) => {
                  if (e.target.value === "add_new") {
                    setIsAddingVenue(true);
                    setFieldValue("venue", ""); // Clear the venue field
                  } else {
                    setIsAddingVenue(false);
                    setFieldValue("venue", e.target.value);
                  }
                }}
              >
                <option value="">Select a venue</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.name}>
                    {venue.name}
                  </option>
                ))}
                <option value="add_new">Add New Venue</option>
              </Select>
              <ErrorMessage
                name="venue"
                component="div"
                className="text-red-500"
              />
            </div>
          ) : (
            <div className="flex items-center">
              <div className="flex-1">
                <Label htmlFor="new_venue_name">New Venue Name</Label>
                <Input
                  id="new_venue_name"
                  name="new_venue_name"
                  value={values.new_venue_name}
                  onChange={handleChange}
                  placeholder="Enter new venue name"
                />
                <ErrorMessage
                  name="new_venue_name"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
          )}

          {/* Event Image */}
          <div>
            <Label htmlFor="event_img_1">Event Image</Label>
            <Input
              type="file"
              id="event_img_1"
              name="event_img_1"
              onChange={(event) =>
                setFieldValue("event_img_1", event.target.files[0])
              }
            />
            <ErrorMessage
              name="event_img_1"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* About */}
          <div>
            <Label htmlFor="about">About the Event</Label>
            <Textarea
              id="about"
              name="about"
              value={values.about}
              onChange={handleChange}
              placeholder="Enter event description"
            />
            <ErrorMessage
              name="about"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Instructions */}
          <div>
            <Label htmlFor="instruction">Instructions</Label>
            <Textarea
              id="instruction"
              name="instruction"
              value={values.instruction}
              onChange={handleChange}
              placeholder="Enter instructions"
            />
            <ErrorMessage
              name="instruction"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Terms and Conditions */}
          <div>
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

          {/* Location URL */}
          <div>
            <Label htmlFor="location_url">Location URL</Label>
            <Input
              id="location_url"
              name="location_url"
              value={values.location_url}
              onChange={handleChange}
              placeholder="Enter location URL"
            />
            <ErrorMessage
              name="location_url"
              component="div"
              className="text-red-500"
            />
          </div>

          {/* Ticket Types */}
          <FieldArray name="ticket_types">
            {({push, remove}) => (
              <div>
                <Label>Ticket Types</Label>
                {values.ticket_types.map((ticket, index) => (
                  <div key={index} className="border p-4 mb-4">
                    <div>
                      <Label htmlFor={`ticket_types.${index}.type_name`}>
                        Ticket Type Name
                      </Label>
                      <Input
                        id={`ticket_types.${index}.type_name`}
                        name={`ticket_types.${index}.type_name`}
                        value={ticket.type_name}
                        onChange={handleChange}
                        placeholder="Enter ticket type name"
                      />
                      <ErrorMessage
                        name={`ticket_types.${index}.type_name`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`ticket_types.${index}.ticket_image`}>
                        Ticket Image
                      </Label>
                      <Input
                        type="file"
                        id={`ticket_types.${index}.ticket_image`}
                        name={`ticket_types.${index}.ticket_image`}
                        onChange={(event) =>
                          setFieldValue(
                            `ticket_types.${index}.ticket_image`,
                            event.target.files[0]
                          )
                        }
                      />
                      <ErrorMessage
                        name={`ticket_types.${index}.ticket_image`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`ticket_types.${index}.price`}>
                        Price
                      </Label>
                      <Input
                        type="number"
                        id={`ticket_types.${index}.price`}
                        name={`ticket_types.${index}.price`}
                        value={ticket.price}
                        onChange={handleChange}
                        placeholder="Enter ticket price"
                      />
                      <ErrorMessage
                        name={`ticket_types.${index}.price`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`ticket_types.${index}.count`}>
                        Count
                      </Label>
                      <Input
                        type="number"
                        id={`ticket_types.${index}.count`}
                        name={`ticket_types.${index}.count`}
                        value={ticket.count}
                        onChange={handleChange}
                        placeholder="Enter total ticket count"
                      />
                      <ErrorMessage
                        name={`ticket_types.${index}.count`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div>
                      <Label htmlFor={`ticket_types.${index}.sold_count`}>
                        Sold Count
                      </Label>
                      <Input
                        type="number"
                        id={`ticket_types.${index}.sold_count`}
                        name={`ticket_types.${index}.sold_count`}
                        value={ticket.sold_count}
                        onChange={(e) => {
                          const newSoldCount =
                            e.target.value === "" ? 0 : e.target.value;
                          setFieldValue(
                            `ticket_types.${index}.sold_count`,
                            newSoldCount
                          );
                        }}
                        placeholder="Enter sold count"
                      />
                      <ErrorMessage
                        name={`ticket_types.${index}.sold_count`}
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <Button type="button" onClick={() => remove(index)}>
                      Remove Ticket Type
                    </Button>
                  </div>
                ))}

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
                  Add Ticket Type
                </Button>
              </div>
            )}
          </FieldArray>

          <Button type="submit">Submit</Button>
        </form>
      )}
    </Formik>
  );
};

export default EventForm;
