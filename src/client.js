const tmi = require('tmi.js');

const { config } = require('./config');

const opts = {
  options: {
    debug: true,
    skipMembership: true,
  },
  connection: {
    server: '0.0.0.0',
    port: Number(config.port),
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

const client = new tmi.client(opts);

module.exports.opts = opts;
module.exports.client = client;
