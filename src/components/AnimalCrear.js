import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AnimalCrear() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);  // Para manejar el estado de carga
  const [error, setError] = useState('');  // Para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Activar el estado de carga

    try {
      // Realiza la solicitud POST a la API para crear el nuevo animal
      const response = await axios.post('http://localhost:5000/mascotas', {
        nombre: name,
        raza: species,
        edad: age,
      });

      // Si la creación fue exitosa, redirige a la página principal
      navigate('/');
    } catch (err) {
      // Si hay un error, muestra un mensaje
      setError('Hubo un error al crear el animal. Intenta nuevamente.');
    } finally {
      setLoading(false);  // Desactivar el estado de carga
    }
  };

  return (
    <div>
      <h2>Crear un Nuevo Animal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre del Animal</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="species">Especie</label>
          <input
            type="text"
            id="species"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="age">Edad</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creando...' : 'Crear'}
        </button>
      </form>
    </div>
  );
}

export default AnimalCrear;
