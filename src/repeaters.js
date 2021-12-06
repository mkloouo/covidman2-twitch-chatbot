module.exports.getVisitSiteString = () =>
  "visit https://covidman2.live";

module.exports.repeaters = [
  {
    seconds: 1800,
    fn: (client, channel) => {
      client.say(channel, module.exports.getVisitSiteString());
    },
  },
];
