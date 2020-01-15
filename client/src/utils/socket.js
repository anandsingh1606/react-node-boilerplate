import io from 'socket.io-client';
const socket = io(process.env.SOCK_SERVER);

// handle all common/global socket operation in this file

export default socket;