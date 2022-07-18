const { utils } = require('../utils');
const { api } = require('../api');

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

  bossesNumber = Number(bossesNumberString);
  deathsNumber = Number(deathsNumberString);

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

module.exports = { darken_my_soul };
