const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');

//Creamos la ruta del crud

router.post('/', doctorController.agregarDoctores);    
router.get('/', doctorController.mostrarDoctores);
router.get('/:id', doctorController.buscarDoctor);
router.put('/:id', doctorController.actualizarDoctores);
//router.patch('/:id', doctorController.modificarPacientes);
router.delete('/:id', doctorController.eliminarDoctores);

module.exports = router;