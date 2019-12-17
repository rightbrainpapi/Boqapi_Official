function asyncMiddleware(handler){
    return async (req, res, next) => {
      try{
        // This varies from route to route...
       await  handler(req, res)
      }
      catch(ex){
        next(ex);
    
      }
    };
  }

  module.exports = asyncMiddleware;