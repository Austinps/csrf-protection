// import { doubleCsrf } from 'csrf-csrf';

// const { generateToken } = doubleCsrf({
//   getSecret: (req) => req.secret,
//   secret: process.env.CSRF_SECRET,
//   cookieName: process.env.CSRF_COOKIE_NAME,
//   cookieOptions: { sameSite: false, secure: false, signed: true }, // not ideal for production, development only
//   size: 64,
//   ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
// });

// export const getToken = async (req, res) => {
//   return res.json({
//     token: generateToken(res, req),
//   });
// };
