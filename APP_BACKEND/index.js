'use strict';

//Declarations
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const i18n = require('./config/i18n');

//Config
require('dotenv').config();
const { PORT } = process.env;

const app = express();
const routes = require('./routes');
const headers = require('./middlewares/header.middleware');

//Middlewares
app.use(logger('dev'));
app.use(express.urlencoded());
app.use(express.json({ limit: '100mb' }));
app.use(helmet());
app.use(cors());
app.use(headers.allowCrossTokenOrigin);
app.use(headers.allowCrossTokenMethods);
app.use(headers.allowCrossTokenHeaders);
app.use(fileUpload());

app.param('lang', (req, res, next, lang) => {
    if (i18n.getLocales().includes(lang)) {
        i18n.setLocale(lang);
    } else {
        i18n.setLocale('es'); // O el idioma por defecto
    }
    next();
});

// Rutas con parámetro de idioma
app.use('/:lang', (req, res, next) => {
    next();
}, routes);

//Routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`API REST ejecutándose en https://localhost:${PORT}`);
});