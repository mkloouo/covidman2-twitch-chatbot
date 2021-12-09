const { i18n } = require('../../locales');

module.exports.sellBot =
  (locale) =>
  (client, _args, [channel]) => {
    if (!['en', 'ru'].includes(locale)) {
      client.say(channel, `This command is not localized in ${locale}.`);
    }

    client.say(channel, i18n('sellBot', locale));
  };
