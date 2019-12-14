// const Joi = require('@hapi/joi'); // as a best practice name variables with captial letter when the package is a class
// const mongoose = require('mongoose');
const {User, validateUser} = require('../models/userModel')
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
    if(user) return res.status(400).send('User already registered.')

    
    user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isGold: req.body.isGold
    });
    user = await user.save();

    // Send it back in the body of the res
    res.send(user);
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



module.exports = router;


//////////////////////////////////
//////////////////////////////////
//////  Crud Functionality  //////
//////////////////////////////////
//////////////////////////////////




//////////////////////////////
// Create Create Create Create
//////////////////////////////
// async function createUser(){
//     const user = new User({
//         name: "Darnell",
//         user: "King Akeem",
//         category: "Photo",
//         tags: ['afrnnno'],
//         isPublished: true,
//         price: 99
//     });
//     try{
//         const result = await user.save();
//         console.log(result);
//     }
//     catch(ex){
//         for (field in ex.errors)
//             console.log(ex.errors[field].message);
//     }
// }

// createUser()





///////////////////////////////////////////////////
/////////  Retrieving from a DataBase  ////////////
//////////////////////////////////////////////////
// Function to get courses that meet specified critiria
///////////////////////////////////////////////////////

//////////////////////////////
// Retrieve Retrieve Retrieve
//////////////////////////////
// async function getUsers(){
//     return await User
//         .find({isPublished: true, tags: "afro users"})
//         .sort({price: -1})
//         .select({name: 1, user: 1, price: -1});
//         // .count();
// }

// async function run() {
//     const users = await getUsers();
//     console.log(users);
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

// async function updateOneUser(id){
//     const user = await User.findById(id);
//     if(!user) {
//         return;
//     }
//     user.isPublished = false;
//     user.user = "Another Person";
//     const result = await user.save();
    
//     console.log(result) 
// }

// updateOneUser("5dee67a03302b6bad33c6e70");


///////////////////////
//// Update One ///////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
// Find By Id & Update One User. (returns the result)
///////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database
//////////////////////////////////////////////////////////////


///////////////////////////////
// Update Update Update Update
///////////////////////////////

// async function updateOneUser(id){
//     const result = await User.updateOne({_id: id}, {
//         $set: {
//             isPublished: true,
//             user: "A Different Person"
//         }
//     });    
//     console.log(result) 
// }

// updateOneUser("5deea8948017d01b76c7402f");


///////////////////////
//// Update One ///////
//////////////////////////////
//////////////////////////////
// Find By Id & Update One User
/////////////////////////////////////////////////////////////////
// Updating directly in the database. (returns what whas deleted)
/////////////////////////////////////////////////////////////////

// async function updateOneUser(id){
//     const user = await User.findByIdAndUpdate(id, {
//         $set: {
//             isPublished: true,
//             user: "Joyce"
//         }
//     }, {new: true});    
//     console.log(user) 
// }

// updateOneUser("5deea8948017d01b76c7402f");


////////////////////////
//// Update Many ///////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Find by a given criteria and Update Many User at Once
//////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database
//////////////////////////////////////////////////////////////

// async function updateManyUsers(){
//     const user = await User.updateMany({isPublished: true},{
//         $set: {
//                 isPublished: false,
//                 user: "rightbrainpapi",
//                 name: "Another Great User"
//             }
//     }, {new: true});
//     console.log(user) 
// }

// updateManyUsers();


















/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
///////////  Delete Object in a DataBase  ///////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////



//////////////////////////////
// Find By Id & Delete One User
//////////////////////////////
///////////////////////////////
//Finds by the Id then deletes.
/////////////////////////////////////////////////////////////////
// This returns a result stating whther it was successful or not.
/////////////////////////////////////////////////////////////////

// async function removeUser(id){
//    const result =  await User.deleteOne({_id: id});
//    console.log(result);
// }

// removeUser("5deea8948017d01b76c7403c");


////////////////////////////////////
// Find By criteria & Delete One User
////////////////////////////////////
////////////////////////////////////
/////////////////////////////////////////////////////////////////
// This returns a result stating whther it was successful or not.
/////////////////////////////////////////////////////////////////

// async function removeManyAtATime(name){
//    const result =  await User.deleteMany({name: name});
//    console.log(result);
// }

// removeManyAtATime("Some Name");


//////////////////////////////////////////////////////////
// Find By Id & Delete One User (returns what whas deleted)
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database.
//////////////////////////////////////////////////////////////

// async function removeOneAndShowMe(id){
//     const deletedUser =  await User.findByIdAndRemove(id);
//     console.log(deletedUser);
//  }
 
//  removeOneAndShowMe("5dee67a03302b6bad33c6e72");
