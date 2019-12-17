const config = require('config');
const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi'); // as a best practice name variables with captial letter when the package is a class
const mongoose = require('mongoose');


//////////////////////////////////
//////////////////////////////////
/////////  User Schemas  ////////
//////////////////////////////////
//////////////////////////////////
const userSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
      unique: true
  },
    isGold: Boolean,
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id}, config.get("jwtPrivateKey"));
  return token;
}

// Creating a model based on the schema
const User = mongoose.model('User', userSchema);


/////////////////////////////////////
// All necessary call back functions
/////////////////////////////////////


///////////////////////////////////////
/////////// Joi Validator /////////////
///////////////////////////////////////
// user is req.body and req.body (and all the properties within req.body)
function validateUser(user) {
    // The Joi validation schema
    // Place the criteria you want validated in the object below
    const schema = Joi.object({
      name: Joi.string().min(5).max(50).required(), // by default string must be atleast a length of at least 5 characters
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(255).required(),
      isGold: Joi.boolean()
    });
  
    return schema.validate(user);
  }

    //   Exporting the modules
  module.exports.User = User;
  module.exports.validateUser = validateUser;

