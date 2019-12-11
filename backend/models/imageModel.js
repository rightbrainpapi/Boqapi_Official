const Joi = require('@hapi/joi'); // as a best practice name variables with captial letter when the package is a class
const mongoose = require('mongoose');

//////////////////////////////////
//////////////////////////////////
/////////  Image Schemas  ////////
//////////////////////////////////
//////////////////////////////////
const imageSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true,
        minlength: 5,
        maxlength: 10
    },
    category: {
        type: String,
        required: true,
        enum: ["photo", "gif", "video"], // When creating a image the categroy we set needs to be one of these values.
        lowercase: true,

    },
    user: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length > 0; //v is short for value
            },
            message: "Your content should have at least one tag."
        }
    },
    image: String,
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished; }, // If isPublished is true then the price will be required
        min: 10,
        max: 200,
    }
});

// Creating a model based on the schema
const Image = mongoose.model('Image', imageSchema);

/////////////////////////////////////
// All necessary call back functions
/////////////////////////////////////


///////////////////////////////////////
/////////// Joi Validator /////////////
///////////////////////////////////////
// image is req.body and req.body (and all the properties within req.body)
function validateImage(image) {
    // The Joi validation schema
    // Place the criteria you want validated in the object below
    const schema = Joi.object({
      name: Joi.string().min(3).max(10).required(), // by default string must be atleast a length of at least 5 characters
      user: Joi.string(),
      image: Joi.string(),
      category: Joi.string(),
      tags: Joi.string(),
      isPublished: Joi.boolean(),
      price: Joi.number().min(10).max(200)
    });
  
    return schema.validate(image);
  }

  
//   Exporting the modules
module.exports.Image = Image;
module.exports.validateImage = validateImage;