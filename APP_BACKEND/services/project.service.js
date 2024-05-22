const { getQueryResults, getResults, generateSelectSqlQuery, generateInsertSqlQuery, generateDeleteSqlQuery, generateUpdateSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getAll = async () => {
    const { query } = generateSelectSqlQuery('trabajo', undefined, [
        {
            'tablename': 'usuario',
            'idFieldName': 'usuario'
        }
    ]);

    let sql = `SELECT * FROM trabajo t INNER JOIN usuario u ON t.usuario = u.id INNER JOIN estudio e ON u.estudio = e.id`;
    return await getResults(sql, conexion);
};

const getOne = async (projectId) => {
    const { query, values } = generateSelectSqlQuery('trabajo', {
        id: projectId
    });

    // Por revisar la generación automática desde generateSelectSqlQuery
    let sql = `SELECT * FROM trabajo t INNER JOIN usuario u ON t.usuario = u.id INNER JOIN estudio e ON u.estudio = e.id WHERE t.id = ?`;
    const results = await getQueryResults(sql, values, conexion);
    return results[0];
};

const postNewProject = async ({ titulo, imagen_portada, comentarios, descripcion, usuario }) => {
    const { query, values } = generateInsertSqlQuery('trabajo', {
        titulo,
        imagen_portada,
        comentarios,
        descripcion,
        usuario,
    });
    return await getQueryResults(query, values, conexion);
};

const updateOne = async ({ userId, projectId, data }) => {
    const { query, values } = generateUpdateSqlQuery('trabajo', {
        titulo: data['titulo'],
        comentarios: data['comentarios'],
        descripcion: data['descripcion'],
    }, 
    {
        id: projectId
    });
    console.log(query);
    return await getQueryResults(query, values, conexion);
};

const deleteOne = async (projectId) => {
    const { query, values } = generateDeleteSqlQuery('trabajo', {
        id: projectId,
    });
    return await getQueryResults(query, values, conexion);
};

// const getProjectFiles = async () => {

// };

// const postFileToProject = async () => {

// };

// const getProjectFile = async () => {

// };

// const deleteProjectFile = async () => {

// };

const searchProjects = async (queryParams) => {
    // const mapTableParams = {
    //     u: 'usuario', // Usuario
    //     t: 'id_etiqueta', // Etiqueta (en tabla 'etiquetado')
    //     d: 'nombre', // Grado (en tabla 'estudio - grado')
    //     m: 'nombre', // Master (en tabla 'estudio - master')
    // };

    //console.log(queryParams);

    //FILTRAR CLAVES QUE NO TENGAN VALOR
    const filterParams = {};
    let hasDegree = false;
    let hasMaster = false;
    for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key) && queryParams[key] !== null 
            && queryParams[key] !== undefined && queryParams[key] !== '') {
                filterParams[key] = queryParams[key];
                //filterParams[mapTableParams[key]] = queryParams[key];
        }
    }
    console.log(filterParams);

    // let sql = `SELECT * FROM trabajo t`;

    // if (filterParams['d']) // Si existe el parámetro 'GRADO'
    //     sql += `, estudio e, grado g INNER JOIN estudio es ON es.id = g.id`;
    // else if (filterParams['m']) // Si existe el parámetro 'MASTER'
    //     sql += `, estudio e, master m INNER JOIN estudio es ON es.id = m.id`;
    
    // if (filterParams['u'])
    //     sql += ` INNER JOIN usuario u ON u.id = t.usuario WHERE t.usuario = ?`;
    
    let sql = `SELECT * FROM trabajo t`;
    const joinClauses = [];
    const whereClauses = [];
    const values = [];

    if (filterParams['u']) {
        joinClauses.push(`INNER JOIN usuario u ON u.id = t.usuario`);
        whereClauses.push(`t.usuario = ?`);
        values.push(filterParams.u);
    }

    if (filterParams.d) {
        joinClauses.push(`INNER JOIN estudio e ON u.estudio = e.id`);
        joinClauses.push(`INNER JOIN grado g ON e.id = g.id`);
        whereClauses.push(`e.id = ?`);
        values.push(filterParams.d);
    } 
    else if (filterParams.m) {
        joinClauses.push(`INNER JOIN estudio e ON u.estudio = e.id`);
        joinClauses.push(`INNER JOIN master m ON e.id = m.id`);
        whereClauses.push(`e.id = ?`);
        values.push(filterParams.m);
    }

    if (filterParams.t) {
        joinClauses.push(`INNER JOIN etiquetado et ON t.id = et.id_trabajo INNER JOIN etiqueta eti ON et.id_etiqueta = eti.id`);
        whereClauses.push(`et.id_etiqueta = ?`);
        values.push(filterParams.t);
    }

    if (joinClauses.length > 0) {
        sql += ' ' + joinClauses.join(' ');
    }

    if (whereClauses.length > 0) {
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }

    // TODO: STR QUERY PARA FILTRAR POR RANGO DE FECHAS

    sql += ' ORDER BY t.numVisitas DESC';

    console.log(sql);
    console.log(values);
    return await getQueryResults(sql, values, conexion);
};

module.exports = {
    getAll,
    getOne,
    postNewProject,
    updateOne,
    deleteOne,
    // getProjectFiles,
    // postFileToProject,
    // getProjectFile,
    // deleteProjectFile,
    searchProjects,
};  