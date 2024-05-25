const { getQueryResults, getResults, generateSelectSqlQuery, generateInsertSqlQuery, generateDeleteSqlQuery, generateUpdateSqlQuery } = require('../helpers/query.helper');
const conexion = require('../config/db');
const moment = require('moment');

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

const getOne = async (projectId, allData = false) => {
    let { query, values } = generateSelectSqlQuery('trabajo', {
        id: projectId
    });

    if (allData) {
        // Por revisar la generación automática desde generateSelectSqlQuery
        query = `SELECT t.id AS id_trabajo, u.id AS id_usuario, e.id AS id_estudio,  t.*, u.*, e.* FROM trabajo t INNER JOIN usuario u ON t.usuario = u.id INNER JOIN estudio e ON u.estudio = e.id WHERE t.id = ?`;
    }
    const results = await getQueryResults(query, values, conexion);
    return results[0];
};

const postNewProject = async ({ titulo, imagen_portada, comentarios, descripcion, usuario, estudio }) => {
    const { query, values } = generateInsertSqlQuery('trabajo', {
        titulo,
        imagen_portada,
        comentarios,
        descripcion,
        usuario,
        estudio,
        fecha: moment().format('YYYY-MM-DD'),
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
    return await getQueryResults(query, values, conexion);
};

const deleteOne = async (projectId) => {
    const { query, values } = generateDeleteSqlQuery('trabajo', {
        id: projectId,
    });
    return await getQueryResults(query, values, conexion);
};

const updateProjectViews = async (project) => {
    const { query, values } = generateUpdateSqlQuery('trabajo', {
        numVisitas: Number(project['numVisitas'])+1,
    }, 
    {
        id: project['id_trabajo']
    });
    return await getQueryResults(query, values, conexion);
};

const searchProjects = async (queryParams) => {
    //FILTRAR CLAVES QUE NO TENGAN VALOR
    const filterParams = {};
    for (const key in queryParams) {
        if (queryParams.hasOwnProperty(key) && queryParams[key] !== null 
            && queryParams[key] !== undefined && queryParams[key] !== '') {
                filterParams[key] = queryParams[key];
                //filterParams[mapTableParams[key]] = queryParams[key];
        }
    }

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

    if(filterParams['p']) {
        whereClauses.push(`LOWER(t.titulo) LIKE LOWER(CONCAT('%', ?, '%'))`);
        values.push(filterParams.p);
    }

    if (filterParams['u']) {
        joinClauses.push(`INNER JOIN usuario u ON u.id = t.usuario`);
        whereClauses.push(`t.usuario = ?`);
        values.push(filterParams.u);
    }

    if (filterParams['d']) {
        joinClauses.push(`INNER JOIN estudio e ON t.estudio = e.id`);
        joinClauses.push(`INNER JOIN grado g ON e.id = g.id`);
        whereClauses.push(`e.id = ?`);
        values.push(filterParams.d);
    } 
    else if (filterParams['m']) {
        joinClauses.push(`INNER JOIN estudio e ON t.estudio = e.id`);
        joinClauses.push(`INNER JOIN master m ON e.id = m.id`);
        whereClauses.push(`e.id = ?`);
        values.push(filterParams.m);
    }

    if (filterParams['t']) {
        joinClauses.push(`INNER JOIN etiquetado et ON t.id = et.id_trabajo INNER JOIN etiqueta eti ON et.id_etiqueta = eti.id`);
        whereClauses.push(`et.id_etiqueta = ?`);
        values.push(filterParams.t);
    }

    if (filterParams['fIni'] && filterParams['fFin']) {
        whereClauses.push(`t.fecha BETWEEN ? AND ?`);
        values.push(
            moment(filterParams.fIni).format('YYYY-MM-DD'), 
            moment(filterParams.fFin).format('YYYY-MM-DD')
        );
    }

    if (joinClauses.length > 0) {
        sql += ' ' + joinClauses.join(' ');
    }

    if (whereClauses.length > 0) {
        sql += ' WHERE ' + whereClauses.join(' AND ');
    }

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
    updateProjectViews,
    searchProjects,
};  