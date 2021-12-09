import { sellBot } from './commands';

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
      sellBot('ru')(client, null, [channel]);
    },
  },
  {
    seconds: 3605,
    fn: (client, channel) => {
      sellBot('en')(client, null, [channel]);
    },
  },
];
