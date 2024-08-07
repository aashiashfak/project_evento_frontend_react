import React from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {vendorSignUp} from "../../api/vendorApi/vendorAuth";

const VendorSignUp = () => {
  const formik = useFormik({
    initialValues: {
      organizer_name: "",
      pan_card_number: "",
      address: "",
      gstin: "",
      itr_filed: "",
      contact_name: "",
      email: "",
      phone_number: "",
      benificiary_name: "",
      account_type: "",
      bank_name: "",
      account_number: "",
      IFSC_code: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      organizer_name: Yup.string().required("Organizer name is required"),
      pan_card_number: Yup.string().required("PAN card number is required"),
      address: Yup.string().required("Address is required"),
      contact_name: Yup.string().required("Contact name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone_number: Yup.string().required("Phone number is required"),
      benificiary_name: Yup.string().required("Beneficiary name is required"),
      account_type: Yup.string().required("Account type is required"),
      bank_name: Yup.string().required("Bank name is required"),
      account_number: Yup.string().required("Account number is required"),
      IFSC_code: Yup.string().required("IFSC code is required"),
      password: Yup.string().required("Password is required"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values, {setErrors}) => {
      const modifiedValues = {
        ...values,
        phone_number: `+91${values.phone_number}`,
      };
      try {
        const response = await vendorSignUp(modifiedValues);
        alert(response.message); // Handle success (e.g., redirect)
      } catch (error) {
        if (error.response && error.response.data) {
          const backendErrors = error.response.data;
          const errorObject = {};

          // Convert backendErrors to match Formik's expected format
          Object.keys(backendErrors).forEach((field) => {
            errorObject[field] = backendErrors[field][0]; // Use the first error message for each field
          });

          setErrors(errorObject);
        } else {
          console.error("Error:", error.message);
        }
      }
    },
  });

  return (
    <div>
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6 text-center">START SELLING</h1>
        <p className="text-center mb-6 font-semibold">
          Please fill in the below details to access your vendor account, where
          you can list your events, track their progress, and manage your
          bookings.
        </p>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="organizer_name"
                className="block text-sm font-medium text-gray-700"
              >
                Organisation/Individual Name
              </label>
              <input
                id="organizer_name"
                name="organizer_name"
                type="text"
                value={formik.values.organizer_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.organizer_name && formik.touched.organizer_name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter Organisation/Individual Name"
              />
              {formik.errors.organizer_name &&
                formik.touched.organizer_name && (
                  <p className="text-sm text-red-600 mt-1">
                    {formik.errors.organizer_name}
                  </p>
                )}
            </div>
            <div>
              <label
                htmlFor="pan_card_number"
                className="block text-sm font-medium text-gray-700"
              >
                Organisation/Individual PAN Card Number
              </label>
              <input
                id="pan_card_number"
                name="pan_card_number"
                type="text"
                value={formik.values.pan_card_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.pan_card_number &&
                  formik.touched.pan_card_number
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter PAN Card Number"
              />
              {formik.errors.pan_card_number &&
                formik.touched.pan_card_number && (
                  <p className="text-sm text-red-600 mt-1">
                    {formik.errors.pan_card_number}
                  </p>
                )}
            </div>
          </div>
          <div className="grid grid-cols-1">
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Organisation/Individual Address
              </label>
              <textarea
                id="address"
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.address && formik.touched.address
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter Address"
              />
              {formik.errors.address && formik.touched.address && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.address}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Do you have a GSTIN number?
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gstin"
                    value="yes"
                    checked={formik.values.gstin === "yes"}
                    onChange={formik.handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="gstin"
                    value="no"
                    checked={formik.values.gstin === "no"}
                    onChange={formik.handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Have you filed last 2 years ITR return?
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="itr_filed"
                    value="yes"
                    checked={formik.values.itr_filed === "yes"}
                    onChange={formik.handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="itr_filed"
                    value="no"
                    checked={formik.values.itr_filed === "no"}
                    onChange={formik.handleChange}
                    className="form-radio"
                  />
                  <span className="ml-2">No</span>
                </label>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="contact_name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="contact_name"
                name="contact_name"
                type="text"
                value={formik.values.contact_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.contact_name && formik.touched.contact_name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter Full Name"
              />
              {formik.errors.contact_name && formik.touched.contact_name && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.contact_name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.email && formik.touched.email
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter Email"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone_number"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="flex items-center">
                <span className="p-2 bg-gray-200 border border-gray-300 rounded-l-md shadow-sm text-sm mt-1">
                  +91
                </span>
                <input
                  id="phone_number"
                  name="phone_number"
                  type="text"
                  value={formik.values.phone_number}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full px-3 py-2 border rounded-r-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                    formik.errors.phone_number && formik.touched.phone_number
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter Phone Number"
                />
              </div>

              {formik.errors.phone_number && formik.touched.phone_number && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.phone_number}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="benificiary_name"
                className="block text-sm font-medium text-gray-700"
              >
                Beneficiary Name
              </label>
              <input
                id="benificiary_name"
                name="benificiary_name"
                type="text"
                value={formik.values.benificiary_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.benificiary_name &&
                  formik.touched.benificiary_name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter Beneficiary Name"
              />
              {formik.errors.benificiary_name &&
                formik.touched.benificiary_name && (
                  <p className="text-sm text-red-600 mt-1">
                    {formik.errors.benificiary_name}
                  </p>
                )}
            </div>
            <div>
              <label
                htmlFor="account_type"
                className="block text-sm font-medium text-gray-700"
              >
                Account Type
              </label>
              <select
                id="account_type"
                name="account_type"
                value={formik.values.account_type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.account_type && formik.touched.account_type
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
              >
                <option value="">Select Account Type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
              </select>
              {formik.errors.account_type && formik.touched.account_type && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.account_type}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label
                htmlFor="bank_name"
                className="block text-sm font-medium text-gray-700"
              >
                Bank Name
              </label>
              <input
                id="bank_name"
                name="bank_name"
                type="text"
                value={formik.values.bank_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.bank_name && formik.touched.bank_name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter Bank Name"
              />
              {formik.errors.bank_name && formik.touched.bank_name && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.bank_name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="account_number"
                className="block text-sm font-medium text-gray-700"
              >
                Account Number
              </label>
              <input
                id="account_number"
                name="account_number"
                type="text"
                value={formik.values.account_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.account_number && formik.touched.account_number
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter Account Number"
              />
              {formik.errors.account_number &&
                formik.touched.account_number && (
                  <p className="text-sm text-red-600 mt-1">
                    {formik.errors.account_number}
                  </p>
                )}
            </div>
            <div>
              <label
                htmlFor="IFSC_code"
                className="block text-sm font-medium text-gray-700"
              >
                IFSC Code
              </label>
              <input
                id="IFSC_code"
                name="IFSC_code"
                type="text"
                value={formik.values.IFSC_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.IFSC_code && formik.touched.IFSC_code
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter IFSC Code"
              />
              {formik.errors.IFSC_code && formik.touched.IFSC_code && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.IFSC_code}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.password && formik.touched.password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Enter Password"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-red-600 mt-1">
                  {formik.errors.password}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm_password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                  formik.errors.confirm_password &&
                  formik.touched.confirm_password
                    ? "border-red-500 bg-red-50"
                    : "border-gray-300"
                }`}
                placeholder="Confirm Password"
              />
              {formik.errors.confirm_password &&
                formik.touched.confirm_password && (
                  <p className="text-sm text-red-600 mt-1">
                    {formik.errors.confirm_password}
                  </p>
                )}
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VendorSignUp;
