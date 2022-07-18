const { sellBot } = require('./sellBot');

const { darken_my_soul } = require('./darkSouls');
const { fukrep98, covidman2 } = require('./exChannels');
const { morning, cleanup, streets, code, games } = require('./routine');
const { ad } = require('./twitch');
const { adventofcode } = require('./random');

const commands = {
  продажа: sellBot('ru'),
  продажаБота: sellBot('ru'),

  sell: sellBot(),
  sellBot: sellBot(),

  утро: morning('ru'),
  morning: morning(),

  уборка: cleanup('ru'),
  cleanup: cleanup(),

  adventofcode,
  aoc: adventofcode,

  streets: streets(),
  улица: streets('ru'),
  гулять: streets('ru'),

  code,
  dev: code,
  coding: code,

  games: games(),
  игры: games('ru'),

  darken_my_soul,
  ds: darken_my_soul,
  dark: darken_my_soul,

  fukrep98,
  fr98: fukrep98,

  covidman2: covidman2(),
  covidman: covidman2(),
  live: covidman2(),
  site: covidman2(),
  сайт: covidman2('ru'),

  ad: ad,
};

commands.help = (client, _args, [channel, tags, _message, _self]) => {
  const message = `@${tags.username}, list of commands: `;

  const listOfCommands = Object.keys(commands).reduce((acc, command) => {
    return acc + `!${command} `;
  }, message);

  client.say(channel, listOfCommands);
};

module.exports.commands = commands;
