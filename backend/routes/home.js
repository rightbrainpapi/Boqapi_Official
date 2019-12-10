const express = require('express');
const router = express.Router();


router.get('/', (req, res)=>{
    // res.send("Hello world!!!");
    // Using pug to dynamically render html mark up
    res.render('index', {title: 'My Express App', message: Hello});
    
    });


    module.exports = router;
