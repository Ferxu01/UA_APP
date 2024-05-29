const { Router } =  require('express');
const { projectCtrl, commentCtrl, fileCtrl } = require('../controllers');
const router = Router();

const authMid = require('../middlewares/auth.middleware').auth;

// Búsqueda
router.get('/find', projectCtrl.findProject);

router.get('/', projectCtrl.getProjects);
router.get('/:id', projectCtrl.getProject);
router.post('/', authMid, projectCtrl.postProject);
router.put('/:id', authMid, projectCtrl.putProject);
router.delete('/:id', authMid, projectCtrl.deleteProject)
router.put('/:id/views', projectCtrl.updateViews);

// Comentarios
router.get('/:id/comments', commentCtrl.getProjectComments);
router.post('/:id/comments', authMid, commentCtrl.postComment);
router.delete('/:projectId/comments/:commentId', authMid, commentCtrl.deleteComment);

// Archivos
router.get('/:id/files', fileCtrl.getFiles);
router.post('/:id/files', authMid, fileCtrl.postFile);
router.put('/:projectId/files/:fileId', authMid, fileCtrl.putFile);
router.delete('/:projectId/files/:fileId', authMid, fileCtrl.deleteFile);

module.exports = router;