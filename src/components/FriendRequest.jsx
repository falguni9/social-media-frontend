import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FriendRequests() {
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);

  // Fetch incoming and outgoing friend requests
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/friend-requests', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your authentication token
          },
        });
        setIncomingRequests(response.data.incomingRequests);
        setOutgoingRequests(response.data.outgoingRequests);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };

    fetchFriendRequests();
  }, []);

  const acceptRequest = async (requestId) => {
    try {
      // Send a request to accept the friend request
      const response = await axios.post(`http://localhost:3000/api/friend-requests/accept/${requestId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your authentication token
        },
      });
      // Remove the accepted request from the incoming requests list
      setIncomingRequests(incomingRequests.filter((request) => request._id !== requestId));
      console.log('Friend request accepted:', response.data);
    } catch (error) {
      console.error('Error accepting friend request:', error.response.data);
    }
  };

  const rejectRequest = async (requestId) => {
    try {
      // Send a request to reject the friend request
      const response = await axios.post(`http://localhost:3000/api/friend-requests/reject/${requestId}`, null, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Add your authentication token
        },
      });
      // Remove the rejected request from the incoming requests list
      setIncomingRequests(incomingRequests.filter((request) => request._id !== requestId));
      console.log('Friend request rejected:', response.data);
    } catch (error) {
      console.error('Error rejecting friend request:', error.response.data);
    }
  };

  return (
    <div>
      <h2>Friend Requests</h2>
      <div>
        <h3>Incoming Requests</h3>
        <ul>
          {incomingRequests.map((request) => (
            <li key={request._id}>
              {request.senderName}
              <button onClick={() => acceptRequest(request._id)}>Accept</button>
              <button onClick={() => rejectRequest(request._id)}>Reject</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Outgoing Requests</h3>
        <ul>
          {outgoingRequests.map((request) => (
            <li key={request._id}>
              Request sent to {request.receiverName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default FriendRequests;
