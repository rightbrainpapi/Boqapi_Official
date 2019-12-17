// const Joi = require('@hapi/joi'); // as a best practice title variables with captial letter when the package is a class
// const mongoose = require('mongoose');
const asyncMiddleware = require ('../custom_middleware/async');
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
    
router.get('/', asyncMiddleware(async (req, res)=>{
    const images = await Image.find().sort('title');
    res.send(images);
}));


/////////////////////////////
//////// Post Request ///////
/////////////////////////////


router.post('/', asyncMiddleware(async (req, res) => {
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
}));

/////////////////////////////
//////// Put Request ///////
/////////////////////////////

router.put('/:id', asyncMiddleware(async(req, res)=>{
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

}));
    

///////////////////////////////
//////// Delete Request ///////
///////////////////////////////

router.delete('/:id', asyncMiddleware(async(req, res)=>{

    const image =  await Image.findByIdAndRemove(req.params.id);
    
    // 404 Error if Id doesnt Exist. Then Return.
    if (!image) return res.status(404).send('The image with given ID was not found.');
        
    // return the same image
    res.send(image);

}));


/////////////////////////////
//////Get By Id Request//////
/////////////////////////////
router.get('/:id', asyncMiddleware(async (req, res) =>{

    const image = await Image.findById(req.params.id);
        
    // 404 Error if Id doesnt Exist. Then Return.
    if (!image) return res.status(404).send('The image with given ID was not found.');
    
        // Send it back if the id does exist
        res.send(image);
    
    
    }));


module.exports = router;