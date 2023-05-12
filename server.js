import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;
const URL = isProduction ? process.env.PROD_URL : process.env.DEV_URL;

app.listen(PORT, () => {
  // Open in your browser
  console.log(`listening on ${URL}:${PORT}`);
});
