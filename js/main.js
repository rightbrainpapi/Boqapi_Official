////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////// Modal popup /////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////


console.log("We are here")

document.getElementById('buttonTrig').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});


////////////////////////////////////////////////
////////////////////////////////////////////////
////////////////// Search Tab //////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////



// var elementsArray = document.getElementsByClassName('tabName')

// console.log(elementsArray[0])

// elementsArray.forEach( function(elem){
//     elem.addEventListener('click', function(){
//         // Do something
//         console.log('This is working')
//         document.getElementById('searchPageContainer').style.display = "block"

//     });
// });


// const elem = elementsArray;
// console.log(elem.length)
// for (var i = 0; i < elem.length; i++){
//     console.log(elem[i]);
//     elem[i].addEventListener('click', function(){
//         // Do something
//         console.log('This is working')
//         // document.getElementById('searchPageContainer').textContent = "Gif";
//         document.getElementById('searchPageContainer').style.display = "block"
//     });
// }


// function someAction (elem){
//     for (var i = 0; i < elem.length; i++){
//         console.log(elem[i]);
//         elem[i].addEventListener('click', function(){
//             // // Do something
//             console.log('This is working');
//             // // document.getElementById('searchPageContainer').textContent = "Gif";
//             // document.getElementById('searchPageContainer').style.display = "block";
//             console.log(elem[i])
//         });
//     }
// }



//  var gifs = elem[0].innerHTML;
//  var photos = elem[1].innerHTML;
//  var videos = elem[2].innerHTML;

// someAction(elem);
// console.log(elem[0].innerHTML);
// console.log(elem[1].innerHTML);
// console.log(elem[2].innerHTML);


// console.log(elem[0].getValue());
// console.log(elem[1].getValue());
// console.log(elem[2].getValue());


// const test = document.getElementById('searchPageContainer').textContent = "Gif";
// console.log(test)











var elementsArray = document.getElementsByClassName('tabName')

// function scopepreserver (a, b){
//     // return function (){
//         // Do something with a and b
//         console.log(`This is i: ${a}`)
//         console.log(`This is elems[i]: ${b}`)
//     // };
// }





// function myfunction (){
//     console.log(`Inside myfunction`)
//     var elems = elementsArray;
    
//     for (var i = 0; i < elems.length; i++){
//         // elems[i].onclick = scopepreserver(i, elems[i])
//        elems[i].addEventListener('click', function (e){
//         console.log('I am inside of the click function');
//         console.log(`This is the event: ${e.target.id}`)
//         // scopepreserver(i, elems[i])
//        }, false)

//     //    console.log(e.target.classList)
//     }


//     elems.forEach(element => console.log(element));
// }


// myfunction ()

// elem[i].addEventListener('click', function(){
//     // Do something
//     console.log('This is working')
//     // document.getElementById('searchPageContainer').textContent = "Gif";
//     document.getElementById('searchPageContainer').style.display = "block"
// });




var theParent = document.getElementById("searchTabContainer");
// console.log(theParent)

theParent.addEventListener("click", changeSearchPage, false);

function changeSearchPage (e){
    //Do something
    if (e.target !== e.currentTarget){
        var clickedItem = e.target.id;
        console.log(`This is the id that was clicked:`, clickedItem);
        document.getElementById('searchPage').textContent = clickedItem.toUpperCase();
        document.getElementById('searchPageContainer').style.display = "block";

        // injectSearchedContent
        // This function delevers the content associated with the page displayed needed.

        //pseudo code
        // if clickedItem is gif
        // result call the get fetchGifs();
        // 
        if(clickedItem === "gifs"){
            console.log("fetching gifs")
            appendToDOM(gifs);
            console.log(gifs)
        }
        else if(clickedItem === "photos"){
            console.log("fetching photos")
            appendToDOM(photos); // Variable is the array of objects stored from the axios call.
        }
        else if(clickedItem === "videos"){
            console.log("fetching videos")
            appendToDOM(videos); /// Variable should bethe array of objects stored from the axios call. Currently this is an array I've created.
        }

    }
    e.stopPropagation();
}






////////////////////////////////////////////////
////////////////////////////////////////////////
////////////// Plugging Footer /////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

