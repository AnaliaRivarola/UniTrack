const express = require('express');
const router = express.Router();
const Horario = require('../models/horario.models')

// Ruta para crear un nuevo horario
router.post('/', async (req, res) => {
  const { id_transporte, hora_salida, hora_regreso, origen } = req.body;

  try {
    // Crear y guardar el horario en la base de datos
    const nuevoHorario = new Horario({
      id_transporte,
      hora_salida,
      hora_regreso,
      origen,
    });

    await nuevoHorario.save();
    res.status(201).json({ message: 'Horario creado exitosamente', horario: nuevoHorario });
  } catch (error) {
    console.error('Error al crear horario:', error);
    res.status(500).json({ message: 'Error al crear el horario' });
  }
});



module.exports = router;
