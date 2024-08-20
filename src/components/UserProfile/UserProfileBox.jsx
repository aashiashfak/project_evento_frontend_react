import React, {useState, useEffect, useRef} from "react";
import EditModal from "./EditModal";
import {useDispatch} from "react-redux";
import {setUsername,setProfileDp} from "../../redux/userSlice";
import {FaCamera} from "react-icons/fa";
import {
  getUserProfile,
  updateProfilePicture,
  updateUsername,
} from "../../api/userProfile/UserProfileApi";
import {showToast} from "../../utilities/tostify/toastUtils";


const UserProfileBox = () => {
  // const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalIdentifier, setModalIdentifier] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [isInlineEdit, setIsInlineEdit] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [username,setUsername1] = useState('')
  const [usernameError, setUsernameError] = useState()
  const dispatch = useDispatch();
  const userNameInputRef = useRef();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const responseData = await getUserProfile();
        const {email, phone_number, username, profile_picture} = responseData;
        console.log('responseData:',responseData)
        // setUserProfile(responseData);
        setEmail(email);
        setPhoneNumber(phone_number);
        setProfilePicture(profile_picture);
        setUsername1(username)

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
      setTimeout(() => userNameInputRef.current.focus(), 0);
    } else {
      setModalIdentifier(identifier);
      setCurrentValue(value);
      setIsModalOpen(true);
    }
  };

  const handleUsernameSave = async () => {
    try {
      await updateUsername(newUsername);
      setIsInlineEdit(false);
      dispatch(setUsername({username: newUsername}));
      setUsername1(newUsername)
      showToast(`your username Change to ${newUsername}`,'success');
    } catch (error) {
      console.error("Error updating username", error);
      if (error.response && error.response.data) {
        setUsernameError(error.response.data.username.username || "An error occurred");
      } else {
        setUsernameError("An error occurred while updating the username");
      }
    }
  };

  const handleUpdateEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const handleUpdatePhoneNumber = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
  };

  const handleProfilePictureChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_picture", file);
      try {
        const response = await updateProfilePicture(formData)
        console.log(response)
        setProfilePicture(response);
        dispatch(setProfileDp(response))
        showToast("Profile picture changed succussfully",'success');
      } catch (error) {
        console.error("Error updating profile picture", error);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <div className="px-6 sm:px-10 md:px-16 xl:px-20 mx-auto py-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Account Details
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center p-4 rounded justify-center shadow-xl">
          <div className="px-3 mt-4 relative">
            <div className="py-6 m-auto">
              {profilePicture ? (
                <img
                  className="w-36 h-36 object-cover rounded-full mb-8"
                  src={profilePicture}
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
          <div className="py-8 px-6 text-gray-600 w-full md:ml-6 min-w-min md:w-1/3">
            <div className="flex flex-col md:flex-row items-center mb-4 justify-between w-full">
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <p className="font-semibold mr-2 mb-1 ">User Name</p>
                  {!isInlineEdit && (
                    <button
                      className="text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700 mb-2"
                      onClick={() => openModal("username", username)}
                    >
                      Edit
                    </button>
                  )}
                </div>
                {isInlineEdit ? (
                  <div className="flex items-center w-full transition ease-in-out duration-700 ">
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => {setNewUsername(e.target.value);setUsernameError('')}}
                      className="w-full py-1 pl-2 shadow-md border rounded mb-4 md:mb-0 mr-2 mt-2"
                      ref={userNameInputRef}
                    />

                    <button
                      onClick={handleUsernameSave}
                      className="text-sm ml-2 bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700"
                    >
                      Save
                    </button>
                    <button
                      className="ml-2 text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700"
                      onClick={() => {setIsInlineEdit(false);setUsernameError("");}}
                    >
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="border border-gray-400 rounded border-opacity-45 shadow-md px-2 py-1">
                    <p className="">{username || "Guest"}</p>
                  </div>
                )}
              </div>
            </div>
            {usernameError && (
              <p className="text-red-500 text-sm mt-1">{usernameError}</p>
            )}
            <div className="flex flex-col lg:flex-row items-center mb-4 justify-between w-full">
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <p className="font-semibold mr-2 mb-1">Email Address</p>
                  <button
                    className="text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700 mb-2"
                    onClick={() => openModal("email", email)}
                  >
                    {email ? "Edit" : "Add"}
                  </button>
                </div>
                <div className="border border-gray-400 rounded border-opacity-45 shadow-md px-2 py-1">
                  <p className="flex-1">{email || "Not provided"}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center mb-4 justify-between w-full">
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <p className="font-semibold mr-2 mb-1">Mobile Number</p>
                  <button
                    className=" text-sm bg-violet-600 text-white py-1 px-4 rounded transition duration-200 hover:bg-violet-700 mb-2"
                    onClick={() => openModal("phone", phoneNumber)}
                  >
                    {phoneNumber ? "Edit" : "Add"}
                  </button>
                </div>
                <div className="border border-gray-400 rounded border-opacity-45 shadow-md pl-2 py-1">
                  <p className="flex-1">{phoneNumber || "Not provided"}</p>
                </div>
              </div>
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
