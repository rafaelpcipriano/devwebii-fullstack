import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const carregarUsuarios = () => {
    axios
      .get("http://localhost:3001/usuarios")
      .then((res) => setUsuarios(res.data))
      .catch((err) => console.error(err));
  };

  const deletarUsuario = (id) => {
    if (window.confirm("Deseja realmente excluir este usuário?")) {
      axios
        .delete(`http://localhost:3001/usuarios/${id}`)
        .then(() => carregarUsuarios());
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <div>
      <h2>Lista de Usuários</h2>
      <button onClick={() => navigate("/novo")}>Novo Usuário</button>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>
            {u.nome} — {u.email}{" "}
            <button onClick={() => navigate(`/editar/${u.id}`)}>Editar</button>{" "}
            <button onClick={() => deletarUsuario(u.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UsuariosList;
