import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const PORT = isProduction ? process.env.PORT : 3000;

app.listen(PORT, () => {
  // Open in your browser
  console.log(`listen on http://127.0.0.1:${PORT}`);
});
