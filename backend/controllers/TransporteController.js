// controllers/TransporteController.js
const Transporte = require('../models/transporte.models');
const Parada = require('../models/parada.models');

// Actualiza el controlador para filtrar los transportes por parada
exports.getTransportsByParada = async (req, res) => {
  try {
    const paradaId = req.params.paradaId; // Obtener el id de la parada desde la URL
    const transports = await Transporte.find({ "paradas.parada": paradaId }) // Filtrar transportes por la parada
      .populate('paradas.parada') // Poblar las paradas
      .exec();
    res.json(transports);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener transportes para esta parada', error });
  }
};

exports.createTransporte = async (req, res) => {
  const { nombre, id_usuario, latitud, longitud, coban_id, paradas } = req.body;

  try {
    const newTransporte = new Transporte({
      nombre,
      id_usuario,
      latitud,
      longitud,
      coban_id,
      paradas,
    });

    await newTransporte.save();
    res.status(201).json(newTransporte);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear transporte', error });
  }
};
