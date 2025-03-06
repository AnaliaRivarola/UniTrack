// routes/transporteRoutes.js
const express = require('express');
const router = express.Router();
const TransporteController = require('../controllers/TransporteController');

// Crear un transporte
router.post('/', TransporteController.createTransporte);

// Obtener todos los transportes
router.get('/', TransporteController.getAllTransportes);

// Obtener un transporte por ID
router.get('/:id', TransporteController.getTransporteById);

// Actualizar un transporte
router.put('/:id', TransporteController.updateTransporte);

// Eliminar un transporte
router.delete('/:id', TransporteController.deleteTransporte);

module.exports = router;
