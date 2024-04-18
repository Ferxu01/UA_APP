const { Router } = require('express');
const { userCtrl } = require('../controllers/index');
const router = Router();

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;