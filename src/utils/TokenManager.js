import jwt from 'jsonwebtoken';
const TokenManager = {
  generateAccessToken: (payload) => {
    return jwt.sign({ id: payload.id, role: payload.role }, process.env.JWT_ACCESS_TOKEN_KEY, {
      algorithm: 'HS256',
      expiresIn: 60 * 60 * 12, // sehari
    });
  },

  verifyAccessToken: (access_token) => {
    return jwt.verify(access_token, process.env.JWT_ACCESS_TOKEN_KEY);
  },
};

export default TokenManager;
