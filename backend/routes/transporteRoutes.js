// routes/transporteRoutes.js
const express = require('express');
const router = express.Router();
const TransporteController = require('../controllers/TransporteController');

// Ruta para obtener transportes con paradas
router.get('/transports/:paradaId', TransporteController.getTransportsByParada);

// Ruta para crear un transporte
router.post('/transports', TransporteController.createTransporte);

module.exports = router;
