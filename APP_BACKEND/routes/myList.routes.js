const { Router } = require('express');
const { myListCtrl } = require('../controllers/index');
const router = Router();

router.get('/', myListCtrl.getFavs);
router.post('/', myListCtrl.postFav);
router.delete('/project/:id', myListCtrl.deleteFav);

module.exports = router;