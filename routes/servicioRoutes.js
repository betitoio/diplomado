const express = require('express');
const router = express.Router();
const servicioController = require('../controllers/servicioController');

router.get('/servicios', servicioController.getAllServicios);
router.get('/servicio/:id_servicio', servicioController.getServicioById);
router.post('/servicio/', servicioController.createServicio);
router.put('/servicio/:id_servicio', servicioController.updateServicio);
router.delete('/servicio/:id_servicio', servicioController.deleteServicio);
router.get('/servicio/token/:token', servicioController.getServicioByToken);
module.exports = router;
