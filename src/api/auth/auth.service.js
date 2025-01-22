import bcrypt from 'bcrypt';
import TokenManager from '../../utils/TokenManager.js';
import { getUserByEmail } from '../users/user.repository.js';
import UnauthorizedError from '../../exception/UnauthorizedError.js';

const loginUserService = async (email, password) => {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new UnauthorizedError('Email atau password salah');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw new UnauthorizedError('Email atau password salah');
  }

  const accessToken = TokenManager.generateAccessToken({
    id: user.id,
    role: user.role,
    company: user.company,
  });

  return { accessToken };
};

export { loginUserService };