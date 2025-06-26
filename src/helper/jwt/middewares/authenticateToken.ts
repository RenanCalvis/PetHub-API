import {  Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Pega o token depois do 'Bearer'

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido' });
    return;
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    // Pode guardar o usuário validado no req para usar depois:
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: 'Token inválido ou expirado' });
    return;
  }
}
