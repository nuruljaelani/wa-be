const { body } = require("express-validator")

const registerValidator = () => {
  return [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ]
}

const loginValidator = () => {
  return [
    body("email").isEmail().notEmpty(),
    body("password").notEmpty()
  ]
}

module.exports = {
  registerValidator,
  loginValidator
}