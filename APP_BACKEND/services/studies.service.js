const { getQueryResults, getResults } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getAllDegrees = async () => {
    return await getResults(
        'SELECT * FROM estudio AS e INNER JOIN grado AS g ON e.id = g.id', 
        conexion
    );
};

const getOneDegree = async (id) => {
    const results = await getQueryResults(
        'SELECT * FROM estudio AS e INNER JOIN grado AS g ON e.id = g.id WHERE e.id = ?', 
        [id],
        conexion
    );
    return results[0];
};

const getAllMasters = async () => {
    return await getResults(
        'SELECT * FROM estudio AS e INNER JOIN master AS g ON e.id = g.id', 
        conexion
    );
};

const getOneMaster = async (id) => {
    const results = await getQueryResults(
        'SELECT * FROM estudio AS e INNER JOIN master AS g ON e.id = g.id WHERE e.id = ?', 
        [id], 
        conexion
    );
    return results[0];
};

module.exports = {
    getAllDegrees,
    getOneDegree,
    getAllMasters,
    getOneMaster
};