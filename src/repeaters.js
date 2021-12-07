const { i18n } = require('../locales');

module.exports.getVisitSiteString = () => 'visit https://covidman2.live';

module.exports.repeaters = [
  {
    seconds: 1800,
    fn: (client, channel) => {
      client.say(channel, module.exports.getVisitSiteString());
    },
  },
  {
    seconds: 3600,
    fn: (client, channel) => {
      client.say(channel, i18n('sell', 'ru'));
    },
  },
  {
    seconds: 3605,
    fn: (client, channel) => {
      client.say(channel, i18n('sell'));
    },
  },
];
