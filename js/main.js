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
        // result call the get fetchMedia();
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
let photos = [
    {
        date: "2018-01-24T21:42:27.388Z",
        image: "../img/hardCodedData/0-boqapiPhotos.png",
        isPublished: false,
        price: 1,
        tags: (2) ["afro", "afrochella"],
        title: "Africa",
        user: "User Name",
        _id: "5df5093ca9644c9fd0ffdd3c" ,
    },
    {
        date: "2018-01-24T21:42:27.388Z",
        image: "../img/hardCodedData/5-boqapiPhotos.png",
        isPublished: false,
        price: 1,
        tags: (2) ["afro", "afrochella"],
        title: "Egypt",
        user: "User Name",
        _id: "5df5093ca9644c9fd0ffdd3c" ,
    },
    {
        date: "2018-01-24T21:42:27.388Z",
        image: "../img/hardCodedData/6-boqapiPhotos.png",
        isPublished: false,
        price: 1,
        tags: (2) ["afro", "afrochella"],
        title: "Crown",
        user: "User Name",
        _id: "5df5093ca9644c9fd0ffdd3c" ,
    }
];
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

const createLi = (mediaElem) => {
    const li = document.createElement('li');
    const mediaElem_image = document.createElement('img');
    // const mediaElem_title = document.createElement('h3');
    const mediaElem_info = document.createElement('div');
    // const mediaElem_population = document.createElement('h2');
    // const mediaElem_popupation_text = document.createElement('h5');
    
    li.classList.add('mediaElem-item');
    mediaElem_info.classList.add('mediaElem-info');
    
    mediaElem_image.src = mediaElem.image;
    mediaElem_image.classList.add('mediaElem-image');
    
    // mediaElem_title.innerText = mediaElem.title;
    // mediaElem_title.classList.add('mediaElem-title');


    li.appendChild(mediaElem_image);
    // li.appendChild(mediaElem_title);
    li.appendChild(mediaElem_info);
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
const appendToDOM = (mediaElems) => {
    // Clears the innerHTML before appending happens
    results.innerHTML = '';
    const ul = document.getElementById('results')
    console.log('Inside Append')

    //iterate over all mediaElems
    // checkNameFilter(mediaElems)

    mediaElems.map(mediaElem => {

        ul.appendChild(createLi(mediaElem));
    });

    
};


//////////////////////////////
/////////////////////////////
// Filter the Data
//////////////////////////////
//////////////////////////////
function checkNameFilter(mediaElemsToFilter) {
    var filteredMediaElems = mediaElemsToFilter.filter(function (e) {
        return e.title.toLowerCase().includes(search_term.toLowerCase());
    });
    console.log(filteredMediaElems);
    //Appending the filltered MediaElems to the dom
    appendToDOM(filteredMediaElems);
    
}


//////////////////////////////
/////////////////////////////
// Fething the Data
//////////////////////////////
//////////////////////////////

// [] I need to dynamically use this get request.
//      - fetchMedia = (mediaType)
//      - axios.get(`http://localhost:3000/api/${mediaType}`)
const fetchMedia = () => {
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

fetchMedia();


////////////////////////////////////////////////
////////////////////////////////////////////////
// Filtering the Data if a user types something
//////////////////////////////////////////////
//////////////////////////////////////////////
  
// search_input.addEventListener('input', (e) => {
//     // [] check to see what page we are on then run the search filter for that page.
//     // [] get the document
//     // [] if document. inner HTMML is gif or photos or videos run checkNameFilter with that in params
    
// 	search_term = e.target.value;
// 	// re-display gifs again based on the new search_term
//     // appendToDOM();
//     checkNameFilter(gifs)
// });

search_input.addEventListener('input', (e) => {
    // [x] check to see what page we are on then run the search filter for that page.
    // [x] get the document
    // [x] if document. inner HTMML is gif or photos or videos run checkNameFilter with that in params
    let a = document.getElementById("searchPage").innerHTML.toLocaleLowerCase()
    console.log(a);
    // let a = 2 + 2;
    search_term = e.target.value;
    switch (a) {
        case 'photos':
            // alert( 'This is photos' );
            checkNameFilter(photos);
            console.log(`This is the current variable a:`, a);
        break;
        case 'gifs':
            checkNameFilter(gifs);
            console.log(`This is the current variable a:`, a);
        break;
        case 'videos':
            // alert( 'This is videos' );
            checkNameFilter(videos);
            console.log(`This is the current variable a:`, a);
        break;
        default:
        alert( "We can  use this to default to a specific search" );
    }
});