import express from 'express';
import { doubleCsrf } from 'csrf-csrf';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import config from '../config/config.js';
import viewRouter from './routes/viewRouter.js';

const app = express();
const { paths, viewEngine, csrfConfig, cookiesSecret } = config;
app.use(express.json());
app.set('views', paths.views);
app.set('view engine', viewEngine);
app.use(express.static(paths.public));
app.use(cookieParser('secret', { signed: true }));
app.use(morgan('dev'));

const { doubleCsrfProtection } = doubleCsrf(csrfConfig);

app.get('/', (req, res) => res.redirect('/home'));

app.use('/home', viewRouter);

// Remove the route for fetching the CSRF token

// Add the route for updating the email


export default app;
