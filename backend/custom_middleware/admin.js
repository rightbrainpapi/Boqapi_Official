function admin (req, res, next){
    // This happens after the auth middleware function
    // 401 Unauthorized
    // 403 Forbidden
    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
   
  };

  module.exports = admin;