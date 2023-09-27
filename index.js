const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./src/utils/dbConnect");
const productRoute = require("./src/routes/productRoute");
const usersRoute = require("./src/routes/usersRoute");
const feedbackRoute = require("./src/routes/feedbackRoute");
const messagesRoute = require("./src/routes/messagesRoute");
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 5000;
require("dotenv").config();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());
dbConnect();

const io = new Server(server, {
  cors: {
    origin: "https://quickvara.com",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
 

  socket.on("set-email", (getReceiverEmail) => {
    socket.join(getReceiverEmail);
  });

  socket.on("send-message", async (message) => {
    io.to(message.senderEmail).emit("received-message", message);
    io.to(message.receiverEmail).emit("received-message", message); // Sender // Sender
    // socket.broadcast.emit("notification", message);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected`);
  });
});

app.use("/api/v1/product", productRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/feedback", feedbackRoute);
app.use("/api/v1/messages", messagesRoute);

app.get("/", (req, res) => {
  res.send("QuickVara start");
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
