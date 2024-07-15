const express = require('express');
const router = express.Router();
const citaController = require('../controllers/citaController');

//Creamos nuestras rutas para el crud
router.post('/', citaController.agregarCitas);
router.get('/', citaController.mostrarCitas);
router.get('/:id', citaController.buscarCita);
router.put('/:id',citaController.actualizarCitas);
router.delete('/:id',citaController.eliminarCitas);

module.exports = router;