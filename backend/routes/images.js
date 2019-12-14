// const Joi = require('@hapi/joi'); // as a best practice title variables with captial letter when the package is a class
// const mongoose = require('mongoose');
const {Image, validateImage} = require('../models/imageModel')
const {Genre} = require('../models/genreModel');
const express = require('express');
const router = express.Router();

///////////////////////////////////
//////Get All Route handlers///////
//////////////////////////////////
// Defining a Route
// arg 1: the Uri
// arg 2: the call back function that has parameters of req and res 
    
router.get('/', async (req, res)=>{
    const images = await Image.find().sort('title');
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

    // Searching for Genre Specific Image
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    let image = new Image ({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
          },
        user: req.body.user,
        image: req.body.image,
        // category: req.body.category,
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

    // Searching for Genre Specific Image
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid genre.');

    // Find and update
    const image = await Image.findByIdAndUpdate(req.params.id, {
            // update based on whats being sent in the body
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
              },
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
//         title: "Darnell",
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
//         .select({title: 1, user: 1, price: -1});
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
//                 title: "Another Great Image"
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

// async function removeManyAtATime(title){
//    const result =  await Image.deleteMany({title: title});
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
