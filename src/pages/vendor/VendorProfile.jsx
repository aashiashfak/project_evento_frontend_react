import React, {useEffect, useState} from "react";
import UserProfileBox from "../../components/UserProfile/UserProfileBox";
import {getVendorProfile} from "../../api/vendorApi/vendorProfile";

const VendorProfile = () => {
  const [vendorData, setVendorData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        setLoading(true);
        const responseData = await getVendorProfile();
        setVendorData(responseData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendorProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or premium loading indicator
  }

  return (
    <div className="bg-gray-100 py-6">
      <UserProfileBox />
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 mx-auto py-1">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Organizer Details
        </h2>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                Organizer Name
              </label>
              <input
                type="text"
                value={vendorData?.organizer_name || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                PAN Card Number
              </label>
              <input
                type="text"
                value={vendorData?.pan_card_number || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                Address
              </label>
              <textarea
                value={vendorData?.address || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                Contact Name
              </label>
              <input
                type="text"
                value={vendorData?.contact_name || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                Beneficiary Name
              </label>
              <input
                type="text"
                value={vendorData?.benificiary_name || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                Account Type
              </label>
              <input
                type="text"
                value={vendorData?.account_type || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={vendorData?.bank_name || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={vendorData?.account_number || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 font-semibold mb-2">
                IFSC Code
              </label>
              <input
                type="text"
                value={vendorData?.IFSC_code || ""}
                readOnly
                className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;
