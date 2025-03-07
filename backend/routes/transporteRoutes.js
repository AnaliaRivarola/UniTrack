// routes/transporteRoutes.js
const express = require('express');
const router = express.Router();
const TransporteController = require('../controllers/TransporteController');
const Transporte = require('../models/transporte.models');
// Crear un transporte
router.post("/transportes", async (req, res) => {
    try {
      const { nombre, id_usuario, coban_id, paradas } = req.body;
      const nuevoTransporte = new Transporte({ nombre, id_usuario, coban_id, paradas });
  
      await nuevoTransporte.save();
      res.status(201).json({ message: "Transporte creado exitosamente" });
    } catch (error) {
      console.error("Error al crear transporte:", error);
      res.status(500).json({ message: "Error del servidor" });
    }
  });

// Obtener todos los transportes
router.get('/transportes', async (req, res) => {
    try {
      const transportes = await Transporte.find(); // Consulta en la base de datos
      res.json(transportes);
    } catch (error) {
      console.error('Error al obtener transportes:', error);
      res.status(500).json({ message: 'Error del servidor al obtener transportes' });
    }
  });

// Obtener un transporte por ID
router.get('/:id', TransporteController.getTransporteById);

// Actualizar un transporte
router.put('/:id', TransporteController.updateTransporte);

// Eliminar un transporte
router.delete('/:id', TransporteController.deleteTransporte);

module.exports = router;
