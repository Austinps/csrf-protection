import { doubleCsrf } from 'csrf-csrf';
import config from '../../config/config.js';

// /controllers/viewCOntroller.js
const { csrfConfig } = config;
const { generateToken } = doubleCsrf(csrfConfig);
const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? process.env.PROD_URL : process.env.DEV_URL;

export const renderHome = async function (req, res) {
  res.render('index', { baseUrl });
};

export const renderProtected = async (req, res, next) => {
  try {
    const token = generateToken(res, req);
    console.log('dog', token);
    res.render('protected', { baseUrl: req.baseUrl, csrfToken: token });
  } catch (err) {
    next(err);
  }
};

export const renderVulnerable = async function (req, res) {
  res.render('vulnerable', { baseUrl });
};
