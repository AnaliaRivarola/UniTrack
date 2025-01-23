import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/GestionarHorario.css';
import { Link } from 'react-router-dom';

const GestionarHorarios = () => {
  const [horarios, setHorarios] = useState([]);

  // Obtener los horarios al montar el componente
  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/horarios');
        setHorarios(response.data);
      } catch (error) {
        console.error('Error al obtener los horarios:', error);
      }
    };

    fetchHorarios();
  }, []);

  // Eliminar un horario
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/horarios/${id}`);
      setHorarios(horarios.filter(horario => horario._id !== id));
      alert('Horario eliminado');
    } catch (error) {
      console.error('Error al eliminar el horario:', error);
      alert('Hubo un problema al eliminar el horario');
    }
  };

  return (
    <div id="gestion-horarios-container">
      <h2 id="gestion-horarios-title">Gestionar Horarios</h2>
      <div id="crear-horario-btn-container">
        <Link to="/admin/crear-horario">
          <button id="crear-horario-btn">Crear Horario</button>
        </Link>
      </div>
      <table id="tabla-horarios">
        <thead>
          <tr>
            <th>Transporte</th>
            <th>Hora de Salida</th>
            <th>Hora de Regreso</th>
            <th>Origen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {horarios.map((horario) => (
            <tr key={horario._id}>
              <td>{horario.transporte.nombre}</td>
              <td>{horario.hora_salida}</td>
              <td>{horario.hora_regreso}</td>
              <td>{horario.origen}</td>
              <td>
                <Link to={`/editar-horario/${horario._id}`}>
                  <button id={`editar-horario-btn-${horario._id}`} className="action-btn">Editar</button>
                </Link>
                <button id={`eliminar-horario-btn-${horario._id}`} className="action-btn" onClick={() => handleDelete(horario._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GestionarHorarios;
