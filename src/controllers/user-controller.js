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

  try {
    const { page, limit } = req.query
    const pageNumber = page ? +page : 1
    const pageSize = limit ? +limit : 10
    const offset = (pageNumber - 1) * pageSize
    const user = await db.user.findUnique({
      where: {
        email: req.user.email
      }
    })

    const data = await db.userNumber.findMany({
      where: {
        userId: user.id
      },
      skip: offset,
      take: pageSize
    })

    const totalRows = await db.userNumber.count({})
    const totalPages = Math.ceil(totalRows / pageSize)
    const hasNextPage = pageNumber < totalPages

    return res.send({
      success: true,
      data: data,
      totalRows,
      totalPages,
      hasNextPage
    })
  } catch (error) {
    res.status(500).send({
      success: false,
      error
    })
  }
}

module.exports = {
  getCurrentUser,
  getPhoneNumber
}