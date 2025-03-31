import express, { NextFunction, Request, Response } from 'express';
import { router } from './router';

const app = express();
const PORT = 3000;

app.use(express.json()); // Permite que a API aceite JSON no corpo das requisições
app.use(router);

let users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

// 📌 Rota GET → Retorna todos os usuários
app.get('/users', (req, res) => {
  res.json(users);
});

// 📌 Rota GET → Retorna um usuário pelo ID
app.get('/users/:id', (req: Request, res: Response): any => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
});

// 📌 Rota POST → Adiciona um novo usuário
app.post('/users', (req: Request, res: Response) => {
  const { name } = req.body;
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// 📌 Rota PUT → Atualiza um usuário pelo ID
app.put('/users/:id', (req: Request, res: Response): any => {
  const id = Number(req.params.id);
  const { name } = req.body;
  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1)
    return res.status(404).json({ error: 'Usuário não encontrado' });

  users[userIndex].name = name;
  res.json(users[userIndex]);
});

// 📌 Rota DELETE → Remove um usuário pelo ID
app.delete('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  users = users.filter((u) => u.id !== id);
  res.json({ message: 'Usuário removido' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
