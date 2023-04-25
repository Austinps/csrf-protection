import path from 'path';
import { __dirname } from '../index.js';

export const renderHome = async function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
  //   res.render('index');
};
