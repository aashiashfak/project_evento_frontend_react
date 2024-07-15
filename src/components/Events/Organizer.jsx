import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axiosInstance from "../../api/axiosInstance";
import {CiPhone, CiMail} from "react-icons/ci";

const Organizer = ({vendor_id, email, phone, name, photo}) => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const [isFollowed, setIsFollowed] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = "http://localhost:8000/media/";

  useEffect(() => {
    const fetchVendorStatus = async () => {
      try {
        const response = await axiosInstance.get(
          `accounts/vendors/${vendor_id}/follow-status`
        );
        setIsFollowed(response.data.is_followed);
      } catch (error) {
        setError("Error fetching follow status.");
        console.error("Error fetching follow status:", error);
      }
    };

    if (accessToken) {
      fetchVendorStatus();
    }
  }, [vendor_id, accessToken]);

  const handleFollowUnfollow = async () => {
    try {
      if (isFollowed) {
        await axiosInstance.delete(`accounts/follow-unfollow/${vendor_id}/`);
        setIsFollowed(false);
      } else {
        await axiosInstance.post(`accounts/follow-unfollow/${vendor_id}/`);
        setIsFollowed(true);
      }
    } catch (error) {
      setError("Error updating follow status.");
      console.error("Error updating follow status:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl text-violet-700 font-semibold">Hosted By</h1>
      <div className="px-4 py-2 shadow-lg rounded-md flex items-center gap-4">
        <div
          className={`w-16 h-16 rounded-full ${
            photo ? "" : "bg-gray-300"
          } flex items-center justify-center overflow-hidden`}
        >
          {photo ? (
            <img
              src={`${baseUrl}${photo}`}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?w=740" 
              alt="null"
              className="w-full h-full object-cover"  
            />
          )}
        </div>
        <div>
          <h1 className="text-lg text-gray-600 font-semibold mt-2">{name}</h1>

          <div className="flex gap-3 items-center mt-2">
            <div className="flex gap-3 items-center">
              <a href={`tel:${phone}`} className="text-violet-700">
                <CiPhone size={20} />
              </a>
              <a href={`mailto:${email}`} className="text-violet-700">
                <CiMail size={21} />
              </a>
            </div>
            {accessToken && (
              <button
                onClick={handleFollowUnfollow}
                className={`rounded-lg text-sm px-4 py-1 border ${
                  isFollowed
                    ? "bg-violet-700 text-white"
                    : "bg-white text-black border-violet-700 "
                }`}
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organizer;
