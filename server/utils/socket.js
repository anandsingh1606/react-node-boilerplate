import socketIo from "socket.io";
import { verifyToken, getLocaleText } from "./common.util";
import User from "Models/user.model";
import { userPayload } from "Utils/payload-structure.util";

let io = null;
export const userConnection = {};

export const initSocket = (server) => {
  io = socketIo(server);
  io.on("connection", (socket) => {
    listenNewUser(socket);
  });

  return io;
};

const listenNewUser = (socket) => {
  console.log("socket.request.headers",socket.request.headers);
  socket.on("userConnected", (data) => {
    const token = data.token;
    const userInfo = verifyToken(token);
    if (userInfo) {
      User.getActive({ id: userInfo.userId }, { attributes: userPayload }).then(({ result }) => {
        if (result) {
          const interval = setTimeout(() => {
            socket.join(userInfo.userId);
            socket.on("disconnect", function() {
              console.log("disconnect", userInfo.userId);
              socket.leave(userInfo.userId);
            });
            io.to(userInfo.userId).emit("welcomeMessage", {
              message: getLocaleText("welcomeSocketMessage",{displayName:result.displayName}),
            });
            clearInterval(interval);
          }, 2000);
        } else{
            console.log("Invalid user id");
        }
      });
    }
  });
};

export default io;
