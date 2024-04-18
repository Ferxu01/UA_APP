const { Router } = require('express');
const { tagCtrl } = require('../controllers/index');
const router = Router();

router.get('/', tagCtrl.getTags);
router.post('/tag/:tagId/project/:projectId', tagCtrl.postTagProject);
router.delete('/:tagId/project/:projectId', tagCtrl.deleteTagFromProject);

module.exports = router;