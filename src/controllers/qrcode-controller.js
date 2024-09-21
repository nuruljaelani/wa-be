const { client } = require("../utils/client")
const crypto = require('crypto')

const generateQrCode = async (req, res) => {
  const id = crypto.randomBytes(16).toString('hex')
  const cl = client(id)
  cl.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
  });
  cl.on('authenticated', () => {
    console.log('AUTHENTICATED');
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