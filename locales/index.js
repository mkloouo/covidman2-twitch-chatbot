const path = require('path');
const { I18n } = require('i18n');

module.exports.i18n = new I18n({
  locales: ['en', 'ru'],
  directory: path.join(__dirname, '.'),
}).__;
