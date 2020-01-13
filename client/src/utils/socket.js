import io from 'socket.io-client';
import {getCurrentLocale} from "Utils/common";
const socket = io('http://localhost:8000',{
    extraHeaders: {
      "user-locale": getCurrentLocale(),
    }
  });

// handle all common/global socket operation in this file

export default socket;