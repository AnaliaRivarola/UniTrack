import React, { useState, useEffect } from 'react';
import '../styles/CrearHorario.css';
import axios from 'axios';

export const CrearHorario = () => {
  const [transportes, setTransportes] = useState([]); // Lista de transportes
  const [formData, setFormData] = useState({
    id_transporte: '',
    hora_salida: '',
    hora_regreso: '',
    origen: '',
  });

  // Obtener transportes al montar el componente
  useEffect(() => {
    const fetchTransportes = async () => {
      try {
        console.log('Transporte ID:', transporteId);  // Verifica que el ID no sea null o undefined
        const response = await axios.get(`http://localhost:5000/api/transportes/${transporteId}`);
        setTransportes(response.data);
      } catch (error) {
        console.error('Error al obtener transportes:', error.response || error.message || error);
      }
    };
  
    fetchTransportes();
  }, [transporteId]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.id_transporte || formData.id_transporte.length !== 24) {
      alert("Seleccione un transporte válido.");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/horarios', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error al crear horario:', error.response?.data || error.message);
    }
  };

  return (
    <div id="crear-horario-container">
      <h2 id="crear-horario-title">Crear Horario</h2>
      <form id="crear-horario-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_transporte">Transporte:</label>
          <select
            id="id_transporte"
            name="id_transporte"
            value={formData.id_transporte}
            onChange={handleChange}
            required
            className="input-field"
          >
            <option value="">Seleccione un transporte</option>
            {transportes.map((transporte) => (
              <option key={transporte._id} value={transporte._id}>
                {transporte.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="hora_salida">Hora de salida:</label>
          <input
            type="time"
            id="hora_salida"
            name="hora_salida"
            value={formData.hora_salida}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="hora_regreso">Hora de regreso:</label>
          <input
            type="time"
            id="hora_regreso"
            name="hora_regreso"
            value={formData.hora_regreso}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="origen">Origen:</label>
          <input
            type="text"
            id="origen"
            name="origen"
            value={formData.origen}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>

        <button type="submit" id="crear-horario-btn">Crear Horario</button>
      </form>
    </div>
  );
};
