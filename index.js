const express = require("express");

const app = express();
const port = process.env.PORT || 3001;

const qrcodeRouter = require("./src/routes/qrcode");
const messageRouter = require("./src/routes/message");
app.use("/qrcode", qrcodeRouter);
app.use("/message", messageRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World!!");
})