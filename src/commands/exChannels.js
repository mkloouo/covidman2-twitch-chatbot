const { getVisitSiteString } = require('../repeaters');

const fukrep98 = (client, _args, [channel, tags]) => {
  client.say(
    channel,
    `@${tags.username}: It was my first rising talent twitch account with more then 20 live viewers. :)`
  );
};

const covidman2 =
  (locale) =>
  (client, _args, [channel, tags]) => {
    client.say(channel, `@${tags.username}: ${getVisitSiteString(locale)}`);
  };

module.exports = { fukrep98, covidman2 };
