countryValue = "";
try {getCountry();}
catch (err) {console.log("cannot get country")}

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD6HEAHfcXGN-WrUxSaraO3TYNzGbAr8ts",
  authDomain: "tm-games1.firebaseapp.com",
  databaseURL: "https://tm-games1.firebaseio.com",
  projectId: "tm-games1",
  storageBucket: "tm-games1.appspot.com",
  messagingSenderId: "969120080569"
};

firebase.initializeApp(config);

// Reference Games collection
var gamesRef = firebase.database().ref("games-solo");
//get the games as an array
var r1 = firebase.database().ref('games-solo')
r1.on('value', (snap) => {
  const val = snap.val()
  const asArray = Object.keys(val)
    .map(key => val[key])
    document.getElementById("title3").innerHTML = asArray.length; //for the odometer counter
})

//listen for form SUBMIT
document.getElementById("form").addEventListener("submit", submitForm);

//get user's country code
function getCountry() {
 $.getJSON('https://ipapi.co/json/', function(data) {
    geo = JSON.stringify(data, null, 2)
    geo = JSON.parse(geo)
    countryValue = geo["country"];
    console.log(countryValue);
  });
}

// Submit form
function submitForm(e) {
  e.preventDefault();

  //Get values
  var corporation = document.getElementById("corporation").value;
  var expansions = arrayExpansions();
  var map = document.querySelector('input[name="map"]:checked').value;
  var mode = document.querySelector('input[name="mode"]:checked').value;
  var timestamp = Math.floor((new Date()).getTime() / 1000);
  var country = countryValue;

  //win and loss saves data in result - losses keeps values under 10
  if (outcome == "win") {
    result = document.getElementById("corporation-score").value
  } else { result = document.getElementById("steps").value }


  // Save Game
  saveGame(corporation, expansions, result, mode, map, timestamp, country);

  //clear form
  document.getElementById("form").reset();
  resetAll();
}

// Save Game to firebasejs
function saveGame(corporation, expansions, result, mode, map, timestamp, country) {
  var newGameRef = gamesRef.push();
  newGameRef.set({
    corporation: corporation,
    expansions: expansions,
    result: result,
    mode: mode,
    map: map,
    timestamp: timestamp,
    country: country
  })
}

//getting form values

function arrayExpansions() {
  expansions = [];
  x = document.querySelectorAll('input[name="expansions"]:checked');
  for (i=0; i < x.length; i++) {
      expansions.push(x[i].value);
  }
  return expansions;
}
