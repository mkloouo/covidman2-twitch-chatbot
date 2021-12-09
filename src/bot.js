const { opts, client } = require('./client');
const { commands } = require('./commands');
const { repeaters } = require('./repeaters');
const { constants } = require('./constants');

module.exports.startBot = async () => {
  client.on('message', async (channel, tags, message, self) => {
    if (self || !message.startsWith('!')) return;

    const args = message.slice(1).split(' ');
    const command = args.shift().toLowerCase();

    for (const [existing_command, fn] of Object.entries(commands)) {
      if (command === existing_command) {
        return await fn(client, args, [channel, tags, message, self]);
      }
    }

    client.say(channel, 'Command not found.');
  });

  client.on('connected', (address, port) => {
    console.log(`[connected] listening on ${address}:${port}`);

    for (const repeater of repeaters) {
      const { seconds, fn } = repeater;

      setTimeout(
        () => opts.channels.forEach((channel) => fn(client, channel)),
        constants.SECOND_IN_MILLISECONDS
      );
      setInterval(
        () => opts.channels.forEach((channel) => fn(client, channel)),
        seconds * constants.SECOND_IN_MILLISECONDS
      );
    }
  });

  return client.connect();
};
