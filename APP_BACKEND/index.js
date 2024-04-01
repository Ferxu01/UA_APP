'use strict';

//Declarations
const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

//Config
require('dotenv').config();
const { PORT } = process.env;

const app = express();
const routes = require('./routes');
const headers = require('./middlewares/header.middleware');

//Middlewares
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(headers.allowCrossTokenOrigin);
app.use(headers.allowCrossTokenMethods);
app.use(headers.allowCrossTokenHeaders);

//Routes
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`API REST ejecutándose en https://localhost:${PORT}`);
});