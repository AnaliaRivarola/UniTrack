// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Importar las rutas
const usuarioRoutes = require('./routes/usuarioRoutes');
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

// Usar las rutas importadas
app.use('/api', usuarioRoutes); // Rutas para usuarios
app.use('/api', paradaRoutes); // Rutas para paradas
app.use('/api', transporteRoutes); // Rutas para transporte
app.use('/api/auth', authRoutes); // Rutas para autenticación

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
