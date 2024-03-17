import React, { useState } from 'react';
// import './MessageBoard.css';

const MessageBoard = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const handleMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) { // Prevent sending empty messages
      setMessages([...messages, inputMessage]);
      setInputMessage(''); // Clear input field after sending
    }
  };

  return (
    <div className="message-board">
      <h2>Message Board</h2>
      <div className="messages-container" style={{ overflowY: 'auto', maxHeight: '100px' }}> {}
        {messages.map((message, index) => (
          <div key={index} className="message">{message}</div>
        ))}
      </div>
      <div className="input-container"> {/* Add this container */}
        <input
          type="text"
          value={inputMessage}
          onChange={handleMessageChange}
          placeholder="Type a message..."
        />
        <button className="messages-button" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default MessageBoard;
