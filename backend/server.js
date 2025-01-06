// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Importar las rutas
const paradaRoutes = require('./routes/paradaRoutes');
const transporteRoutes = require('./routes/transporteRoutes');
const authRoutes = require('./routes/authRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conectado a MongoDB");
}).catch((error) => {
  console.error("Error al conectar a MongoDB:", error);
});

// Rutas
app.get('/Unitrack', (req, res) => {
  res.json({ message: '¡Conexión exitosa con el backend!' });
});

// Usar las rutas de parada y transporte
app.use('/api', paradaRoutes);
app.use('/api', transporteRoutes);
app.use('/api/auth', authRoutes);


// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
