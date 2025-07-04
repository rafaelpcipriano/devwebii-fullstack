import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UsuarioForm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get("http://localhost:3001/usuarios").then((res) => {
        const usuario = res.data.find((u) => u.id === parseInt(id));
        if (usuario) {
          setNome(usuario.nome);
          setEmail(usuario.email);
        }
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { nome, email };

    if (id) {
      axios
        .put(`http://localhost:3001/usuarios/${id}`, payload)
        .then(() => navigate("/"));
    } else {
      axios
        .post("http://localhost:3001/usuarios", payload)
        .then(() => navigate("/"));
    }
  };

  return (
    <div>
      <h2>{id ? "Editar" : "Cadastrar"} Usuário</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default UsuarioForm;
