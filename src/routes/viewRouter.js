// /routes/viewRouter.js

import { Router } from 'express';
import cookieParser from 'cookie-parser';

import {
  renderHome,
  renderProtected,
  renderVulnerable,
} from '../controllers/viewControllers.js';
import config from '../../config/config.js';

const router = Router();

router.use(cookieParser(config.cookiesSecret, { signed: true }));
router.get('/', renderHome);
router.get('/vulnerable', renderVulnerable);

router.get('/protected', renderProtected);

export default router;
