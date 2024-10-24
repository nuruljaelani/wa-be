const { db } = require("../utils/db")

const getCurrentUser = async (req, res) => {

  const user = await db.user.findUnique({
    where: {
      email: req.user.email
    }
  })
  res.send({
    success: true,
    data: user
  })
}

const getPhoneNumber = async (req, res) => {
  console.log(req.user);

  const user = await db.user.findUnique({
    where: {
      email: req.user.email
    }
  })

  const number = await db.userNumber.findMany({
    where: {
      userId: user.id
    }
  })

  res.send({
    success: true,
    data: number
  })
}

module.exports = {
  getCurrentUser,
  getPhoneNumber
}