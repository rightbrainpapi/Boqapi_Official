//////////////////////////////////////////////
/////////////// GET REQUEST //////////////////
//////////////////////////////////////////////

const search_input = document.getElementById('search');
const results = document.getElementById('results');

let search_term = '';
let pictures;
let myPics = []


/////////////////////////////////////
////////////////////////////////////
// Create the Li function with 1 pic
////////////////////////////////////
////////////////////////////////////

const createLi = (picture) => {
    const li = document.createElement('li');
    const picture_image = document.createElement('img');
    // const picture_title = document.createElement('h3');
    const picture_info = document.createElement('div');
    // const picture_population = document.createElement('h2');
    // const picture_popupation_text = document.createElement('h5');
    
    li.classList.add('picture-item');
    picture_info.classList.add('picture-info');
    
    picture_image.src = picture.image;
    picture_image.classList.add('picture-image');
    
    // picture_title.innerText = picture.title;
    // picture_title.classList.add('picture-title');


    li.appendChild(picture_image);
    // li.appendChild(picture_title);
    li.appendChild(picture_info);
    // ul.appendChild(li);
    
    return li;
};

//////////////////////////////
/////////////////////////////
// Append To Dom Function
//////////////////////////////
//////////////////////////////
const appendToDOM = (pictures) => {
    // Clears the innerHTML before appending happens
    results.innerHTML = '';
    const ul = document.getElementById('results')
    console.log('Inside Append')

    //iterate over all pictures
    // checkNameFilter(pictures)

    pictures.map(picture => {

        ul.appendChild(createLi(picture));
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


const fetchPictures = () => {
    axios.get('http://localhost:3000/api/images')
        .then(response => {
            pictures = response.data;
            console.log(`GET list pictures`, pictures);
            // append to DOM
            myPics = response.data
            appendToDOM(pictures);

        })
        .catch(error => console.error(error));
};

fetchPictures();


////////////////////////////////////////////////
////////////////////////////////////////////////
// Filtering the Data if a user types something
//////////////////////////////////////////////
//////////////////////////////////////////////
  
search_input.addEventListener('input', (e) => {
	search_term = e.target.value;
	// re-display pictures again based on the new search_term
    // appendToDOM();
    checkNameFilter(pictures)
});



////////////////////////////////////////////////
////////////////////////////////////////////////
// Modal popup 
///////////////////////////////////////////////
///////////////////////////////////////////////


console.log("We are here")

document.getElementById('buttonTrig').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "flex";
});

document.querySelector('.close').addEventListener("click", function() {
	document.querySelector('.bg-modal').style.display = "none";
});


////////////////////////////////////////////////
////////////////////////////////////////////////
////////////// Plugging Footer /////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

var year = new Date().getFullYear();
var date = `Copyright &copy; ${year} | Boqapi Group LLC`;
document.getElementsByClassName('footer')[0].innerHTML = date;