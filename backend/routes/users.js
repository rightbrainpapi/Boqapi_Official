// const Joi = require('@hapi/joi'); // as a best practice name variables with captial letter when the package is a class
// const mongoose = require('mongoose');
const asyncMiddleware = require ('../custom_middleware/async');
const auth = require ('../custom_middleware/auth');
const  bcrypt = require ('bcrypt');
const {User, validateUser} = require('../models/userModel')
const express = require('express');
const router = express.Router();

///////////////////////////////////
//////Get All Route handlers///////
//////////////////////////////////
// Defining a Route
// arg 1: the Uri
// arg 2: the call back function that has parameters of req and res 
    
router.get('/', asyncMiddleware(async (req, res)=>{
    const users = await User.find().sort('name');
    res.send(users);
}));


///////////////////////////////////////////////////////////
//////Get By Access Token found in the header Request//////
///////////////////////////////////////////////////////////

router.get('/me', auth, asyncMiddleware(async(req, res) =>{

    const user = await User.findById(req.user._id).select('-password');

    // 404 Error if Id doesnt Exist. Then Return.
    // if (!user) return res.status(404).send('The user with given ID was not found.');
    
        // Send it back if the id does exist
        res.send(user);
    }));


/////////////////////////////
//////// Post Request ///////
/////////////////////////////


router.post('/', asyncMiddleware(async(req, res) => {
    // Input validation using Joi
    const { error } = validateUser(req.body); // This is object destructuring. since we are interested in only 1 property we can use this notation to just grab it
    // 404 Error if Id doesnt Exist. Then Return.
    if (error) return res.status(400).send(error.details[0].message);

    // Check to see if User exists
    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registered.')

    
    user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isGold: req.body.isGold
    });
    const salt = await bcrypt.genSalt(15);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();



    // This is a payload
    const token = user.generateAuthToken();
    // Send it back in the body of the res
    res.header('x-auth-token', token).send(
        {
            // Dont want to send the password back so I am selecting which items to send back.
            name: user.name,
            email: user.email,
            isGold: req.body.isGold

        }

        );
}));

/////////////////////////////
//////// Put Request ///////
/////////////////////////////

router.put('/:id', asyncMiddleware(async(req, res)=>{
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

}));
    

///////////////////////////////
//////// Delete Request ///////
///////////////////////////////

router.delete('/:id', asyncMiddleware(async (req, res)=>{

    const user =  await User.findByIdAndRemove(req.params.id);
    
    // 404 Error if Id doesnt Exist. Then Return.
    if (!user) return res.status(404).send('The user with given ID was not found.');
        
    // return the same user
    res.send(user);

}));


/////////////////////////////
//////Get By Id Request//////
/////////////////////////////
router.get('/:id', asyncMiddleware(async(req, res) =>{

    const user = await User.findById(req.params.id);
        
    // 404 Error if Id doesnt Exist. Then Return.
    if (!user) return res.status(404).send('The user with given ID was not found.');
    
        // Send it back if the id does exist
        res.send(user);
    }));



module.exports = router;
