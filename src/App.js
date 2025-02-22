import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Animales from "./components/Animales";
import AnimalDetalle from "./components/AnimalDetalle";
import AnimalCrear from './components/AnimalCrear';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Ruta principal que muestra la lista de animales */}
                <Route path="/" element={<Animales />} />

                {/* Ruta para ver los detalles de un animal específico */}
                <Route path="/mascotas/:id" element={<AnimalDetalle />} />

                {/* Ruta para crear un nuevo animal */}
                <Route path="/crear-animal" element={<AnimalCrear />} />
            </Routes>
        </Router>
    );
};

export default App;
