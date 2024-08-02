import React from 'react'
import UserProfileBox from '../../components/UserProfile/UserProfileBox'

const ProfilePage = () => {
  return (
    <div className="relative">
      <UserProfileBox />
      <div className="absolute top-12 right-20">
        <button className="text-white bg-black px-3 py-[5px]  rounded-lg">
          Change password
        </button>
      </div>
    </div>
  );
}

export default ProfilePage