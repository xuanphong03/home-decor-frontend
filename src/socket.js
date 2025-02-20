import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : `${import.meta.env.VITE_SERVER_SOCKET}/chats`;

export const socket = io(URL, {
  auth: {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImVtYWlsIjoibmd4cGhvbmcwM0BnbWFpbC5jb20iLCJpYXQiOjE3MzcyMjA4MzIsImV4cCI6MTczNzIyNDQzMn0.c8a0tGzoXResUUYRsSmtYxkdXNuTDY6mP2TLzwawxgc",
  },
});
