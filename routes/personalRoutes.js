const express = require('express');
const router = express.Router();
const personalController = require('../controllers/personalController');

router.get('/personales', personalController.getAllPersonal);
router.get('/personal/:id_personal', personalController.getPersonalById);
router.post('/personal', personalController.createPersonal);
router.put('/personal/:id_personal', personalController.updatePersonal);
router.delete('/personal/:id_personal', personalController.deletePersonal);

module.exports = router;
