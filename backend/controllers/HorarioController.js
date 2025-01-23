const Horario = require('../models/horario.models')

// Crear un nuevo horario
const crearHorario = async (req, res) => {
  const { id_transporte, hora_salida, hora_regreso, origen } = req.body;

  try {
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
};

module.exports = { crearHorario };
