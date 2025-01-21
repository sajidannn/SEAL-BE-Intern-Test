import ClientError from './ClientError.js';

class UnauthorizedError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'UnauthorizedError';
  }
}

export default UnauthorizedError;
