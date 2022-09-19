import { UnauthenticatedError } from '../errors/errors.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId);
    if (!user) {
      throw new UnauthenticatedError('Authentication Invalid');
    }
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

export default auth;
