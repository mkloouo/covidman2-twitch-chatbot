module.exports.getVisitSiteString = () =>
  "might want to visit https://covidman2.live FortOne";

module.exports.repeaters = [
  {
    seconds: 1800,
    fn: (client, channel) => {
      client.say(channel, module.exports.getVisitSiteString());
    },
  },
];