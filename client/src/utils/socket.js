import io from 'socket.io-client';
const socket = io('http://localhost:8000');

// handle all common/global socket operation in this file

export default socket;