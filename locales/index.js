const path = require('path');
const { I18n } = require('i18n');

const i18nInstance = new I18n({
  locales: ['en', 'ru'],
  directory: path.join(__dirname, '.'),
  missingKeyFn: function (locale, value) {
    return `${value}: either command or translation (${locale}) is not covered yet`;
  },
});

module.exports.i18n = (phrase, locale = 'en') =>
  i18nInstance.__({ phrase, locale });
