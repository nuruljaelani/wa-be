const { client } = require("../utils/client")
const crypto = require('crypto')
const QrCode = require('qrcode')

const generateQrCode = async (req, res) => {
  const id = crypto.randomBytes(16).toString('hex')
  const cl = client(id)
  cl.on('qr', (qr) => {
    console.log('QR RECEIVED');
    QrCode.toString(qr, { type: 'terminal', small: true }, (err, url) => {
      console.log(url);
      io.on('connection', (socket) => {
        socket.emit('qr', {qr, user: req.user})
      })
    })
  });
  cl.on('authenticated', () => {
    console.log('AUTHENTICATED');
    io.on('connection', (socket) => {
      socket.emit('authenticated', {user: req.user})
    })
  });
  cl.on('ready', () => {
    console.log('READY');
  });
  cl.on('auth_failure', (msg) => {
    console.log('AUTH FAILURE', msg);
  });
  cl.on('disconnected', (reason) => {
    console.log('DISCONNECTED', reason);
  });
  await cl.initialize();
}

module.exports = {
  generateQrCode
}