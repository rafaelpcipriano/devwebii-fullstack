import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsuariosList from "./components/UsuariosList";
import UsuarioForm from "./components/UsuarioForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UsuariosList />} />
        <Route path="/novo" element={<UsuarioForm />} />
        <Route path="/editar/:id" element={<UsuarioForm />} />
      </Routes>
    </Router>
  );
}

export default App;
