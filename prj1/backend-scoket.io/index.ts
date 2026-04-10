import express from "express"
import http from "http"
import cors from "cors"
import { Server, Socket } from "socket.io"
const app = express()
const server = http.createServer(app)
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const io = new Server(server,
    {
        cors: {
            origin: "http://localhost:5173",
            credentials: true
        },
    
    }
)

// whenever frontend user connect
io.on("connection", (socket) => {
  socket.on("sendInput", (data) => {
    console.log(data);
  });
});
// Add a basic route
app.get('/', (req:any, res:any) => {
    res.send("Server is responding!")
})

server.listen(4000, () => {
    console.log("Server up on http://localhost:4000")
})