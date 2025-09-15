//Global Variables
let randomNum = Math.floor(Math.random(), 99) + 1;

// Event Listeners
document.querySelector("#guessBtn").addEventListener("click", guess);

//Functions
function guess(){

    let userGuess = document.querySelector("#guessBox").value;
    // alert(userGuess);

    // This is the standard, easiest way to concatenate a string in javascript
    // document.querySelector("#userGuesses").textContent += userGuess + ", ";

    // This is another wayto concatenate strings
    document.querySelector("#userGuesses").textContent += ` ${userGuess} `;
}