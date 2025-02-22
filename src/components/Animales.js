import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './Animales.css';

const Animales = () => {
    const [animales, setAnimales] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAnimales, setFilteredAnimales] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000")
            .then(response => {
                setAnimales(response.data);
                setFilteredAnimales(response.data);
            })
            .catch(() => console.log("Error al obtener los datos"));
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = animales.filter(animal => {
            return (
                animal.nombre.toLowerCase().includes(e.target.value.toLowerCase()) ||
                animal.raza.toLowerCase().includes(e.target.value.toLowerCase()) ||
                animal.edad.toString().includes(e.target.value) ||
                animal.id.toString().includes(e.target.value)
            );
        });
        setFilteredAnimales(filtered);
    };

    return (
        <div className="p-4 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-6">Lista de Animales</h1>
            <input
                type="text"
                placeholder="Buscar por nombre, raza, edad o ID..."
                value={searchTerm}
                onChange={handleSearch}
                className="p-2 mb-4 border rounded w-full"
            />
            <table className="w-full table-auto text-left bg-white">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 border">ID</th>
                        <th className="p-2 border">Nombre</th>
                        <th className="p-2 border">Raza</th>
                        <th className="p-2 border">Edad</th>
                        <th className="p-2 border">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAnimales.map((animal) => (
                        <tr key={animal.id} className="hover:bg-gray-100">
                            <td className="p-2 border">{animal.id}</td>
                            <td className="p-2 border">{animal.nombre}</td>
                            <td className="p-2 border">{animal.raza}</td>
                            <td className="p-2 border">{animal.edad} años</td>
                            <td className="p-2 border">
                                <Link to={`/mascotas/${animal.id}`} className="text-blue-500 hover:underline">
                                    Ver detalles
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Animales;
