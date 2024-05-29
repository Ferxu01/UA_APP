const { Router } = require('express');
const auth = require('./auth.routes');
const user = require('./user.routes');
const studies = require('./studies.routes');
const tag = require('./tag.routes');
const project = require('./project.routes');
const favList = require('./myList.routes');

const authMid = require('../middlewares/auth.middleware').auth;

const router = Router();

//TODO INCLUIR MIDDLEWARE "authMid" TO ROUTES THAT NEEDS

router.use('/auth', auth);
router.use('/user', user);
router.use('/studies', studies);
router.use('/tag', tag);
router.use('/project', project);
router.use('/favList', authMid, favList);

module.exports = router;