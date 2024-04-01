// const config = require('../config');
// const mongojs = require('mongojs');
const moment = require('moment');
const { postLogin } = require('../services/auth.service');
// const TokenHelper = require('../helpers/token.helper');
// const PassHelper = require('../helpers/pass.helper');

// const urlDB = config.DB;
// const db = mongojs(urlDB);
// const id = mongojs.ObjectID;

const signUp = (req, res, next) => {
    // const { name, email, pass } = req.body;

    // if (name && email && pass) {
    //     db.user.findOne({ email: email }, (err, user) => {

    //         if (err) return next(err);
    //         if (!user) {
    //             PassHelper.encriptaPassword(pass).then(cryptPass => {
    //                 const nuevoUsuario = {
    //                     email: email,
    //                     displayName: name,
    //                     password: cryptPass,
    //                     signupDate: moment().unix(),
    //                     lastLogin: moment().unix()
    //                 };
                    
    //                 db.user.save(nuevoUsuario, (err, user) => {
    //                     if (err) return next(err);
                        
    //                     const token = TokenHelper.creaToken(user);
    //                     res.json({
    //                         result: 'OK',
    //                         token: token,
    //                         usuario: user
    //                     });
    //                 });
    //             });
    //         }
    //     });
    // }
};

const signIn = async (req, res, next) => {
    const { email, password } = req.body
    const response = await postLogin({ email, password });

    return res.json({ response: req.body });
    // const { email, pass } = req.body;
    
    // if (email && pass) {
    //     db.user.findOne({ email: email }, (err, user) => {
    //         if (err) return next(err);
    //         if (user) {
    //             PassHelper.comparaPassword(pass, user.password).then(equalPass => {
    //                 if (equalPass) {
    //                     db.user.updateOne({ _id: id(user._id)}, {
    //                         $set: { lastLogin: moment().unix() }
    //                     });
    
    //                     user.lastLogin = moment().unix();
    //                     const userToken = TokenHelper.creaToken(user);
    
    //                     res.json({
    //                         result: 'OK',
    //                         token: userToken,
    //                         usuario: user
    //                     });
    //                 }
    //             });
    //         }
    //     });
    // }
};

module.exports = {
    signIn,
    signUp
};