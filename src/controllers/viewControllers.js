const isProduction = process.env.NODE_ENV === 'production';
const baseUrl = isProduction ? process.env.PROD_URL : process.env.DEV_URL;

export const renderHome = async function (req, res) {
  console.log('here i');
  res.render('index', { baseUrl });
};

export const renderProtected = async function (req, res) {
  console.log('here p');
  res.render('protected', { baseUrl });
};

export const renderUnprotected = async function (req, res) {
  console.log('here u');
  res.render('unprotected', { baseUrl });
};
