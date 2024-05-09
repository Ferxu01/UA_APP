const { Router } = require('express');
const { tagCtrl } = require('../controllers');
const router = Router();

router.get('/', tagCtrl.getTags);
router.post('/', tagCtrl.postTag);
router.get('/project/:id', tagCtrl.getProjectTags);
router.put('/:tagId/project/:projectId', tagCtrl.postTagProject);
router.delete('/:tagId/project/:projectId', tagCtrl.deleteTagFromProject);

module.exports = router;