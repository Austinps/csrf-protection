const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? process.env.PROD_URL : process.env.DEV_URL;

export const renderHome = async function (req, res) {
  res.render('index', { baseUrl });
};
