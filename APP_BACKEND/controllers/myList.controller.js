const { myListService } = require('../services');
const catchedAsync = require('../utils/catchedAsync');
const responseMessage = require('../utils/messages/responseMessage');

const getFavs = async (req, res, next) => {

};

const postFav = async (req, res, next) => {

};

const deleteFav = async (req, res, next) => {

};

module.exports = {
    getFavs: catchedAsync(getFavs),
    postFav: catchedAsync(postFav),
    deleteFav: catchedAsync(deleteFav),
};