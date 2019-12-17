const jwt = require('jsonwebtoken');
const config = require('config');


function auth (req, res, next){
    // Reading req headers
    const token = req.header('x-auth-token');
    if (!token) res.status(401).send('Aess denied. No token provided.');

    try {
      const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
      // Including it in the request.
      req.user = decodedPayload;
    }
    catch (ex){
      res.status(400).send('Invalid token.');
    }
    // console.log('Authenticating...');
    next();
  };

  module.exports = auth;