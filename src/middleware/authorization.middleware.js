import TokenManager from '../utils/TokenManager.js';

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.cookies?.access_token;

  if (!accessToken) {
    return res.status(401).json({
      status: 'error',
      message: 'No access token provided'
    });
  }

  try {
    const decode = TokenManager.verifyAccessToken(accessToken);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      status: 'error',
      message: error.message
    });
  }
};

const verifyOwner = (req, res, next) => {
  verifyAccessToken(req, res, (error) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Token verification failed'
      });
    }
    if (req.user.id === req.params.userId || req.user.id === req.body.userId || req.user.role === 'ADMIN') {
      next();
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'You are not authorized'
      });
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyAccessToken(req, res, (error) => {
    if (error) {
      return res.status(401).json({
        status: 'error',
        message: 'Token verification failed'
      });
    }
    if (req.user.role === 'ADMIN') {
      next();
    } else {
      return res.status(401).json({
        status: 'error',
        message: 'You are not authorized'
      });
    }
  });
};

export { verifyAccessToken, verifyOwner, verifyAdmin };
