import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile() {
  const [userData, setUserData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newUserData, setNewUserData] = useState({});
  const [profilePicture, setProfilePicture] = useState(null);
  const userId = localStorage.getItem('ID'); 
  useEffect(() => {
  
        console.log(`${userId}`)
        console.log(`${localStorage.getItem('token')}`)
    // Fetch user profile data from the backend using the user's ID
    axios.get(`http://localhost:3000/api/user/${userId}`, {
      headers: {
        'Authorization': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'      
      },
    })
      .then((response) => {
        setUserData(response.data);
        setNewUserData({ ...response.data }); // Copy user data for editing
        console.log("dadadad",response.data)
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
      });
  }, [userId]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      // Send updated user profile data to the backend
      const response = await axios.put(`http://localhost:3000/api/user/${userId}`, newUserData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log('Profile update successful:', response.data);
      setUserData(newUserData); // Update the displayed data
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
      const response = await axios.post(`http://localhost:3000/api/user/upload-profile-picture/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
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
          {editMode ? (
            <div>
              <h3>Edit Profile</h3>
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={newUserData.name || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={newUserData.email || ''}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Bio</label>
                  <textarea
                    className="form-control"
                    name="bio"
                    value={newUserData.bio || ''}
                    onChange={handleInputChange}
                  />
                </div>
                {/* Add other user model fields for editing */}
                <button className="btn btn-primary" onClick={handleSaveClick}>
                  Save
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h3>Profile Information</h3>
              <div>Name: {userData.name}</div>
              <div>Email: {userData.email}</div>
              <div>Bio: {userData.bio}</div>
              {/* Display other user model fields here */}
              <button className="btn btn-primary" onClick={handleEditClick}>
                Edit Profile
              </button>
            </div>
          )}
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
            src={userData.profilePicture || 'default-profile-picture-url.jpg'}
            alt="Profile"
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
