import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './SocketContext';
// import './MessageBoard.css';

const MessageBoard = ({ sessionId }) => {
  const socket = useContext(SocketContext);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [socket]);

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) { // Prevent sending empty messages
      socket.emit('sendMessage', { message: inputMessage, sessionId });
      setInputMessage(''); // Clear input field after sending
    }
  };

  return (
    <div class="message-board">
      <h2>Message Board</h2>
      <div class="messages-container" style={{ overflowY: 'auto', maxHeight: '100px' }}>
        {messages.map((message, index) => (
          <div key={index} class="message">{message}</div>
        ))}
      </div>
      <div class="input-container">
        <input
          type="text"
          value={inputMessage}
          onChange={handleMessageChange}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageBoard;
