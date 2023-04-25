// /controlers/viewController.js



export const renderHome = async function (req, res) {
  // res.sendFile(path.join(config.paths.public, 'index.html'));
  res.render('index');
};
