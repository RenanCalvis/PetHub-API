import express, { NextFunction, Request, Response } from 'express';
import { router } from './router';

const app = express();
const PORT = 3000;

app.use(express.json()); // Permite que a API aceite JSON no corpo das requisições
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
