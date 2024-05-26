const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const isAuthenticated = require('../middlewares/authMiddleware'); 

router.get('/usuarios',  usuarioController.getAllUsuarios);
router.get('/usuario/:id_usuario', usuarioController.getUsuarioById);
router.post('/usuario',  usuarioController.createUsuario);
router.put('/usuario/:id_usuario',  usuarioController.updateUsuario);
router.delete('/usuario/:id_usuario', usuarioController.deleteUsuario);
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
