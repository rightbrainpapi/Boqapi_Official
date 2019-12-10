const Joi = require('@hapi/joi'); // as a best practice name variables with captial letter when the package is a class
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// This entire file might change to gifs to insure better organization.
// There will be a file like this for gifs, images, & videos.

//////////////////////////////////
//////////////////////////////////
/////////  Image Schemas  ////////
//////////////////////////////////
//////////////////////////////////
const imageSchema = new mongoose.Schema({
    name: {
        type:String, 
        // required: true,
        // minlength: 5,
        // maxlength: 25
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




///////////////////////////////////
//////Get All Route handlers///////
//////////////////////////////////
// Defining a Route
// arg 1: the Uri
// arg 2: the call back function that has parameters of req and res 
    
router.get('/', async (req, res)=>{
    const images = await Image.find().sort('name');
    res.send(images);
});


/////////////////////////////
//////// Post Request ///////
/////////////////////////////


router.post('/', async (req, res) => {
    // Input validation using Joi
    const { error } = validateImage(req.body); // This is object destructuring. since we are interested in only 1 property we can use this notation to just grab it

    // 404 Error if Id doesnt Exist. Then Return.
    if (error) return res.status(400).send(error.details[0].message);

    let image = new Image ({
        name: req.body.name,
        user: req.body.user,
        image: req.body.image,
        category: req.body.category,
        tags: req.body.tags,
        isPublished: req.body.isPublished,
        price: req.body.price
    });
    image = await image.save();

    // Send it back in the body of the res
    res.send(image);
});

/////////////////////////////
//////// Put Request ///////
/////////////////////////////

router.put('/:id', async  (req, res)=>{
    // Input validation using Joi
    const { error } = validateImage(req.body); // This is object destructuring. since we are interested in only 1 property we can use this notation to just grab it
    // 400 if Bad Request. Then Return.
    if (error) return res.status(400).send(error.details[0].message);

    // Find and update
    const image = await Image.findByIdAndUpdate(req.params.id, {
            // update based on whats being sent in the body
            name: req.body.name,
            user: req.body.user    
    }, {new: true});    
    console.log(image) 

    
    // 404 Error if Id doesnt Exist. Then Return.
    if (!image) return res.status(404).send('The image with given ID was not found.');

    // return the updated image
    res.send(image);

});
    

///////////////////////////////
//////// Delete Request ///////
///////////////////////////////

router.delete('/:id', async (req, res)=>{

    const image =  await Image.findByIdAndRemove(req.params.id);
    
    // 404 Error if Id doesnt Exist. Then Return.
    if (!image) return res.status(404).send('The image with given ID was not found.');
        
    // return the same image
    res.send(image);

});


/////////////////////////////
//////Get By Id Request//////
/////////////////////////////
router.get('/:id', async (req, res) =>{

    const image = await Image.findById(req.params.id);
        
    // 404 Error if Id doesnt Exist. Then Return.
    if (!image) return res.status(404).send('The image with given ID was not found.');
    
        // Send it back if the id does exist
        res.send(image);
    
    
    });



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
      name: Joi.string().min(3).required(), // by default string must be atleast a length of at least 5 characters
      user: Joi.string(),
      image: Joi.string(),
      category: Joi.string(),
      tags: Joi.string(),
      isPublished: Joi.boolean(),
      price: Joi.number()
    });
  
    return schema.validate(image);
  }



module.exports = router;

//////////////////////////////////
//////////////////////////////////
/////////  All Models  ///////////
//////////////////////////////////
//////////////////////////////////







//////////////////////////////////
//////////////////////////////////
//////  Crud Functionality  //////
//////////////////////////////////
//////////////////////////////////




//////////////////////////////
// Create Create Create Create
//////////////////////////////
// async function createImage(){
//     const image = new Image({
//         name: "Darnell",
//         user: "King Akeem",
//         category: "Photo",
//         tags: ['afrnnno'],
//         isPublished: true,
//         price: 99
//     });
//     try{
//         const result = await image.save();
//         console.log(result);
//     }
//     catch(ex){
//         for (field in ex.errors)
//             console.log(ex.errors[field].message);
//     }
// }

