const tmi = require("tmi.js");
const utils = require("./utils");

// Define configuration options
const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN,
  },
  channels: [process.env.CHANNEL_NAME],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on("message", onMessageHandler);

// Connect to Twitch:
client.connect();

function darkenMySoul(bossesNumber, deathsNumber) {
  const bossesValueInUsd = utils.sumUpTo(bossesNumber);
  const deathValueInUah = utils.sumUpTo(deathsNumber);
  const conversionRates = utils.getTodayExchangeRates();

  const usdConversionRates = conversionRates.exchangeRate.find(
    (exchangeRate) => exchangeRate.currency === "USD"
  );
  const bossesValueInUah = usdConversionRates.saleRate * bossesValueInUsd;
  const deathValueInUsd = deathValueInUah / usdConversionRates.purchaseRate;

  return {
    bosses: {
      uah: bossesValueInUah,
      usd: bossesValueInUsd,
    },
    deaths: {
      uah: deathValueInUah,
      usd: deathValueInUsd,
    },
  };
}

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  if (self || !message.startsWith("!")) return;

  const args = message.slice(1).split(" ");
  const command = args.shift().toLowerCase();

  if (command === "darken_my_soul") {
    if (args.length !== 2) {
      client.say(
        channel,
        `@${tags.username}, please add a currect number of bosses and deaths\nExample: !darken_my_soul 3 1000`
      );
      return;
    }

    const value = darkenMySoul(Number(args[0]), Number(args[1]));
    client.say(
      channel,
      `Ok, @${tags.username}, you wanted to know this info:
I earned ${value.bosses.uah}₴/${value.bosses.usd}$.
And I actually lost ${value.deaths.uah}₴/${value.deaths.usd}$`
    );
  }
}
