const tmi = require('tmi.js');
const opts = {
  options: {
    debug: false,
    skipMembership: true,
  },
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
  connection: {
    reconnect: true,
  },
};

const client = new tmi.client(opts);

module.exports.opts = opts;
module.exports.client = client;
