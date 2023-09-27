import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const baseURL = 'http://localhost:3000'
  useEffect(() => {
    // Fetch user profile data from your backend
   
    axios.get(`${baseURL}/api/user/profile`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
    setNewUserData({
      name: userData.name,
      email: userData.email,
      // Add other profile fields here
    });
  };

  const handleSaveClick = async () => {
    try {
      // Send updated user profile data to the backend
      const response = await axios.put(`${baseURL}/api/user/profile`, newUserData);
      console.log('Profile update successful:', response.data);
      setUserData(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Profile update error:', error.response.data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData({ ...newUserData, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleUploadProfilePicture = async () => {
    try {
      // Create a FormData object to send the file to the backend
      const formData = new FormData();
      formData.append('profilePicture', profilePicture);

      // Send the file to the backend for uploading
      const response = await axios.post(`${baseURL}/api/user/upload-profile-picture`, formData);
      console.log('Profile picture upload successful:', response.data);
      // Update the user data with the new profile picture URL
      setUserData({ ...userData, profilePicture: response.data.profilePicture });
      setProfilePicture(null); // Clear the selected file
    } catch (error) {
      console.error('Profile picture upload error:', error.response.data);
    }
  };

  return (
    <div className="container mt-4">
      <h2>User Profile</h2>
      <div className="row">
        <div className="col-md-6">
          <h3>Profile Information</h3>
          <form>
            <div className="form-group">
              <label>Name</label>
              {editMode ? (
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={newUserData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{userData.name}</div>
              )}
            </div>
            <div className="form-group">
              <label>Email</label>
              {editMode ? (
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={newUserData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <div>{userData.email}</div>
              )}
            </div>
            {/* Add other profile fields here */}
            {editMode ? (
              <button className="btn btn-primary" onClick={handleSaveClick}>
                Save
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleEditClick}>
                Edit Profile
              </button>
            )}
          </form>
        </div>
        <div className="col-md-6">
          <h3>Profile Picture</h3>
          {editMode && (
            <div className="form-group">
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handleUploadProfilePicture}
              >
                Upload
              </button>
            </div>
          )}
          <img
            src={userData.profilePicture}
            alt="Profile"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;


