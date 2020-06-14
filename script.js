// Assignment code here

var specialOptions = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 
                      46, 47, 58, 59, 60, 61, 62, 63, 64, 91, 92, 93, 94, 
                      95, 96, 123, 124, 125, 126];

// Get references to the #generate element
var generateBtn = document.getElementById("generate");

//Get references to the #chooseOptions element
var chooseOptionsBtn = document.getElementById("chooseOptions");

//Get references to the #options div
var optionsDiv = document.getElementById("options");

//Generate a random number with max and min values, borrowed from MDN's Math.random() page
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}

// Generate a random character for each type of parameter
function generateChar(type) {
  var charMin = 0;
  var charMax = 1;
  switch (type) {
    case "lower":
      charMin = 97;
      charMax = 122;
      break

    case "upper":
      charMin = 65;
      charMax = 90;
      break

    case "number":
      charMin = 48;
      charMax = 57;
      break

    case "special":


      //this case is different. Return the decimal code for the RNG character from the specialOptions array
      return String.fromCharCode(specialOptions[getRandomIntInclusive(charMin, specialOptions.length-1)]);
  }
  return String.fromCharCode(getRandomIntInclusive(charMin, charMax));
}


// Generate the password using the values of the checked boxes and Length input
function generatePassword() {
  var password = "";
  var lowercase = document.getElementById("loweryes").checked;
  var uppercase = document.getElementById("upperyes").checked;
  var numeric = document.getElementById("numberyes").checked;
  var special = document.getElementById("specialyes").checked;
  var length = document.getElementById("pwLength").value;
  var checkedErrorMsg = document.getElementById("checkederrormsg");
  var lengthErrorMsg = document.getElementById("outofrangeerrormsg");
  var numberSelectedTypes = 0;
  var selectedCharacterTypes = [];
  var invalidSelection = false;
  var invalidLength = false;

  if (lowercase) {selectedCharacterTypes.push("lower");};
  if (uppercase) {selectedCharacterTypes.push("upper");};
  if (numeric) {selectedCharacterTypes.push("number");};
  if (special) {selectedCharacterTypes.push("special");};

  numberSelectedTypes = selectedCharacterTypes.length;

  //make sure the length is valid
  if (length > 128 || length < 8) {
    invalidLength = true;
    lengthErrorMsg.style.display = "block";  //show the outofrange error message  
  } else {
    lengthErrorMsg.style.display = "none";
  };

  //make sure they select >0 options
  if (numberSelectedTypes === 0){
    invalidSelection = true;
    checkedErrorMsg.style.display = "block";  //show the no-options-checked error message
  } else {
    checkedErrorMsg.style.display = "none";
  };
  
  
  if (!invalidSelection && !invalidLength){
    
    lengthErrorMsg.style.display = "none";
    //hide the outofrange error message
    lengthErrorMsg.style.display = "none";
    //loop for the number of characters chosen, appending a random character of a random (but selected) type to the end of "password"
    for (var i = 0; i < length; i++) {
      console.log(generateChar(selectedCharacterTypes[getRandomIntInclusive(0,numberSelectedTypes-1)]));
      password = password.concat(generateChar(selectedCharacterTypes[getRandomIntInclusive(0,numberSelectedTypes-1)]));
      console.log(password + "  " + i);
    }
  }
  return password;
}


// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Hide the chooseOptions button and show both the options section and the generate button
function showOptions() {
  chooseOptionsBtn.style.display = "none";
  generateBtn.style.display = "inline-block";
  optionsDiv.style.display = "block";
};


// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// Add event listener to chooseOptions button
chooseOptionsBtn.addEventListener("click", showOptions);
