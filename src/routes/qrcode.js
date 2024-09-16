const express = require("express");
const router = express.Router();
const qrcodeController = require("../controllers/qrcode-controller");

router.get("/", qrcodeController.generateQrCode)

module.exports = router