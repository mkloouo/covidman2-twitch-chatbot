const config = require("./config.json");
const fetch = require("node-fetch");

module.exports.api = {
  getTodayExchangeRates: async () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const response = await fetch(
      config.api.privatbank.url +
        `/exchange_rates?json&date=${date.getUTCDate()}.${
          date.getUTCMonth() + 1
        }.${date.getUTCFullYear()}`
    );

    return await response.json();
  },
};
