import { Router } from 'express';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import {
  renderHome,
  renderUnprotected,
} from '../controllers/viewControllers.js';
import { csrfErrorHandler } from '../middleware/csrf.js';
import config from '../../config/config.js';

const { csrfConfig } = config;
const { doubleCsrfProtection, generateToken } = doubleCsrf(csrfConfig);

const router = Router();
router.use(cookieParser(config.cookiesSecret, { signed: true }));
router.get('/', renderHome);
router.get('/unprotected', renderUnprotected);

router.get(
  '/protected',
  doubleCsrfProtection,
  csrfErrorHandler,
  async (req, res, next) => {
    try {
      const token = generateToken(res, req);
      res.render('protected', { baseUrl: req.baseUrl, csrfToken: token });
    } catch (err) {
      next(err);
    }
  }
);

router.get('/csrf-token', async (req, res, next) => {
  try {
    const token = generateToken(res, req);
    res.json({ token });
  } catch (err) {
    next(err);
  }
});

router.post('/update-email', doubleCsrfProtection, async (req, res) => {
  const { email } = req.body;
  console.log('Received email:', email);
  // Do something with the email, e.g., update the database
  res.json({ success: true });
});

export default router;
