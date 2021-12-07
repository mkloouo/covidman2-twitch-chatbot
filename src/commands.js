const { utils } = require('./utils');
const { api } = require('./api');
const { getVisitSiteString } = require('./repeaters');
const { i18n } = require('../locales');

const darken_my_soul = async (
  client,
  [bossesNumber, deathsNumber],
  [channel, tags]
) => {
  const normalizeNumber = (number) =>
    (number || '').trim().replace(/[^0-9-]/g, '');

  bossesNumberString = normalizeNumber(bossesNumber);
  deathsNumberString = normalizeNumber(deathsNumber);

  if (bossesNumberString.length === 0 || deathsNumberString.length === 0) {
    return client.say(
      channel,
      `@${tags.username}: command usage: !darken_my_soul <bosses> <deaths>`
    );
  }

  if (
    bossesNumber < 0 ||
    bossesNumber > 41 ||
    deathsNumber < 0 ||
    deathsNumber > 10000000
  ) {
    return client.say(
      channel,
      `@${tags.username}: Wrong input: 0 > bosses > 42 and 0 > deaths > 10000000`
    );
  }

  const conversionRates = await api.getTodayExchangeRates();
  const values = {
    bosses: {
      uah: null,
      usd: utils.sumUpTo(bossesNumber),
    },
    deaths: {
      uah: utils.sumUpTo(deathsNumber),
      usd: null,
    },
  };

  const usdConversionRates = conversionRates.exchangeRate.find(
    (exchangeRate) => exchangeRate.currency === 'USD'
  );
  values.bosses.uah = Number(
    (usdConversionRates.saleRate * values.bosses.usd).toFixed(0)
  );
  values.deaths.usd = Number(
    (values.deaths.uah / usdConversionRates.purchaseRate).toFixed(0)
  );

  const actualMessage = `Bosses earnings: ${values.bosses.uah}₴ or ${values.bosses.usd}$`;
  console.log(`actualMessage: ${actualMessage}`);

  client.say(channel, actualMessage);
  client.say(
    channel,
    `Deaths penalty: ${values.deaths.uah}₴ or ${values.deaths.usd}$`
  );
};

const fukrep98 = (client, _args, [channel, tags]) => {
  client.say(
    channel,
    `@${tags.username}: It was my first rising talent twitch account with more then 20 live viewers. :)`
  );
};

const covidman2 = (client, _args, [channel, tags]) => {
  client.say(channel, `@${tags.username}: ${getVisitSiteString()}`);
};

const morning =
  (locale) =>
  (client, _args, [channel]) => {
    client.say(channel, i18n('morning', locale));
  };

const cleanup =
  (locale) =>
  (client, _args, [channel]) => {
    client.say(channel, i18n('cleanup', locale));
  };

const adventofcode = (client, _args, [channel, tags, _message, _self]) => {
  client.say(
    channel,
    `@${tags.username}, check this out: https://adventofcode.com/2021/leaderboard`
  );
};

const streets =
  (locale) =>
  (client, _args, [channel]) => {
    client.say(channel, i18n('streets', locale));
  };

const code = (client, _args, [channel]) => {
  client.say(channel, i18n('code', 'en'));
};

const games =
  (locale) =>
  (client, _args, [channel]) => {
    client.say(channel, i18n('games', locale));
  };

const commands = {
  утро: morning('ru'),
  morning: morning('en'),

  уборка: cleanup('ru'),
  cleanup: cleanup('en'),

  adventofcode,
  aoc: adventofcode,

  streets: streets('en'),
  улица: streets('ru'),
  гулять: streets('ru'),

  code,
  dev: code,
  coding: code,

  games: games('en'),
  игры: games('ru'),

  darken_my_soul,
  ds: darken_my_soul,
  dark: darken_my_soul,

  fukrep98,
  fr98: fukrep98,

  covidman2,
  covidman: covidman2,
  live: covidman2,
  site: covidman2,
};

commands.help = (client, _args, [channel, tags, _message, _self]) => {
  const message = `@${tags.username}, list of commands: `;

  const listOfCommands = Object.keys(commands).reduce((acc, command) => {
    return acc + `!${command} `;
  }, message);

  client.say(channel, listOfCommands);
};

module.exports.commands = commands;
