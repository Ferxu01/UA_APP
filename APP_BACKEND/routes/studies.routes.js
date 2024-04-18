const { Router } = require('express');
const { studiesCtrl } = require('../controllers/index');
const router = Router();

router.get('/degree', studiesCtrl.getDegrees);
router.get('/degree/:id', studiesCtrl.getDegree);
router.get('/master', studiesCtrl.getMasters);
router.get('/master/:id', studiesCtrl.getMaster);

module.exports = router;