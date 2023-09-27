import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState(''); // The recipient's username
  const messageContainerRef = useRef(null);

  useEffect(() => {
    // Fetch messages between the user and the recipient from the backend
    fetchMessages();

    // Scroll to the bottom of the message container
    scrollToBottom();
  }, [recipient]);

  const fetchMessages = async () => {
    try {
      // Fetch messages from the backend based on the recipient
      const response = await axios.get(`/api/messages/${recipient}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
    }
  };

  const handleMessageInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      // Send the new message to the backend
      await axios.post(`/api/messages/${recipient}`, { content: newMessage });
      setNewMessage('');

      // Refresh the messages after sending
      fetchMessages();

      // Scroll to the bottom to see the latest message
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error.response.data);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Messaging</h2>
      <div className="row">
        <div className="col-md-4">
          <h3>Contacts</h3>
          {/* Display a list of contacts or friends here */}
        </div>
        <div className="col-md-8">
          <h3>Chat with {recipient}</h3>
          <div className="message-container" ref={messageContainerRef}>
            {messages.map((message) => (
              <div key={message._id} className="message">
                <div className={`message-bubble ${message.sender === recipient ? 'incoming' : 'outgoing'}`}>
                  {message.content}
                </div>
              </div>
            ))}
          </div>
          <div className="message-input">
            <textarea
              className="form-control"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleMessageInputChange}
            />
            <button className="btn btn-primary" onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messaging;

