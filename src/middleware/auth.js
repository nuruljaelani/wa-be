const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'] 
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.status(401).send({
      success: false,
      message: 'Unauthorized'
    })
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send({
        success: false,
        message: 'Invalid token',
        error: err
      })
    }
    req.user = user
    next()
  })
}

module.exports = verifyToken