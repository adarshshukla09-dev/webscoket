import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

const allsocket: User[] = [];

wss.on("connection", (socket) => {
  //     message is recieved from frontend
  //   socket.on("message", (message) => {
  //     console.log("message recieved " + message.toString());

  //     message send back to client
  //     for (const s of allsocket) {
  //       s.send(message.toString());
  //     }

  socket.on("message", (message) => {
    // @ts-ignore
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type == "join") {
      allsocket.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    let currentRoom = null;
    if (parsedMessage.type == "chat") {
      for (let i = 0; i < allsocket.length; i++) {
        if (allsocket[i]?.socket == socket) {
          currentRoom = allsocket[i]?.room;
        }
      }
    }
if (parsedMessage.type == "chat") {
  console.log(parsedMessage.payload.message);
}
    for (let i = 0; i < allsocket.length; i++) {
      if (allsocket[i]?.room == currentRoom) {
allsocket[i]?.socket.send(
  JSON.stringify({
    type: "chat",
    payload: {
      message: parsedMessage.payload.message
    }
  })
);
      }
    }
  });

 socket.on("close", () => {
  for (let i = 0; i < allsocket.length; i++) {
    if (allsocket[i]?.socket == socket) {
      allsocket.splice(i, 1);
    }
  }
 })


});
