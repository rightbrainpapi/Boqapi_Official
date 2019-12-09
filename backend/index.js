const mongoose = require('mongoose');

// mongoose.connect ('mongodb://localhost/boqapi-api')

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect ('mongodb://localhost/boqapi-api')
    .then(() => console.log('Connect to MongoDB...'))
    .catch(err => console.error('Could not conect to MongoDB...', err));



//////////////////////////////////
//////////////////////////////////
/////////  All Schemas  //////////
//////////////////////////////////
//////////////////////////////////
const gifSchema = new mongoose.Schema({
    name: String,
    user: String,
    tags: [String],
    gif: String,
    date: {type:Date, default: Date.now},
    price: Number,
    isPublished: Boolean
});


//////////////////////////////////
//////////////////////////////////
/////////  All Models  ///////////
//////////////////////////////////
//////////////////////////////////

// Creating a model based on the schema
const Gif = mongoose.model('Gif', gifSchema);




///////////////////////////////////////////
/////////  Querying a DataBase  ///////////
///////////////////////////////////////////
// Function to get courses that meet specified critiria
///////////////////////////////////////////////////////

// async function getGifs(){
//     return await Gif
//         .find({isPublished: true, tags: "afro gifs"})
//         .sort({price: -1})
//         .select({name: 1, user: 1, price: -1});
//         // .count();
// }

// async function run() {
//     const gifs = await getGifs();
//     console.log(gifs);
// }

// run()

/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
/////////  Updating Object in a DataBase  ///////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////

///////////////////////
///// Update One //////
//////////////////////////////
//////////////////////////////
// This retrieves it from the database first
////////////////////////////////////////////

// async function updateOneGif(id){
//     const gif = await Gif.findById(id);
//     if(!gif) {
//         return;
//     }
//     gif.isPublished = false;
//     gif.user = "Another Person";
//     const result = await gif.save();
    
//     console.log(result) 
// }

// updateOneGif("5dee67a03302b6bad33c6e70");


///////////////////////
//// Update One ///////
////////////////////////////////////////////////////
////////////////////////////////////////////////////
// Find By Id & Update One Gif. (returns the result)
///////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database
//////////////////////////////////////////////////////////////

// async function updateOneGif(id){
//     const result = await Gif.updateOne({_id: id}, {
//         $set: {
//             isPublished: true,
//             user: "A Different Person"
//         }
//     });    
//     console.log(result) 
// }

// updateOneGif("5deea8948017d01b76c7402f");


///////////////////////
//// Update One ///////
//////////////////////////////
//////////////////////////////
// Find By Id & Update One Gif
/////////////////////////////////////////////////////////////////
// Updating directly in the database. (returns what whas deleted)
/////////////////////////////////////////////////////////////////

// async function updateOneGif(id){
//     const gif = await Gif.findByIdAndUpdate(id, {
//         $set: {
//             isPublished: true,
//             user: "Joyce"
//         }
//     }, {new: true});    
//     console.log(gif) 
// }

// updateOneGif("5deea8948017d01b76c7402f");


////////////////////////
//// Update Many ///////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// Find by a given criteria and Update Many Gif at Once
//////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database
//////////////////////////////////////////////////////////////

// async function updateManyGifs(){
//     const gif = await Gif.updateMany({isPublished: true},{
//         $set: {
//                 isPublished: false,
//                 user: "rightbrainpapi",
//                 name: "Another Great Gif"
//             }
//     }, {new: true});
//     console.log(gif) 
// }

// updateManyGifs();


















/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
///////////  Delete Object in a DataBase  ///////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////



//////////////////////////////
// Find By Id & Delete One Gif
//////////////////////////////
///////////////////////////////
//Finds by the Id then deletes.
/////////////////////////////////////////////////////////////////
// This returns a result stating whther it was successful or not.
/////////////////////////////////////////////////////////////////

// async function removeGif(id){
//    const result =  await Gif.deleteOne({_id: id});
//    console.log(result);
// }

// removeGif("5deea8948017d01b76c7403c");


////////////////////////////////////
// Find By criteria & Delete One Gif
////////////////////////////////////
////////////////////////////////////
/////////////////////////////////////////////////////////////////
// This returns a result stating whther it was successful or not.
/////////////////////////////////////////////////////////////////

// async function removeManyAtATime(name){
//    const result =  await Gif.deleteMany({name: name});
//    console.log(result);
// }

// removeManyAtATime("Some Name");


//////////////////////////////////////////////////////////
// Find By Id & Delete One Gif (returns what whas deleted)
//////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// You know what your doing so update directly in the database.
//////////////////////////////////////////////////////////////

// async function removeOneAndShowMe(id){
//     const deletedGif =  await Gif.findByIdAndRemove(id);
//     console.log(deletedGif);
//  }
 
//  removeOneAndShowMe("5dee67a03302b6bad33c6e72");
