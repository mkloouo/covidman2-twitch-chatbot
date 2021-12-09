const tmi = require('tmi.js');

const { config } = require('./config');

const opts = {
  options: {
    debug: true,
    skipMembership: true,
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
  connection: {
    port: Number(config.port),
    reconnect: true,
    secure: true,
  },
};

const client = new tmi.client(opts);

module.exports.opts = opts;
module.exports.client = client;
