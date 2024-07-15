const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

//Creamos la ruta del crud

router.post('/', pacienteController.agregarPacientes);    
router.get('/', pacienteController.mostrarPacientes);
router.get('/:id', pacienteController.buscarPaciente);
router.put('/:id', pacienteController.actualizarPacientes);
//router.patch('/:id', pacienteController.modificarPacientes);
router.delete('/:id', pacienteController.eliminarPacientes);

module.exports = router;