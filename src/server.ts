import express, { NextFunction, Request, Response } from 'express';
import { router } from './router';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));