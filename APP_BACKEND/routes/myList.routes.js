const { Router } = require('express');
const { myListCtrl } = require('../controllers/index');
const router = Router();

router.get('/:userId', myListCtrl.getFavs);
router.post('/', myListCtrl.postFav);
router.delete('/project/:projectId/user/:userId', myListCtrl.deleteFav);

module.exports = router;