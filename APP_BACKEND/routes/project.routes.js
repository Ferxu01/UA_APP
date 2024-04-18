const { Router } =  require('express');
const { projectCtrl } = require('../controllers/');
const router = Router();

router.get('/', projectCtrl.getProjects);

// Comentarios
router.get('/:id/comments', projectCtrl.getProjectComments);
router.post('/:id/comments', projectCtrl.postComment);
router.delete('/:projectId/comments/:commentId', projectCtrl.deleteComment);

// Archivos
router.get('/:id/files', projectCtrl.getFiles);
router.post('/:id/files', projectCtrl.postFile);
router.put('/:projectId/files/:fileId', projectCtrl.getFile);
router.delete('/:projectId/files/:fileId', projectCtrl.deleteFile);

module.exports = router;