const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  }
});

const Genre = mongoose.model('Genre', genreSchema);



///////////////////////////////////////
/////////// Joi Validator /////////////
///////////////////////////////////////
// image is req.body and req.body (and all the properties within req.body)
function validateGenre(genre) {
  // The Joi validation schema
  // Place the criteria you want validated in the object below
  const schema = Joi.object({
    name: Joi.string().min(2).required()
  });

  return schema.validate(genre);
}


exports.genreSchema = genreSchema;
exports.Genre = Genre; 
exports.validate = validateGenre;