const adventofcode = (client, _args, [channel, tags, _message, _self]) => {
  client.say(
    channel,
    `@${tags.username}, check this out: https://adventofcode.com/2021/leaderboard`
  );
};

module.exports = { adventofcode };
