const utils = require("./utils");
const api = require("./api");

const darken_my_soul = async (
  client,
  [bossesNumber, deathsNumber],
  [channel, tags, _message, _self]
) => {
  if (
    bossesNumber < 0 ||
    bossesNumber >= 41 ||
    deathsNumber < 0 ||
    deathsNumber > 10000000
  ) {
    client.say(`@${tags.username}: Something went wrong with your input.`);
    return;
  }

  bossesNumber = Number(bossesNumber);
  deathsNumber = Number(deathsNumber);

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
  values.bosses.uah = (usdConversionRates.saleRate * values.bosses.usd).toFixed(
    2
  );
  values.deaths.usd = (
    values.deaths.uah / usdConversionRates.purchaseRate
  ).toFixed(2);

  client.say(
    channel,
    `Bosses earnings: ${values.bosses.uah}₴ or ${values.bosses.usd}$`
  );
  client.say(
    channel,
    `Deaths penalty: ${values.deaths.uah}₴ or ${values.deaths.usd}$`
  );
};

module.exports = {
  help: (client, _args, [channel, tags, _message, _self]) => {
    client.say(
      channel,
      `Here you go, @${tags.username}: !help !dark/darken_my_soul <bosses> <deaths>`
    );
  },
  dark: darken_my_soul,
  darken_my_soul,
};
