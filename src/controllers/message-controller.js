const { client } = require("../utils/client")

const sendMessage = async (req, res) => {
  try {
    const { id, message } = req.body
    const chat = await client.sendMessage(id, message)
    res.send(chat)
  } catch (error) {
    console.log(error);
    res.send(error)
  }
}

module.exports = {
  sendMessage
}