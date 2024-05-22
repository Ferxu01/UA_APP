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
const { generateSearchUrl } = require('./helpers/search.helper');

//Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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

// app.get('/test', (req, res) => {
//     const queryString = generateSearchUrl({
//         u: 'paramU',
//         t: 'paramT',
//         d: undefined,
//         m: 'paramM',
//         // fIni,
//         // fFin
//     });

//     console.log(queryString);

//     res.status(200).send({ result: 'OK' });
// });

app.post('/upload', (req, res) => {
    console.log('SUBIR IMAGEN');
    //getFile(req.files.file.data);

    let file = req.files.file;
    console.log(file);
    file.mv(`./files/${file.name}`, err => {
        if (err) return res.status(500).send({ message: err });

        return res.status(200).send({ message: 'File uploaded' });
    });
});

//Routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`API REST ejecutándose en https://localhost:${PORT}`);
});