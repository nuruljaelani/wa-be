const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { registerValidator, loginValidator } = require("../utils/validator");

router.post("/auth/register",registerValidator(), authController.register)
router.post("/auth/login", loginValidator(), authController.login)
router.get("/auth/refresh", authController.refreshToken)

module.exports = router