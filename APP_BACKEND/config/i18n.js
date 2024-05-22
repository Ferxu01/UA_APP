const i18n = require('i18n');
const path = require('path');

i18n.configure({
    locales: ['es', 'en'],
    defaultLocale: 'es',
    directory: path.join(__dirname, '../assets/i18n'),
    objectNotation: true,
});

module.exports = i18n;