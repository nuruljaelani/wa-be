const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const verifyToken = require("../middleware/auth");

router.use(verifyToken)
router.get("/users/me", userController.getCurrentUser)
router.get("/users/number", userController.getPhoneNumber)

module.exports = router