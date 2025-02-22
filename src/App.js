// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useParams, useNavigate, Link } from 'react-router-dom';

import Animales from "./components/Animales";
import AnimalDetalle from "./components/AnimalDetalle";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Animales />} />
                <Route path="/mascotas/:id" element={<AnimalDetalle />} />
            </Routes>
        </Router>
    );
};

export default App;
