const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
router.get('/consultas', consultaController.getAllConsultas);
router.get('/consulta/:id_consulta', consultaController.getConsultaById);
router.post('/consulta', consultaController.createConsulta);
router.put('/consulta/:id_consulta', consultaController.updateConsulta);
router.delete('/consulta/:id_consulta', consultaController.deleteConsulta);


module.exports = router;
