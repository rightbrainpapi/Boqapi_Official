
const winston = require ('winston');
const logger = require( './logger')

function error (err, req, res, next){
  
    // // Log the exception    
    // logger.log('error', err.message, err )
    winston.error(err.message, err )


    res.status(500).send('Something failed.')
}

  module.exports = error;







