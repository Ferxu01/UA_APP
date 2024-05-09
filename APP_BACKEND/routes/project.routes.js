const { Router } =  require('express');
const { projectCtrl, commentCtrl, fileCtrl } = require('../controllers');
const router = Router();

// Búsqueda
router.get('/find', projectCtrl.findProject);

router.get('/', projectCtrl.getProjects);
router.get('/:id', projectCtrl.getProject);

// Comentarios
router.get('/:id/comments', commentCtrl.getProjectComments);
router.post('/:id/comments', commentCtrl.postComment);
router.delete('/:projectId/comments/:commentId', commentCtrl.deleteComment);

// Archivos
router.get('/:id/files', fileCtrl.getFiles);
router.post('/:id/files', fileCtrl.postFile);
router.post('/:projectId/files/:fileId', fileCtrl.putFile);
router.delete('/:projectId/files/:fileId', fileCtrl.deleteFile);

module.exports = router;