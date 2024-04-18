const { Router } = require('express');
const auth = require('./auth.routes');
const user = require('./user.routes');
const studies = require('./studies.routes');
const tag = require('./tag.routes');
const project = require('./project.routes');
const favList = require('./myList.routes');

const router = Router();

router.use('/auth', auth);
router.use('/user', user);
router.use('/studies', studies);
router.use('/tag', tag);
router.use('/project', project);
router.use('/favList', favList);

module.exports = router;