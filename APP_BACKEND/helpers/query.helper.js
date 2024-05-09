/**
 * 
 * @param {*} table 
 * @param {*} params 
 * @param { tiene "tablename" es la tabla a la que coger los datos y "idFieldName" tiene el nombre del campo de id del parametro 'table'} param2 
 * @returns 
 */
const generateSelectSqlQuery = (table, params, joins = []) => {
    let query = `SELECT * FROM ${table}`;

    if (params) {
        const keys = Object.keys(params);
        const values = keys.map(key => params[key]);
        
        if (joins) {
            joins.map(join => {
                const { tablename, idFieldName } = join;
                return query += ` INNER JOIN ${tablename} ON ${table}.${idFieldName} = ${tablename}.id`;
            }).join(' ');
        }
        
        const strQuery = keys.map(key => `${key} = ?`).join(' AND ');
        query += ` WHERE ${strQuery}`;

        console.log(query);
        return { query, values };
    }

    return { query };
};

const generateInsertSqlQuery = (table, params) => {
    const fields = Object.keys(params).join(',');
    const values = Object.values(params).map(key => serializeParameter(key));

    const query = `INSERT INTO ${table} (${fields}) VALUES (${values})`;
    return { query, values };
};

const generateDeleteSqlQuery = (table, params) => {
    const keys = Object.keys(params);
    const values = Object.values(params);
    const strQuery = keys.map(key => `${key} = ?`).join(' AND ');

    const query = `DELETE FROM ${table} WHERE ${strQuery}`;

    return { query, values };
};

const generateUpdateSqlQuery = (table, params, conditions = undefined) => {
    const keys = Object.keys(params);
    let values = Object.values(params);
    const fields = keys.map(key => `${key} = ?`).join(',');

    const condKeys = Object.keys(conditions);
    const condValues = Object.values(conditions);
    const strQuery = condKeys.map(key => `${key} = ?`).join(' AND ');

    if (conditions)
        values = values.concat(condValues);

    const query = `UPDATE ${table} SET ${fields} WHERE ${strQuery}`;
    return { query, values };
};

const serializeParameter = (value) => {
    return typeof value === 'string' ? `'${value}'` : value;
};

const getQueryResults = (query, values, conexion) => {
    return new Promise((resolve, reject) => {
        conexion.query(query, values, (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};

const getResults = (query, conexion) => {
    return new Promise((resolve, reject) => {
        conexion.query(query, (error, results, fields) => {
            if (error) reject(error);
            resolve(results);
        });
    });
};

module.exports = {
    generateSelectSqlQuery,
    generateInsertSqlQuery,
    generateDeleteSqlQuery,
    generateUpdateSqlQuery,
    getQueryResults,
    getResults
};