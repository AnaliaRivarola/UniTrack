import { useState, useEffect } from 'react';  // Asegúrate de importar ambos
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "shared-frontend/components/Login";
import AdminDashboard from '../src/views/AdminDashboard'; // Importa el Dashboard
import './App.css';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/Unitrack') 
      .then(response => {
        console.log('Datos obtenidos:', response.data);
      })
      .catch(error => {
        console.error('Error al conectar con el servidor:', error);
      });
  }, []); // Asegúrate de que useEffect esté dentro de la función del componente

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
        {/* <Route path="/admin/gestionar-transporte" element={<GestionarTransporte />} />
        <Route path="/admin/gestionar-paradas" element={<GestionarParadas />} />
        <Route path="/admin/gestionar-usuarios" element={<GestionarUsuarios />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
