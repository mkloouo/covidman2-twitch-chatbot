const { i18n } = require('../locales');
const { sellBot } = require('./commands/sellBot');

module.exports.getVisitSiteString = (locale) => i18n('visitCovidSite', locale);

module.exports.repeaters = [
  {
    seconds: 1800,
    fn: (client, channel) => {
      client.say(
        channel,
        'Every subscriber, VIP or MOD get free TTS from their messages in chat. Welcome :)'
      );
    },
  },
  // {
  //   seconds: 1800,
  //   fn: (client, channel) => {
  //     client.say(channel, module.exports.getVisitSiteString('ru'));
  //   },
  // },
  // {
  //   seconds: 1810,
  //   fn: (client, channel) => {
  //     client.say(channel, module.exports.getVisitSiteString());
  //   },
  // },
  // {
  //   seconds: 3600,
  //   fn: (client, channel) => {
  //     sellBot('ru')(client, null, [channel]);
  //   },
  // },
  // {
  //   seconds: 3605,
  //   fn: (client, channel) => {
  //     sellBot()(client, null, [channel]);
  //   },
  // },
];
