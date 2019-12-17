// Express Demo
const mongoose = require('mongoose');
const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
// const logger = require('./custom_middleware/logger');
// const auth = require('./custom_middleware/auth');


const auth = require('./routes/auth');
const genres = require('./routes/genres');
const users = require('./routes/users');
const images = require('./routes/images');
const courses = require('./routes/courses');
const home = require('./routes/home')
const express = require('express');
const app = express();



///////////////////////////////////////
////// Connecting to Database /////////
///////////////////////////////////////

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect ('mongodb://localhost/boqapi')
    .then(() => console.log('Connect to MongoDB...'))
    .catch(err => console.error('Could not conect to MongoDB...', err));






/////////////////////////
//////Configuration//////
/////////////////////////

console.log('Application Name: ' + config.get('name'));
console.log('Mail Server : ' + config.get('mail.host'));
console.log('Mail Password : ' + config.get('mail.password'));




if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
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
// app.use(logger);
// app.use(auth);

/////////////////////////////
/////////// Routes //////////
/////////////////////////////
app.use('/api/auth', auth);
app.use('/api/genres', genres);
app.use('/api/users', users); // Any path that start with boqapi-api/users use images router 
app.use('/api/images', images); // Any path that start with boqapi-api/images use images router 
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