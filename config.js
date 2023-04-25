// config.js
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT;
const CSRF_SECRET = process.env.CSRF_SECRET;
const COOKIES_SECRET = process.env.COOKIES_SECRET;
const CSRF_COOKIE_NAME = process.env.CSRF_COOKIE_NAME;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  paths: {
    public: path.join(__dirname, 'public'),
    views: path.join(__dirname, 'views'),
    uploads: path.join(__dirname, 'uploads'),
  },
  viewEngine: 'ejs',
  bodyParser: {
    extended: true,
  },
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  },
  csrfConfig: {
    getSecret: (req) => req.secret,
    secret: CSRF_SECRET,
    cookieName: CSRF_COOKIE_NAME,
    cookieOptions: { sameSite: false, secure: false, signed: true }, // not ideal for production, development only
    size: 64,
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  },
};
