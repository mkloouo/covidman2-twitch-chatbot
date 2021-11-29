const tmi = require("tmi.js");
const utils = require("./utils");

// Define configuration options
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
    reconnect: true,
  },
};

// Create a client with our options
const client = new tmi.client(opts);
const commands = require('./commands');

module.exports.startBot = () => {
  // Register our event handlers (defined below)
  client.on("message", async (channel, tags, message, self) => {
    if (self || !message.startsWith("!")) return;

    const args = message.slice(1).split(" ");
    const command = args.shift().toLowerCase();

    for (const [existing_command, fn] of Object.entries(commands)) {
      if (command === existing_command) {
        await fn(client, args, [channel, tags, message, self]);
      }
    }
  });
  client.on("connected", (addr, port) => {
    console.log(`* Connected to ${addr}:${port}`);
  });

  // Connect to Twitch:
  client.connect();
};