// createImage()





///////////////////////////////////////////////////
/////////  Retrieving from a DataBase  ////////////
//////////////////////////////////////////////////
// Function to get courses that meet specified critiria
///////////////////////////////////////////////////////

//////////////////////////////
// Retrieve Retrieve Retrieve
//////////////////////////////
// async function getImages(){
//     return await Image
//         .find({isPublished: true, tags: "afro images"})
//         .sort({price: -1})
//         .select({name: 1, user: 1, price: -1});
//         // .count();
// }

// async function run() {
//     const images = await getImages();
//     console.log(images);
// }

// run()

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////  Updating Objects in a DataBase  //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

///////////////////////
///// Update One //////
//////////////////////////////
//////////////////////////////
// This retrieves it from the database first
////////////////////////////////////////////


///////////////////////////////
// Update Update Update Update
///////////////////////////////

// async function updateOneImage(id){
//     const image = await Image.findById(id);
//     if(!image) {
//         return;
//     }
//     image.isPublished = false;
//     image.user = "Another Person";
//     const result = await image.save();
    
//     console.log(result) 
// }

// updateOneImage("5dee67a03302b6bad33c6e70");


///////////////////////
//// Update One ///////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
// Find By Id & Update One Image. (returns the result)
///////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database
//////////////////////////////////////////////////////////////


///////////////////////////////
// Update Update Update Update
///////////////////////////////

// async function updateOneImage(id){
//     const result = await Image.updateOne({_id: id}, {
//         $set: {
//             isPublished: true,
//             user: "A Different Person"
//         }
//     });    
//     console.log(result) 
// }

// updateOneImage("5deea8948017d01b76c7402f");


///////////////////////
//// Update One ///////
//////////////////////////////
//////////////////////////////
// Find By Id & Update One Image
/////////////////////////////////////////////////////////////////
// Updating directly in the database. (returns what whas deleted)
/////////////////////////////////////////////////////////////////

// async function updateOneImage(id){
//     const image = await Image.findByIdAndUpdate(id, {
//         $set: {
//             isPublished: true,
//             user: "Joyce"
//         }
//     }, {new: true});    
//     console.log(image) 
// }

// updateOneImage("5deea8948017d01b76c7402f");


////////////////////////
//// Update Many ///////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Find by a given criteria and Update Many Image at Once
//////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database
//////////////////////////////////////////////////////////////

// async function updateManyImages(){
//     const image = await Image.updateMany({isPublished: true},{
//         $set: {
//                 isPublished: false,
//                 user: "rightbrainpapi",
//                 name: "Another Great Image"
//             }
//     }, {new: true});
//     console.log(image) 
// }

// updateManyImages();


















/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
///////////  Delete Object in a DataBase  ///////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////



//////////////////////////////
// Find By Id & Delete One Image
//////////////////////////////
///////////////////////////////
//Finds by the Id then deletes.
/////////////////////////////////////////////////////////////////
// This returns a result stating whther it was successful or not.
/////////////////////////////////////////////////////////////////

// async function removeImage(id){
//    const result =  await Image.deleteOne({_id: id});
//    console.log(result);
// }

// removeImage("5deea8948017d01b76c7403c");


////////////////////////////////////
// Find By criteria & Delete One Image
////////////////////////////////////
////////////////////////////////////
/////////////////////////////////////////////////////////////////
// This returns a result stating whther it was successful or not.
/////////////////////////////////////////////////////////////////

// async function removeManyAtATime(name){
//    const result =  await Image.deleteMany({name: name});
//    console.log(result);
// }

// removeManyAtATime("Some Name");


//////////////////////////////////////////////////////////
// Find By Id & Delete One Image (returns what whas deleted)
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database.
//////////////////////////////////////////////////////////////

// async function removeOneAndShowMe(id){
//     const deletedImage =  await Image.findByIdAndRemove(id);
//     console.log(deletedImage);
//  }
 
//  removeOneAndShowMe("5dee67a03302b6bad33c6e72");
