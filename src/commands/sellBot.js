const { i18n } = require('../../locales');

module.exports.sellBot =
  (locale) =>
  (client, _args, [channel]) => {
    client.say(channel, i18n('sellBot', locale));
  };
