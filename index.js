const express = require("express");
const cors = require("cors");
const { createServer } = require('node:http')
const { Server } = require('socket.io')
require("dotenv").config();

const app = express();
const httpServer = createServer(app);
global.io = new Server(httpServer)
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

const qrcodeRouter = require("./src/routes/qrcode");
const messageRouter = require("./src/routes/message");
const authRouter = require("./src/routes/auth");
const indexRouter = require("./src/routes/index");
const userRouter = require("./src/routes/user");
app.get("/", (req, res) => {
  res.send("Hello World!");
})
app.use(authRouter);
app.use(qrcodeRouter);
app.use(messageRouter);
app.use(indexRouter);
app.use(userRouter);


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('message', {
    message: 'Welcome socket!'
  });
})

httpServer.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});