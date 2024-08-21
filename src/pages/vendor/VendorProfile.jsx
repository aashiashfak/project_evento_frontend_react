import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import UserProfileBox from "../../components/UserProfile/UserProfileBox";
import {
  editVendorProfile,
  getVendorProfile,
} from "../../api/vendorApi/vendorProfile";
import {FaEdit} from "react-icons/fa";
import {Spinner} from "../../components/spinner/Spinner";
import {
  Input,
  Label,
  Textarea,
  Button,
  Select,
} from "../../components/FormComponents/FormComponents";
import { showToast } from "../../utilities/tostify/toastUtils";

const VendorProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const formik = useFormik({
    initialValues: {
      organizer_name: "",
      pan_card_number: "",
      address: "",
      contact_name: "",
      benificiary_name: "",
      account_type: "",
      bank_name: "",
      account_number: "",
      IFSC_code: "",
    },

    validationSchema: Yup.object({
      organizer_name: Yup.string().required("Organizer name is required"),
      pan_card_number: Yup.string()
        .required("PAN card number is required")
        .max(10, "PAN card number should not be more than 10 characters"),
      account_number: Yup.string()
        .required("Account number is required")
        .matches(
          /^\d{9,16}$/, // Update regex to enforce 9 to 16 digits
          "Account number should be between 9 and 16 digits"
        ),
      IFSC_code: Yup.string()
        .required("IFSC code is required")
        .matches(
          /^[A-Z]{4}0[A-Z0-9]{6}$/,
          "IFSC code should be exactly 11 characters, starting with 4 uppercase letters, followed by 0, and ending with 6 alphanumeric characters"
        ),
      address: Yup.string().required("Address is required"),
      contact_name: Yup.string().required("Contact name is required"),
      benificiary_name: Yup.string().required("Beneficiary name is required"),
      account_type: Yup.string().required("Account type is required"),
      bank_name: Yup.string().required("Bank name is required"),
    }),

    onSubmit: async (values) => {
      const changesMade = Object.keys(values).some(
        (key) => values[key] !== initialValues[key]
      );

      if (!changesMade) {
        alert("No changes made");
        return;
      }

      try {
        const response = await editVendorProfile(values);

        console.log(response);
        setIsEdit(false);
        showToast(`orgainzer details updated succussfully`, "success");
      } catch (error) {
        if (error.response && error.response.data) {
          const backendErrors = error.response.data;
          const formikErrors = {};
          Object.keys(backendErrors).forEach((field) => {
            formikErrors[field] = backendErrors[field].join(" ");
          });

          formik.setErrors(formikErrors);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    },
  });

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        setLoading(true);
        const responseData = await getVendorProfile();
        setInitialValues(responseData);
        formik.setValues(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gray-100 py-6">
      <UserProfileBox />
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 mx-auto py-1">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Organizer Details
          </h2>
          <FaEdit
            className="text-2xl mt-2 hover:text-blue-500 cursor-pointer text-gray-500"
            onClick={() => setIsEdit(true)}
          />
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className={`max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8 ${
            isEdit ? "bg-blue-300 bg-opacity-30" : ""
          }`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="organizer_name">Organizer Name</Label>
              <Input
                id="organizer_name"
                type="text"
                placeholder="Organizer Name"
                {...formik.getFieldProps("organizer_name")}
                readOnly={!isEdit}
              />
              {formik.touched.organizer_name && formik.errors.organizer_name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.organizer_name}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="pan_card_number">PAN Card Number</Label>
              <Input
                id="pan_card_number"
                type="text"
                placeholder="PAN Card Number"
                {...formik.getFieldProps("pan_card_number")}
                readOnly={!isEdit}
              />
              {formik.touched.pan_card_number &&
              formik.errors.pan_card_number ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.pan_card_number}
                </div>
              ) : null}
            </div>
            <div className="col-span-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                placeholder="Address"
                {...formik.getFieldProps("address")}
                readOnly={!isEdit}
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.address}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="contact_name">Contact Name</Label>
              <Input
                id="contact_name"
                type="text"
                placeholder="Contact Name"
                {...formik.getFieldProps("contact_name")}
                readOnly={!isEdit}
              />
              {formik.touched.contact_name && formik.errors.contact_name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.contact_name}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="benificiary_name">Beneficiary Name</Label>
              <Input
                id="benificiary_name"
                type="text"
                placeholder="Beneficiary Name"
                {...formik.getFieldProps("benificiary_name")}
                readOnly={!isEdit}
              />
              {formik.touched.benificiary_name &&
              formik.errors.benificiary_name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.benificiary_name}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="account_type">Account Type</Label>
              <select
                id="account_type"
                name="account_type"
                {...formik.getFieldProps("account_type")}
                onChange={formik.handleChange}
                disabled={!isEdit}
                className="border border-b-2 border-t-0 border-gray-300 p-2 shadow-md rounded-md w-full outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="" label="Select account type" />
                <option value="current" label="Current" />
                <option value="savings" label="Savings" />
                <option value="joint" label="Joint" />
              </select>
              {formik.touched.account_type && formik.errors.account_type ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.account_type}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="bank_name">Bank Name</Label>
              <Input
                id="bank_name"
                type="text"
                placeholder="Bank Name"
                {...formik.getFieldProps("bank_name")}
                readOnly={!isEdit}
              />
              {formik.touched.bank_name && formik.errors.bank_name ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.bank_name}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="account_number">Account Number</Label>
              <Input
                id="account_number"
                type="number"
                placeholder="Account Number"
                {...formik.getFieldProps("account_number")}
                readOnly={!isEdit}
              />
              {formik.touched.account_number && formik.errors.account_number ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.account_number}
                </div>
              ) : null}
            </div>
            <div className="col-span-2 sm:col-span-1">
              <Label htmlFor="IFSC_code">IFSC Code</Label>
              <Input
                id="IFSC_code"
                type="text"
                placeholder="IFSC Code"
                {...formik.getFieldProps("IFSC_code")}
                readOnly={!isEdit}
              />
              {formik.touched.IFSC_code && formik.errors.IFSC_code ? (
                <div className="text-red-500 text-sm mt-1">
                  {formik.errors.IFSC_code}
                </div>
              ) : null}
            </div>
          </div>
          {isEdit && (
            <div className="flex justify-end mt-6 gap-2">
              <Button
                type="submit"
                backgroundColor={"bg-green-500"}
                hover={"hover:bg-green-800"}
              >
                Save
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setIsEdit(false);
                  formik.setValues(initialValues);
                }}
              >
                Cancel
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VendorProfile;
