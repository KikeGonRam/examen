// src/components/AnimalDetalle.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AnimalDetalle = () => {
    const { id } = useParams(); // Obtiene el ID de la mascota desde la URL
    const navigate = useNavigate();
    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        nombre: "",
        raza: "",
        edad: "",
    });

    useEffect(() => {
        // Obtener los detalles de la mascota
        axios.get(`http://localhost:5000/${id}`)
            .then(response => {
                setAnimal(response.data);
                setFormData(response.data); // Rellena el formulario con los datos actuales
                setLoading(false);
            })
            .catch(error => {
                setError("Error al obtener los datos");
                setLoading(false);
            });
    }, [id]);

    // Eliminar mascota
    const eliminarMascota = () => {
        axios.delete(`http://localhost:5000/mascotas/${id}`)
            .then(() => {
                alert("Mascota eliminada con éxito");
                navigate("/"); // Redirige a la lista de animales
            })
            .catch(() => alert("Error al eliminar la mascota"));
    };

    // Manejo del cambio en el formulario
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Actualizar mascota
    const actualizarMascota = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/mascotas/${id}`, formData)
            .then(() => {
                alert("Mascota actualizada correctamente");
                setEditMode(false);
            })
            .catch(() => alert("Error al actualizar la mascota"));
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Detalles de la Mascota</h1>
            {!editMode ? (
                <div>
                    <p><strong>Nombre:</strong> {animal.nombre}</p>
                    <p><strong>Raza:</strong> {animal.raza}</p>
                    <p><strong>Edad:</strong> {animal.edad} años</p>
                    <button onClick={() => setEditMode(true)}>Editar</button>
                    <button onClick={eliminarMascota} style={{ marginLeft: "10px", color: "red" }}>Eliminar</button>
                </div>
            ) : (
                <form onSubmit={actualizarMascota}>
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    <label>Raza:</label>
                    <input type="text" name="raza" value={formData.raza} onChange={handleChange} required />
                    <label>Edad:</label>
                    <input type="number" name="edad" value={formData.edad} onChange={handleChange} required />
                    <button type="submit">Guardar Cambios</button>
                    <button onClick={() => setEditMode(false)} style={{ marginLeft: "10px" }}>Cancelar</button>
                </form>
            )}
        </div>
    );
};

export default AnimalDetalle;
