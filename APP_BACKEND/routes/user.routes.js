const { Router } = require('express');
const { userCtrl } = require('../controllers');
const { auth } = require('../middlewares/auth.middleware');
const router = Router();

router.get('/', userCtrl.getUsers);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.patch('/:id/password', userCtrl.updatePassword);
router.patch('/:id/avatar', userCtrl.updateAvatar);

module.exports = router;