const { twitchApi } = require('../api');

const ad = async (client, args, [channel, _tags, message, _self]) => {
  await twitchApi.channels.updateChannelInfo(process.env.BROADCASTER_ID, {
    title: `!ad !help | <ad:${args.join(
      ' '
    )}> | Music / Games / Programming / 24 yo`,
  });

  client.say(channel, 'Someone changed the ad to: ' + args.join(' '));
};

module.exports = { ad };
