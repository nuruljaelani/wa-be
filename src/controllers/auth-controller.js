const { validationResult } = require("express-validator")
const { db } = require("../utils/db")
const bcrypt = require("bcrypt")
const { generateAccessToken, generateRefreshToken } = require("../utils/auth")
const jwt = require("jsonwebtoken")
const expiresIn = 30 * 60

const register = async (req, res) => {
  try {
    const result = validationResult(req)
    if (!result.isEmpty()) {
      const response = {
        success: true,
        errors: result.array()
      }
      return res.status(422).json(response)
    }

    const { name, email, password } = req.body

    await db.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password, 10)
      }
    })

    const response = {
      success: true,
      message: "Register success",
    }

    return res.status(201).json(response)
  } catch (error) {
    console.log(error);
    const response = {
      success: false,
      message: "Register failed",
      errors: error
    }

    return res.status(500).json(response)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await db.user.findUnique({
      where: {
        email
      }
    })

    if (user == null) {
      const response = {
        success: false,
        message: "invalid email or password"
      }

      return res.status(401).json(response)
    }

    const compare = bcrypt.compareSync(password, user.password)

    if (!compare) {
      const response = {
        success: false,
        message: "invalid email or password"
      }

      return res.status(401).json(response)
    }

    const payload = {
      name: user.name,
      email: user.email
    }

    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    return res.status(200).json({
      success: true,
      message: "Login success",
      accessToken,
      refreshToken,
      expiresIn: new Date().getTime() + (expiresIn * 1000),
      user: payload
    })
  } catch (error) {
    console.log(error);
    const response = {
      success: false,
      message: "Login failed",
      errors: error
    }

    return res.status(500).json(response)
  }
}

const refreshToken = async (req, res) => {
  const token = extractHeaders(req)
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    })
  }
  
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }

    const user = await db.user.findUnique({
      where: {
        email: decoded.email
      }
    })
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    }
  
    const payload = {
      name: user.name,
      email: user.email
    }
  
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)
  
    res.status(200).json({
      success: true,
      message: "Refresh token success",
      accessToken,
      refreshToken,
      expiresIn: new Date().getTime() + (expiresIn * 1000)
    })
  })
}

const extractHeaders = (req) => {
  const [type, token] = req.headers.authorization?.split(' ') ?? []
  return type === 'Bearer' ? token : undefined
}

module.exports = {
  register,
  login,
  refreshToken
}