const generateSearchUrl = (params) => {
    const keys = Object.keys(params);

    const queryString = keys.map(
        key => key && (params[key] !== undefined && params[key] !== null && params[key] !== '') ? `${key}=${params[key]}` : ''
    ).filter(param => param !== '').join('&');
    return `?${queryString}`;
};

module.exports = {
    generateSearchUrl,
};