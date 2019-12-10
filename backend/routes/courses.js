// const Joi = require('joi'); // as a best practice name variables with captial letter when the package is a class
const express = require('express');
const router = express.Router();




const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]


///////////////////////////
//////Get All Request//////
///////////////////////////
// Defining a Route
// arg 1: the Url
// arg 2: the call back function that has parameters of req and res 
    
    router.get('/', (req, res)=>{
        res.send(courses);
        
        });
    
    /////////////////////////////
    //////Get By Id Request//////
    /////////////////////////////
    router.get('/:id', (req, res) =>{
       const course = courses.find(c => c.id === parseInt(req.params.id)); //req.params.id returns a string so we need to parse to int.
        
       // 404 Error if Id doesnt Exist. Then Return.
       if (!course) return res.status(404).send('The course with given ID was not found.');
    
        // Send it back if the id does exist
        res.send(course);
    
       
    });
    
    
    
    /////////////////////////////
    //////// Post Request ///////
    /////////////////////////////
    
    
    router.post('/', (req, res) => {
        // Input validation using Joi
        const { error } = valdateCourse(req.body); // This is object destructuring. since we are interested in only 1 property we can use this notation to just grab it
    
        // 404 Error if Id doesnt Exist. Then Return.
        if (error) return res.status(400).send(error.details[0].message);
    
        const course = {
            id: courses.length + 1,
            name: req.body.name
        };
        courses.push(course);
    
        // Send it back in the body of the res
        res.send(course);
    });
    
    
    /////////////////////////////
    //////// Put Request ///////
    /////////////////////////////
    
    router.put('/:id', (req, res)=>{
        // Look up the course
        // If not existing, return 404
        const course = courses.find(c => c.id === parseInt(req.params.id)); //req.params.id returns a string so we need to parse to int.
        
        // 404 Error if Id doesnt Exist. Then Return.
        if (!course) return res.status(404).send('The course with given ID was not found.');
    
         
    
        const { error } = valdateCourse(req.body); // This is object destructuring. since we are interested in only 1 property we can use this notation to just grab it
        // 400 if Bad Request. Then Return.
        if (error) return res.status(400).send(error.details[0].message);
            
    
        // update course 
        course.name = req.body.name;
        // return the updated course
        res.send(course);
    
    
    
    })
    
    
    
    ///////////////////////////////
    //////// Delete Request ///////
    ///////////////////////////////
    
    router.delete('/:id', (req, res)=>{
        // Look up the course
        // If not existing, return 404
        const course = courses.find(c => c.id === parseInt(req.params.id)); //req.params.id returns a string so we need to parse to int.
    
        
        // 404 Error if Id doesnt Exist. Then Return.
        if (!course) return res.status(404).send('The course with given ID was not found.');
         
    
        // if existing, Delete
        const index = courses.indexOf(course);
        courses.splice(index, 1);
    
        // return the same course
        res.send(course);
    
    })
    
    
    /////////////////////////////////////
    // All necessary call back functions
    /////////////////////////////////////
    
    function valdateCourse(course){
        // Validate using Joi
        // If invalid, return 400 - bad request
        const schema = {
            // this defines the shape of our object.
            name: Joi.string().min(3).required()
        };
    
        return Joi.validate(course, schema); // This validate method returns an object
        
    }
    
    module.exports = router;