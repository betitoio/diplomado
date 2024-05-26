const express = require('express');
const router = express.Router();
const tokenSeguimientoController = require('../controllers/tokenSeguimientoController');

router.get('/tokens', tokenSeguimientoController.getAllTokens);
router.get('/token/:id_token', tokenSeguimientoController.getTokenById);
router.post('/token', tokenSeguimientoController.createToken);
router.put('/token/:id_token', tokenSeguimientoController.updateToken);
router.delete('/token/:id_token', tokenSeguimientoController.deleteToken);

module.exports = router;
