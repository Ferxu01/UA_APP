const { getQueryResults, getResults } = require('../helpers/query.helper');
const conexion = require('../config/db');

const getAllDegrees = async () => {
    return await getResults(
        'SELECT * FROM estudio AS e INNER JOIN grado AS g ON e.id = g.id', 
        conexion
    );
};

const getOneDegree = async (id) => {
    const response = await getQueryResults(
        'SELECT * FROM estudio AS e INNER JOIN grado AS g ON e.id = g.id WHERE e.id = ?', 
        [id],
        conexion
    );
    
    if (response.length > 0)
        return response[0];

    return response;
};

const getAllMasters = async () => {
    return await getResults(
        'SELECT * FROM estudio AS e INNER JOIN master AS g ON e.id = g.id', 
        conexion
    );
};

const getOneMaster = async (id) => {
    const response = await getQueryResults(
        'SELECT * FROM estudio AS e INNER JOIN master AS g ON e.id = g.id WHERE e.id = ?', 
        [id], 
        conexion
    );
    if (response.length > 0)
        return response[0];

    return response;
};

module.exports = {
    getAllDegrees,
    getOneDegree,
    getAllMasters,
    getOneMaster
};