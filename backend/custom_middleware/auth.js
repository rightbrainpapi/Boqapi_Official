const jwt = require('jsonwebtoken');
const config = require('config');


function auth (req, res, next){
    // Reading req headers
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
      const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
      // Including it in the request.
      req.user = decodedPayload;
      next();
    }
    catch (ex){
      res.status(400).send('Invalid token.');
    }
    // console.log('Authenticating...');
   
  };

  module.exports = auth;