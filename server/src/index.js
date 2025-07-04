const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Simulação de banco de dados em memória
let usuarios = [
  { id: 1, nome: "João", email: "joao@email.com" },
  { id: 2, nome: "Maria", email: "maria@email.com" },
];

// Rota GET /usuarios
app.get("/usuarios", (req, res) => {
  res.json(usuarios);
});

// Rota POST /usuarios
app.post("/usuarios", (req, res) => {
  const { nome, email } = req.body;

  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" });
  }

  const novoUsuario = {
    id: usuarios.length + 1,
    nome,
    email,
  };

  usuarios.push(novoUsuario);
  res.status(201).json(novoUsuario);
});

// Rota PUT /usuarios/:id
app.put("/usuarios/:id", (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  const usuarioIndex = usuarios.findIndex((u) => u.id === parseInt(id));

  if (usuarioIndex === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  if (!nome || !email) {
    return res.status(400).json({ erro: "Nome e email são obrigatórios" });
  }

  usuarios[usuarioIndex] = { id: parseInt(id), nome, email };
  res.json(usuarios[usuarioIndex]);
});

// Rota DELETE /usuarios/:id
app.delete("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  const usuarioIndex = usuarios.findIndex((u) => u.id === parseInt(id));

  if (usuarioIndex === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  usuarios.splice(usuarioIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
