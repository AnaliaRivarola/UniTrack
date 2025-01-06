const mongoose = require('mongoose');
// Suponiendo que ya tienes el modelo de Parada
const TransporteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  latitud: { type: String, required: true },
  longitud: { type: String, required: true },
  coban_id: { type: String, required: true },
  fecha_creacion: { type: Date, default: Date.now },
  paradas: [  // Referencia a paradas
    {
      parada: { type: mongoose.Schema.Types.ObjectId, ref: 'Parada', required: true }, // Referencia a la parada
      ubicacion: { type: String, required: true },  // Puedes seguir agregando información adicional si lo necesitas
    },
  ],
});

module.exports = mongoose.model('Transporte', TransporteSchema);
