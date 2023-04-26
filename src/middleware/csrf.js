// import { doubleCsrf } from 'csrf-csrf';

// import { csrfConfig } from '../config/config.js';
// const { invalidCsrfTokenError } = doubleCsrf(csrfConfig);

// export function generateToken(res, req) {
//   const token = req.csrfToken();
//   res.cookie('XSRF-TOKEN', token);
//   return token;
// }

// export const doubleCsrfProtection = (req, res, next) => {
//   if (req.body && req.body._csrf) {
//     const csrfToken = req.cookies['XSRF-TOKEN'];
//     const csrfDoubleSubmit = req.body._csrf;
//     if (invalidCsrfTokenError(csrfToken, csrfDoubleSubmit)) {
//       return next();
//     }
//   }
//   res.status(403).send({ error: 'Invalid CSRF token' });
// };

export const csrfErrorHandler = (error, req, res, next) => {
  if (error == invalidCsrfTokenError) {
    res.status(403).json({
      error: 'csrf validation error',
    });
  } else {
    next();
  }
};
