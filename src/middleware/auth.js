const jwt = require('jsonwebtoken');
const config = process.env;

const VerificaToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['auth-token'];

  if (!token) {
    return res.status(403).send('Um token é necessario para a autenticação.');
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(403).send('Token inválido.');
  }
  return next();
};


module.exports = VerificaToken;
