const process = require('process');

module.exports.config = {
  port: process.env.PORT || 5000,
  api: {
    privatbank: {
      url: ' https://api.privatbank.ua/p24api',
    },
  },
};
