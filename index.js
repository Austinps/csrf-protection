import express from 'express';
import { doubleCsrf } from 'csrf-csrf';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';
import {
  postToProtected,
  postToUnprotected,
} from './controllers/protectedController.js';
import { renderHome } from './controllers/viewControllers.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// Secrets and important params might be used with env files
// in this case you can set and change this values to test purposes
const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;

const app = express();
const { paths, viewEngine, csrfConfig, cookiesSecret } = config;
app.use(express.json());
app.set('views', paths.views);
app.set('view engine', viewEngine);
app.use(express.static(paths.public));

const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } =
  doubleCsrf(csrfConfig);

app.use(cookieParser(cookiesSecret));

// Error handling, validation error interception
const csrfErrorHandler = (error, req, res, next) => {
  if (error == invalidCsrfTokenError) {
    res.status(403).json({
      error: 'csrf validation error',
    });
  } else {
    next();
  }
};

app.get('/', renderHome);

app.get('/csrf-token', async (req, res) => {
  return res.json({
    token: generateToken(res, req),
  });
});

app.post(
  '/protected_endpoint',
  doubleCsrfProtection,
  csrfErrorHandler,
  postToProtected
);

// Try with a HTTP client (is not protected from a CSRF attack)
app.post('/unprotected_endpoint', postToUnprotected);

app.listen(PORT, () => {
  // Open in your browser
  console.log(`listen on http://127.0.0.1:${PORT}`);
});
