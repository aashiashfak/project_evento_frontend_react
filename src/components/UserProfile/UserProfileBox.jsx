import React, {useState, useEffect} from "react";
import axiosInstance from "../../api/axiosInstance";
import EditModal from "./EditModal"; // Adjust the path as needed
import Header from "../Header/Header";
import {useDispatch} from "react-redux";
import {setUsername} from "../../redux/userSlice";
import {FaCamera} from "react-icons/fa";

const UserProfileBox = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIdentifier, setModalIdentifier] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [isInlineEdit, setIsInlineEdit] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get("accounts/user-profile/");
        const {email, phone_number, username, profile_picture} = response.data;
        setUserProfile(response.data);
        setEmail(email);
        setPhoneNumber(phone_number);
        setProfilePicture(profile_picture);
      } catch (error) {
        console.log("Error fetching user profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const openModal = (identifier, value) => {
    if (identifier === "username") {
      setIsInlineEdit(true);
      setCurrentValue(value);
      setNewUsername(value);
    } else {
      setModalIdentifier(identifier);
      setCurrentValue(value);
      setIsModalOpen(true);
    }
  };

  const handleUsernameSave = async () => {
    try {
      await axiosInstance.put("accounts/user-profile/", {
        username: newUsername,
      });
      setIsInlineEdit(false);
      setUserProfile({...userProfile, username: newUsername});
      dispatch(setUsername({username: newUsername}));
    } catch (error) {
      console.error("Error updating username", error);
    }
  };

  const handleUpdateEmail = (newEmail) => {
    setEmail(newEmail);
    setUserProfile({...userProfile, email: newEmail});
  };

  const handleUpdatePhoneNumber = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
    setUserProfile({...userProfile, phone_number: newPhoneNumber});
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);
      try {
        const response = await axiosInstance.put(
          "accounts/user-profile/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProfilePicture(response.data.profile_picture);
        setUserProfile({
          ...userProfile,
          profile_picture: response.data.profile_picture,
        });
      } catch (error) {
        console.error("Error updating profile picture", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const {profile_picture, username} = userProfile || {};

  return (
    <div>
      <Header />
      <div className="px-6 sm:px-10 md:px-16 lg:px-20 mx-auto py-16">
        <h1 className="text-violet-700 font-semibold text-2xl mb-2">
          ACCOUNT DETAILS
        </h1>
        <div className="flex flex-col md:flex-row items-center p-4 rounded justify-center shadow-xl">
          <div className="px-3 mt-4 relative">
            <div className="py-6 m-auto">
              {profile_picture ? (
                <img
                  className="w-36 h-36 object-cover rounded-full mb-8"
                  src={profile_picture}
                  alt="Profile"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-500 flex items-center justify-center rounded-full mb-4">
                  No image
                </div>
              )}
            </div>
            <label
              htmlFor="profile-picture-upload"
              className="cursor-pointer absolute bottom-14 right-4 bg-gray-400 opacity-70  p-2 rounded-full hover:opacity-100 transiton duration-300 ease-in-out"
            >
              <FaCamera className="text-white" />
            </label>
            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleProfilePictureChange}
            />
          </div>
          <div className="py-8 px-6 text-gray-600 md:ml-6 w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-center mb-4 justify-between w-full">
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <p className="font-semibold mr-2 md:mb-0 mb-1">User Name:</p>
                  {!isInlineEdit && (
                    <button
                      className="block md:hidden text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700"
                      onClick={() => openModal("username", username)}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {isInlineEdit ? (
                  <div className="flex items-center w-full transition ease-in-out duration-700">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      className="w-full p-[1px] border rounded mb-4 md:mb-0 mr-2 mt-1"
                    />
                    <button
                      onClick={handleUsernameSave}
                      className="text-sm ml-2 bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700"
                    >
                      Save
                    </button>
                    <button
                      className="ml-2 text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700"
                      onClick={() => setIsInlineEdit(false)}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <p className="mt-1">{username}</p>
                )}
              </div>
              {!isInlineEdit && (
                <button
                  className="hidden md:block text-sm ml-4 bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700 mb-5"
                  onClick={() => openModal("username", username)}
                >
                  Edit
                </button>
              )}
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4 justify-between w-full">
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <p className="font-semibold mr-2 md:mb-0 mb-1">
                    Email Address:
                  </p>
                  <button
                    className="block md:hidden text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700 mb-2"
                    onClick={() => openModal("email", email)}
                  >
                    {email ? "Edit" : "Add"}
                  </button>
                </div>
                <p className="flex-1">{email || "Not provided"}</p>
              </div>
              <button
                className="hidden md:block ml-4 text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700 mb-5"
                onClick={() => openModal("email", email)}
              >
                {email ? "Edit" : "Add"}
              </button>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4 justify-between w-full">
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <p className="font-semibold mr-2 md:mb-0 mb-1">
                    Mobile Number:
                  </p>
                  <button
                    className="block md:hidden text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700 mb-2"
                    onClick={() => openModal("phone", phoneNumber)}
                  >
                    {phoneNumber ? "Edit" : "Add"}
                  </button>
                </div>
                <p className="flex-1">{phoneNumber || "Not provided"}</p>
              </div>
              <button
                className="hidden md:block text-sm ml-4 bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700 mb-5"
                onClick={() => openModal("phone", phoneNumber)}
              >
                {phoneNumber ? "Edit" : "Add"}
              </button>
            </div>
          </div>
        </div>
        <EditModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          identifier={modalIdentifier}
          currentValue={currentValue}
          onUpdateEmail={handleUpdateEmail}
          onUpdatePhoneNumber={handleUpdatePhoneNumber}
        />
      </div>
    </div>
  );
};

export default UserProfileBox;
