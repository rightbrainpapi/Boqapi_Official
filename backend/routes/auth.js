const jwt = require('jsonwebtoken')
const Joi = require('@hapi/joi'); // as a best practice name variables with captial letter when the package is a class
// const mongoose = require('mongoose');
const  bcrypt = require ('bcrypt');
const {User} = require('../models/userModel')
const express = require('express');
const router = express.Router();

///////////////////////////////////
//////Get All Route handlers///////
//////////////////////////////////
// Defining a Route
// arg 1: the Uri
// arg 2: the call back function that has parameters of req and res 
    
router.get('/', async (req, res)=>{
    const users = await User.find().sort('name');
    res.send(users);
});


/////////////////////////////
//////// Post Request ///////
/////////////////////////////


router.post('/', async (req, res) => {
    // Input validation using Joi
    const { error } = validateUser(req.body); // This is object destructuring. since we are interested in only 1 property we can use this notation to just grab it
    // 404 Error if Id doesnt Exist. Then Return.
    if (error) return res.status(400).send(error.details[0].message);

    // Check to see if User exists
    let user = await User.findOne({email:req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');


    // Using bcrypt to rehash and salt the req.password to compare
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');


  // This is a payload
    const token = jwt.sign({_id: user._id}, "jwtPrivateKey");
    res.send(token);

    
    // Send it back in the body of the res
    res.send(true);
});

/////////////////////////////
//////// Put Request ///////
/////////////////////////////

router.put('/:id', async  (req, res)=>{
    // Input validation using Joi
    const { error } = validateUser(req.body); // This is object destructuring. since we are interested in only 1 property we can use this notation to just grab it
    // 400 if Bad Request. Then Return.
    if (error) return res.status(400).send(error.details[0].message);

    // Find and update
    const user = await User.findByIdAndUpdate(req.params.id, {
            // update based on whats being sent in the body
            name: req.body.name,
            email: req.body.email,
            isGold: req.body.isGold   
    }, {new: true});    
    console.log(user) 

    
    // 404 Error if Id doesnt Exist. Then Return.
    if (!user) return res.status(404).send('The user with given ID was not found.');

    // return the updated user
    res.send(user);

});
    

///////////////////////////////
//////// Delete Request ///////
///////////////////////////////

router.delete('/:id', async (req, res)=>{

    const user =  await User.findByIdAndRemove(req.params.id);
    
    // 404 Error if Id doesnt Exist. Then Return.
    if (!user) return res.status(404).send('The user with given ID was not found.');
        
    // return the same user
    res.send(user);

});


/////////////////////////////
//////Get By Id Request//////
/////////////////////////////
router.get('/:id', async (req, res) =>{

    const user = await User.findById(req.params.id);
        
    // 404 Error if Id doesnt Exist. Then Return.
    if (!user) return res.status(404).send('The user with given ID was not found.');
    
        // Send it back if the id does exist
        res.send(user);
    });






    function validateUser(req) {
      // The Joi validation schema
      // Place the criteria you want validated in the object below
      const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    
      });
    
      return schema.validate(req);
    }

module.exports = router;


