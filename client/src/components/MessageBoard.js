import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from './SocketContext';

const MessageBoard = ({ sessionId }) => {
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const receiveMessage = (message) => {
      console.log("Received message:", message); // Check if this logs correctly
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on('receiveMessage', receiveMessage);

    return () => {
      socket.off('receiveMessage', receiveMessage);
    };
  }, [socket]);

  return (
    <div className="message-board">
      <h2>Message Board</h2>
      {messages.map((message, index) => (
        <div key={index} className="message">{message}</div>
      ))}
    </div>
  );
};

export default MessageBoard;



// import React, { useState, useEffect, useContext } from 'react';
// import { SocketContext } from './SocketContext';
// // import './MessageBoard.css';

// const MessageBoard = ({ sessionId }) => {
//   const socket = useContext(SocketContext);
//   const [inputMessage, setInputMessage] = useState('');
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     // Listen for incoming messages

//     const handleNewMessage = (message) => {
//       console.log("Received message:", message);
//       setMessages(prevMessages => {
//         console.log("Current messages:", prevMessages);
//         const updatedMessages = [...prevMessages, message];
//         console.log("Updated messages:", updatedMessages);
//         return updatedMessages;
//       });
//     };

//      socket.on('receiveMessage', handleNewMessage);
    

//     return () => {
//       socket.off('receiveMessage', handleNewMessage);
//     };
//   }, [socket]);

//   const handleMessageChange = (e) => {
//     setInputMessage(e.target.value);
//   };

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) { // Prevent sending empty messages
//       socket.emit('sendMessage', { message: inputMessage, sessionId });
//       setInputMessage(''); // Clear input field after sending
//     }
//   };

//   return (
//     <div class="message-board">
//       <h2>Message Board</h2>
//       <div class="messages-container" style={{ overflowY: 'auto', maxHeight: '100px' }}>
//         {messages.map((message, index) => {
//           console.log("Rendering message:", message);
//           return <div key={index} className="message">{message}</div>;
//           // <div key={index} class={`message ${message.includes('suggests it was') ? 'suggestion' : ''}`}>
//           //   {message}
//           // </div>
//       })}
//     </div>  
//       <div class="input-container">
//         <input
//           type="text"
//           value={inputMessage}
//           onChange={handleMessageChange}
//           placeholder="Type a message..."
//         />
//         <button onClick={handleSendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default MessageBoard;
