
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from '../config/axiosConfig';
import { selectUserId } from '../features/auth/authSlice';
import '../features/profilePage/ProfilePage.css';
import ResetButton from '../features/profilePage/ResetButton'; 

const ProfilePage = () => {
  const userId = useSelector(selectUserId); // Accessing userId from Redux
  const [userData, setUserData] = useState(null); // Local state for user data
  const isCollapsed = useSelector((state) => state.sidebar.isCollapsed);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.post('/api/UserDetails/getUser', { userId });
        if (response.data && response.data.length > 0) {
          setUserData(response.data[0]); 
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  return (
    <div className={`transition-all duration-300 ${isCollapsed ? "ml-20" : "ml-64"}`}>
      <div className="profile-page">
        <div className="flex justify-between items-center mb-6">
          <h1 className="profile-header">User Profile</h1>
          <ResetButton />
        </div>
        {userData ? (
          <div className="profile-card">
            <div className="profile-details">
              <div className="profile-field">
                <strong>User ID</strong>
                <p>{userData.Id}</p>
              </div>
              <div className="profile-field">
                <strong>Name</strong>
                <p>{userData.firstName} {userData.lastName}</p>
              </div>
              <div className="profile-field">
                <strong>Role</strong>
                <p>{userData.role}</p>
              </div>
              <div className="profile-field">
                <strong>Email</strong>
                <p>{userData.email}</p>
              </div>
              <div className="profile-field">
                <strong>NIC</strong>
                <p>{userData.nic}</p>
              </div>
              <div className="profile-field">
                <strong>Contact Number</strong>
                <p>{userData.contactNo}</p>
              </div>
              <div className="profile-field address">
                <strong>Address</strong>
                <p>{userData.addressLine1}
                  {userData.addressLine2 ? `, ${userData.addressLine2}` : ''}, {userData.city}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="loading-message">Loading profile data...</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;