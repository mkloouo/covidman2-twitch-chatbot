const utils = require("./utils");
const api = require("./api");

const darken_my_soul = async (
  client,
  [bossesNumber, deathsNumber],
  [channel, tags, _message, _self]
) => {
  const normalizeNumber = (number) => number.trim().replace(/[^0-9-]/g, "");

  bossesNumber = Number(normalizeNumber(bossesNumber));
  deathsNumber = Number(normalizeNumber(deathsNumber.trim()));

  if (
    bossesNumber < 0 ||
    bossesNumber > 41 ||
    deathsNumber < 0 ||
    deathsNumber > 10000000
  ) {
    client.say(
      channel,
      `@${tags.username}: Wrong input: 0 > bosses > 42 and 0 > deaths > 10000000`
    );
    return;
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
    (exchangeRate) => exchangeRate.currency === "USD"
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

const fukrep98 = (client, _args, [channel, tags, _message, _self]) => {
  client.say(
    channel,
    `@${tags.username}: It was my first rising talent twitch account with more then 20 live viewers. :)`
  );
};

module.exports = {
  help: (client, _args, [channel, tags, _message, _self]) => {
    client.say(
      channel,
      `Here you go, @${tags.username}: !help !dark/darken_my_soul <bosses> <deaths> !fr98/fukrep98`
    );
  },

  ds: darken_my_soul,
  dark: darken_my_soul,
  darken_my_soul,

  fr98: fukrep98,
  fukrep98,
};
