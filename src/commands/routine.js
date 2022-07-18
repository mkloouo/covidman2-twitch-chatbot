const { i18n } = require('../../locales');

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

module.exports = {
  morning,
  cleanup,
  streets,
  code,
  games,
};
