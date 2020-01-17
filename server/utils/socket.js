import socketIo from "socket.io";
import { verifyToken, getLocaleText } from "./common";
import User from "Models/user";
import { userPayload } from "Utils/payload-structure";

let io = null;
export const userConnection = {};

const listenNewUser = (socket) => {
  socket.on("userConnected", (data) => {
    const { token } = data;
    const { userLocale } = data;
    const userInfo = verifyToken(token);
    if (userInfo) {
      User.getActive({ id: userInfo.userId }, { attributes: userPayload }).then(({ result }) => {
        if (result) {
          const interval = setTimeout(() => {
            socket.join(userInfo.userId);
            socket.on("disconnect", () => {
              console.log("disconnect", userInfo.userId);
              socket.leave(userInfo.userId);
            });
            io.to(userInfo.userId).emit("welcomeMessage", {
              message: getLocaleText(userLocale)("welcomeSocketMessage", { displayName: result.displayName }),
            });
            clearInterval(interval);
          }, 2000);
        } else {
          console.log("Invalid user id");
        }
      });
    }
  });
};


export const initSocket = (server) => {
  io = socketIo(server);
  io.on("connection", (socket) => {
    listenNewUser(socket);
  });

  return io;
};


const constIo = io;
export default constIo;
