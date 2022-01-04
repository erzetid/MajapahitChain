/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-shadow */
import { io } from 'socket.io-client';
const socket = io('http://localhost:3005');

socket.on('myCustomEvent', (data) => {
  console.log(data);
});
