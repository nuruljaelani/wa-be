const { Client, LocalAuth } = require("whatsapp-web.js");

const client = (clientId) => {
  return new Client({
    authStrategy: new LocalAuth({
      clientId: clientId,
    }),
    restartOnAuthFail: true,
    puppeteer: {
      headless: true,
      // executablePath: '/usr/bin/chromium-browser',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
      ],
    }
  });
}

module.exports = {
  client
}