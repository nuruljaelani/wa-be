const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

const qrcodeRouter = require("./src/routes/qrcode");
const messageRouter = require("./src/routes/message");
const authRouter = require("./src/routes/auth");
const indexRouter = require("./src/routes/index");
app.use(qrcodeRouter);
app.use(messageRouter);
app.use(authRouter);
app.use(indexRouter);

app.get("/", (req, res) => {
  res.send("Hello World!!");
})


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});