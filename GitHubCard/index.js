import axios from 'axios';

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/


axios.get(`https://api.github.com/users/bevanger`)
  .then(function(response) {
    const cardElement = document.querySelector('.cards'); // Selecting the div element in HTML, that has a class of cards
    const newCard = createCard(response.data); //Create a new variable 'newCard' Assign it to the return value of running createCard(with our data response from our api call)
    // remember that in createCard function we're returning the ENTIRE div we built out.   so newCard is actually = to <div class="cardDiv">
    cardElement.appendChild(newCard);// I want to append a child to the cardElement (div with class of cards) - and I want that child to be: the createCard function using the response.data from github


    //DECONSTRUCTING RESPONSE -> createCard({avatar_url: response.data.avatar_url, location: response.data.location, html_url: response.data.html_url, followers: response.data.followers, following: response.data.following, bio: response.data.bio });
    // REMEMBER ALSO NEED TO DECONSTRUCT PARAMETERS IN FUNCTION DELCARATION TOO! EX: function createCard({html_url, location, avatar_url... })
    //console.log(response.data);
  })
  .catch(err => console.log(err.message))
  .finally(() => console.log('done'))

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = ['JoeyMBrown', 'tetondan', 'dustinmyers', 'justsml', 'luishrd'];

followersArray.forEach(function(user) {
  axios.get(`https://api.github.com/users/${user}`)
  .then(function(response) {
    const cardElement = document.querySelector('.cards'); 
    const newCard = createCard(response.data); 
    cardElement.appendChild(newCard);
  })
});

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function createCard(data){
const cardDiv = document.createElement('div');
const userImg = document.createElement('img');
const infoDiv = document.createElement('div');
const h3 = document.createElement('h3');
const pUsername = document.createElement('p');
const pLocation = document.createElement('p');
const pProfile = document.createElement('p');
const aAddress = document.createElement('a');
const pFollowers = document.createElement('p');
const pFollowing = document.createElement('p');
const pBio = document.createElement('p');

cardDiv.appendChild(userImg);
cardDiv.appendChild(infoDiv);
infoDiv.appendChild(h3);
infoDiv.appendChild(pUsername);
infoDiv.appendChild(pLocation);
infoDiv.appendChild(pProfile);
infoDiv.appendChild(pFollowers);
infoDiv.appendChild(pFollowing);
infoDiv.appendChild(pBio);

cardDiv.classList.add('card');
userImg.setAttribute('src', data.avatar_url);
infoDiv.classList.add('card-info');
h3.classList.add('name');
pUsername.classList.add('username');

pLocation.textContent = `Location: ${data.location}`;
pProfile.textContent = `Profile: `;
aAddress.setAttribute('href', data.html_url);
aAddress.textContent = data.html_url;
pFollowers.textContent = `Followers: ${data.followers}`;
pFollowing.textContent = `Following: ${data.following}`;
pBio.textContent = `Bio: ${data.bio}`;

pProfile.appendChild(aAddress);

return cardDiv;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
