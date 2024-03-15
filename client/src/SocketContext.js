import React, { createContext } from 'react';
import socketIOClient from 'socket.io-client';

export const SocketContext = createContext();

const ENDPOINT = "http://127.0.0.1:4000";
const socket = socketIOClient(ENDPOINT);

export const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={socket}>
    {children}
  </SocketContext.Provider>
);
