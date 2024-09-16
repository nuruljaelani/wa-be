const express = require("express");

const app = express();
const port = 3000;

const qrcodeRouter = require("./src/routes/qrcode");
app.use("/qrcode", qrcodeRouter);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});