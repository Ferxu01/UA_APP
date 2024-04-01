const { Router } = require('express');
const authCtrl = require('../controllers/auth.controller');
const router = Router();

router.post('/login', authCtrl.signIn);
router.post('/register', authCtrl.signUp);

module.exports = router;