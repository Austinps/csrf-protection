import { doubleCsrf } from 'csrf-csrf';
import config from '../../config/config.js';

const { csrfConfig } = config;
const { invalidCsrfTokenError } = doubleCsrf(csrfConfig);

export const csrfErrorHandler = (error, req, res, next) => {
  if (error == invalidCsrfTokenError) {
    res.status(403).json({
      error: 'csrf validation error',
    });
  } else {
    next();
  }
};
