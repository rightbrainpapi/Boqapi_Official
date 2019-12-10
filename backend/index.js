// Express Demo
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi'); // as a best practice name variables with captial letter when the package is a class
const logger = require('./custom_middleware/logger');
const auth = require('./custom_middleware/auth');

const courses = require('./routes/courses');
const home = require('./routes/home')
const express = require('express');
const app = express();


/////////////////////////
//////Configuration//////
/////////////////////////

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server : ' + config.get('mail.host'));
console.log('Mail Password : ' + config.get('mail.password'));

///////////////////////////////////////////
// Determine what environment is in use
///////////////////////////////////////////

// console.log(`NODE_ENV: ${process.env.Node_ENV}`);
// console.log(`app: ${app.get('env')}`);

if (app.get('env')=== 'development'){
    // Logs the request by default to the console.
    // But can be configured to log to a log file.
    app.use(morgan('tiny')); 
    debug('Morgan enabled...'); // same as console.log('Morgan enabled...');
}


////////////////////////////////////////
// PUG: HTML Temlating engne
///////////////////////////////////////
app.set('view engine', 'pug');
app.set('views', './views'); //default


///////////////////////////////////////
//////Built in Express Middleware//////
///////////////////////////////////////
app.use(express.json());
app.use(express.urlencoded({extended: true})); // reads url encoded payload and parses it to req.body
app.use(express.static('public')); // serves static files


////////////////////////////////////////
//////// Third Party Middleware ////////
////////////////////////////////////////
app.use(helmet());




/////////////////////////////
//////Custom Middleware//////
/////////////////////////////
app.use(logger);
app.use(auth);

/////////////////////////////
/////////// Routes //////////
/////////////////////////////

app.use('/api/courses', courses); // Any path tht start with /api/courses use coures router 
app.use('/', home); // Any path tht start with / use home router


// methods available in the express package
// There is plenty that can be done with the each Request. (checkout the express documentation)
// app.get();
// app.post();
// app.put();
// app.delete();











// Listen on a given port
// PORT
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`)
})