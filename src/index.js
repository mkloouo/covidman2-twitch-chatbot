require('dotenv').config();

(async () => {
  while (true) {
    try {
      await require('./bot').startBot();
    } catch (e) {
      console.log('[bot] error:', e);
    }
  }
})().then((e) => console.log('[retry handler] error:', e));
