const axios = require("axios");
const config = require("./config.json");

module.exports.getTodayExchangeRates = () => {
  const date = new Date();
  date = date.setDate(date.getDate() - 1);
  const response = axios.get(
    config.api.privatbank.url +
      `/exchange_rates?json&date=${date.day}.${date.month}.${date.year}`
  );
  return response.data;
};

module.exports.sumUpTo = n => {
  let sum = 0;
  for (let i = 0; i < n + 1; i++) {
    sum += i;
  }
  return sum;
};
