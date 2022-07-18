const config = require('./config');
const fetch = require('node-fetch');
const { StaticAuthProvider } = require('@twurple/auth');
const { ApiClient } = require('@twurple/api');

module.exports.tmiApi = {
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

const clientId = process.env.CLIENT_ID;
const accessToken = process.env.OAUTH_TOKEN.split(':')[1];
const authProvider2 = new StaticAuthProvider(clientId, accessToken);
const api = new ApiClient({ authProvider: authProvider2 });

module.exports.twitchApi = api;