var year = new Date().getFullYear();
var date = `Copyright &copy; ${year} | Boqapi Group LLC.`;
document.getElementsByClassName('footer')[0].innerHTML = date;









































////////////////////////////////////////////////
////////////////////////////////////////////////
/////////////// DATA Handling //////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////





//////////////////////////////////////////////
/////////////// GET REQUEST //////////////////
//////////////////////////////////////////////

const search_input = document.getElementById('search');
const results = document.getElementById('results');

let search_term = '';
let photos;
let gifs;
let videos = [
    {
        date: "2018-01-24T21:42:27.388Z",
        image: "../img/3-boqapiGifs.gif",
        isPublished: false,
        price: 1,
        tags: (2) ["afro gifs", "afrochella"],
        title: "LLLLL",
        user: "User Name",
        _id: "5df5093ca9644c9fd0ffdd3c" ,
    },
    {
        date: "2018-01-24T21:42:27.388Z",
        image: "../img/3-boqapiGifs.gif",
        isPublished: false,
        price: 1,
        tags: (2) ["afro gifs", "afrochella"],
        title: "LLLLL",
        user: "User Name",
        _id: "5df5093ca9644c9fd0ffdd3c" ,
    },
    {
        date: "2018-01-24T21:42:27.388Z",
        image: "../img/3-boqapiGifs.gif",
        isPublished: false,
        price: 1,
        tags: (2) ["afro gifs", "afrochella"],
        title: "LLLLL",
        user: "User Name",
        _id: "5df5093ca9644c9fd0ffdd3c" ,
    }
]
let myPics = []


/////////////////////////////////////
////////////////////////////////////
// Create the Li function with 1 pic
////////////////////////////////////
////////////////////////////////////

const createLi = (gif) => {
    const li = document.createElement('li');
    const gif_image = document.createElement('img');
    // const gif_title = document.createElement('h3');
    const gif_info = document.createElement('div');
    // const gif_population = document.createElement('h2');
    // const gif_popupation_text = document.createElement('h5');
    
    li.classList.add('gif-item');
    gif_info.classList.add('gif-info');
    
    gif_image.src = gif.image;
    gif_image.classList.add('gif-image');
    
    // gif_title.innerText = gif.title;
    // gif_title.classList.add('gif-title');


    li.appendChild(gif_image);
    // li.appendChild(gif_title);
    li.appendChild(gif_info);
    // ul.appendChild(li);
    
    return li;
};

//////////////////////////////
/////////////////////////////
// Append To Dom Function
//////////////////////////////
//////////////////////////////
// This function appends the 
// elements to the dom
// it 
//////////////////////////////
const appendToDOM = (mediaElements) => {
    // Clears the innerHTML before appending happens
    results.innerHTML = '';
    const ul = document.getElementById('results')
    console.log('Inside Append')

    //iterate over all mediaElements
    // checkNameFilter(mediaElements)

    mediaElements.map(mediaElement => {

        ul.appendChild(createLi(mediaElement));
    });

    
};


//////////////////////////////
/////////////////////////////
// Filter the Data
//////////////////////////////
//////////////////////////////
function checkNameFilter(picsArrToFilter) {
    var filteredPics = picsArrToFilter.filter(function (e) {
        return e.title.toLowerCase().includes(search_term.toLowerCase());
    });
    console.log(filteredPics);
    //Appending the filltered Pics to the dom
    appendToDOM(filteredPics);
    
}


//////////////////////////////
/////////////////////////////
// Fething the Data
//////////////////////////////
//////////////////////////////


const fetchGifs = () => {
    axios.get('http://localhost:3000/api/images')
        .then(response => {
            gifs = response.data;
            console.log(`GET list gifs`, gifs);
            // append to DOM
            myPics = response.data
            // appendToDOM(gifs); //This should be commented out

        })
        .catch(error => console.error(error));
};

fetchGifs();


////////////////////////////////////////////////
////////////////////////////////////////////////
// Filtering the Data if a user types something
//////////////////////////////////////////////
//////////////////////////////////////////////
  
search_input.addEventListener('input', (e) => {
	search_term = e.target.value;
	// re-display gifs again based on the new search_term
    // appendToDOM();
    checkNameFilter(gifs)
});



