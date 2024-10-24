const express = require("express");
const router = express.Router();
const qrcodeController = require("../controllers/qrcode-controller");
const verifyToken = require("../middleware/auth");

router.use(verifyToken)
router.get("/qrcode", qrcodeController.generateQrCode)

module.exports = router