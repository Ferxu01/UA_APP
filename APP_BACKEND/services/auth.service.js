const { getQueryResults, generateSelectSqlQuery, generateInsertSqlQuery, generateUpdateSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const postLogin = async ({ email }) => {
    const { query, values } = generateSelectSqlQuery('usuario', {
        correo: email,
    });
    const results = await getQueryResults(query, values, conexion);
    return results[0];

    // const objConditions = {
    //     id: 1,
    //     nombre: 'Fernando'
    // };

    // const { query, values } = generateUpdateSqlQuery('usuario', {
    //     correo: email,
    //     pwd: password
    // }, objConditions);

    // // const test = Object.assign(values,{id:1,nombre: 'Fernando'});
    // const newValues = values.concat(Object.values(objConditions));
    // console.log(newValues);

    // return await getQueryResults(query, newValues, conexion);
    
    return new Promise((resolve, reject) => {
        conexion.query(
            'SELECT * FROM usuario WHERE correo = ?',
            [email],
             (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};

const postRegister = async ({ nombre, apellidos, curso, estudio, email, password, fechaNacimiento }) => {
    const { query, values } = generateInsertSqlQuery('usuario', {
        correo: email,
        pwd: password,
        fechaNacimiento,
        curso,
        estudio,
        nombre,
        apellidos
    });
    return await getQueryResults(query, values, conexion);
};

module.exports = {
    postLogin,
    postRegister
};