export const postToProtected = async (req, res, next) => {
  try {
    console.log(req.body);
    return res.redirect('/valid-success.html');
    // res.json({
    //   protected_endpoint: 'CSRF protection - form processed successfully',
    // });
  } catch (err) {
    next(err);
  }
};

export const postToUnprotected = async (req, res, next) => {
  try {
    console.log(req.body);
    res.json({
      unprotected_endpoint:
        'No CSRF protection here - form processed successfully',
    });
  } catch (err) {
    next(err);
  }
};
