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
const imageSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: true,
        minlength: 5,
        maxlength: 25
    },
    category: {
        type: String,
        required: true,
        enum: ["photo", "gif", "video"] // When creating a image the categroy we set needs to be one of these values.
    },
    user: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v){
                return v && v.length > 0; //v is short for value
            },
            message: "Your content should have at least one tag."
        }
    },
    image: String,
    date: {type:Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function(){ return this.isPublished; }, // If isPublished is true then the price will be required
        min: 10,
        max: 200,
    }
});


//////////////////////////////////
//////////////////////////////////
/////////  All Models  ///////////
//////////////////////////////////
//////////////////////////////////

// Creating a model based on the schema
const Image = mongoose.model('Image', imageSchema);





//////////////////////////////////
//////////////////////////////////
//////  Crud Functionality  ///////
//////////////////////////////////
//////////////////////////////////




//////////////////////////////
// Create Create Create Create
//////////////////////////////
async function createImage(){
    const image = new Image({
        name: "Something Newer",
        user: "King Akeem",
        category: "photo",
        tags: [],
        isPublished: true,
        price: 99
    });
    try{
        const result = await image.save();
        console.log(result);
    }
    catch(err){
        console.log(err.message)
    }
}

createImage()





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
//         .select({name: 1, user: 1, price: -1});
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
//                 name: "Another Great Image"
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

// async function removeManyAtATime(name){
//    const result =  await Image.deleteMany({name: name});
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
