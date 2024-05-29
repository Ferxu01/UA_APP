const { Router } = require('express');
const { tagCtrl } = require('../controllers');
const router = Router();

const authMid = require('../middlewares/auth.middleware').auth;

router.get('/', tagCtrl.getTags);
router.post('/', authMid, tagCtrl.postTag);
router.get('/project/:id', tagCtrl.getProjectTags);
router.put('/:tagId/project/:projectId', authMid, tagCtrl.postTagProject);
router.delete('/:tagId/project/:projectId', authMid, tagCtrl.deleteTagFromProject);

module.exports = router;