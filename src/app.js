import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import config from '../config/config.js';
import viewRouter from './routes/viewRouter.js';
import apiRouter from './routes/apiRouter.js';
import { handle404, handleErrors } from './middleware/errors.js';

const app = express();
const { paths, viewEngine } = config;
app.use(express.json());
app.set('views', paths.views);
app.set('view engine', viewEngine);
app.use(express.static(paths.public));
app.use(cookieParser('secret', { signed: true }));
app.use(morgan('dev'));

app.get('/', (_, res) => res.redirect('/view'));

app.use('/view', viewRouter);
app.use('/api', apiRouter);

app.use(handle404);
app.use(handleErrors);

export default app;
