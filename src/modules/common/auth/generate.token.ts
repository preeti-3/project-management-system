import { User } from '@prisma/client';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export default async function generateToken(user: User): Promise<string> {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET ?? 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLM';
  const expiry = process.env.JWT_EXPIRY ?? '30';

  if (!secret) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
  }
  const token = jwt.sign(payload, secret, { expiresIn: expiry });
  return token;
}
