import { Router } from 'express';
import { doubleCsrf } from 'csrf-csrf';
import config from '../../config/config.js';
import { csrfErrorHandler } from '../middleware/csrf.js';

const { csrfConfig } = config;
const { doubleCsrfProtection } = doubleCsrf(csrfConfig);

const router = Router();

const updateEmail = async (req, res) => {
  const { email } = req.body;
  console.log('Received email:', email);
  // Do something with the email, e.g., update the database
  res.json({ success: true });
};

router.post(
  '/protected-update',
  doubleCsrfProtection,
  csrfErrorHandler,
  updateEmail
);
router.post('/vulnerable-update', updateEmail);

export default router;
