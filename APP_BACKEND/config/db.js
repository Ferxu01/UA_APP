const mysql = require('mysql2');

const conexion = mysql.createConnection({
    host: process.env['DB_HOST'],
    database: process.env['DB_NAME'],
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD']
});

conexion.connect(err => {
    if (err) {
        console.error(`Error de conexión: ${err.stack}`);
        return;
    }

    console.log(`Conectado con el id ${conexion.threadId}`);
});

module.exports = conexion;