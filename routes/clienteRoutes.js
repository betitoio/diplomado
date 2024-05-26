const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.get('/clientes', clienteController.getAllClientes);
router.get('/cliente/:id_cliente', clienteController.getClienteById);
router.post('/cliente', clienteController.createCliente);
router.put('/cliente/:id_cliente', clienteController.updateCliente);
router.delete('/cliente/:id_cliente', clienteController.deleteCliente);

module.exports = router;
