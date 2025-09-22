// //alert("running external JS code!")

// //Global variables
// let randomNumber = Math.floor(Math.random() * 99) + 1;

// console.log(randomNumber);

// //Changes the color of an element programatically
// document.querySelector("h1").style.color = "red";

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let guessesleft = 7;
let wins = 0;
let losses = 0;

initializeGame();

function initializeGame() {
    //Note, not having let in front of our random number variable makes it so that the 
    //scope of the variable isn't localized solely to the function
   randomNumber = Math.floor(Math.random() * 99) + 1;
   console.log("randomNumber: " + randomNumber);
   attempts = 0;
   guessesleft = 7;

   //Displaying wins and losses
   document.querySelector("#wins").textContent = wins + " Wins";
   document.querySelector("#losses").textContent = losses + " Losses";

   //hiding the Reset button
   document.querySelector("#resetBtn").style.display = "none";

   //Showing Guess button on newgame start
   let guessBtn = document.querySelector("#guessBtn");
   guessBtn.style.display = "inline";
  
   //adding focus to textbox
   document.querySelector("#playerGuess").focus();

   let playerGuess = document.querySelector("#playerGuess");
   playerGuess.focus();//adding focus to textbox
   playerGuess.value = ""; //clearing the textbox

   let attemptsLeft = document.querySelector("#attemptsLeft");
   attemptsLeft.textContent = "";

   let feedback = document.querySelector("#feedback");
   feedback.textContent = " "; //clearing the feedback

   //clearing the previous guesses
   document.querySelector("#guesses").textContent = "";
}

function checkGuess(){
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guess = document.querySelector("#playerGuess").value;
    console.log("Player guess: " + guess );
    if(guess < 1 || guess > 99){
        feedback.textContent = "Enter a number between 1 and 99!";
        feedback.style.color = "red";

        /* This approach would also work
        * document.querySelector("#feedback").textContent = "Enter a number between 1 and 99";
        * document.querySelector("#feedback").style.color = "red"; 
        */
        return;
    }

    attempts++;
    guessesleft--;
    console.log("Attempts left: " + guessesleft);
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if(guess == randomNumber){
        feedback.textContent = "You Guessed It! You Won!";
        feedback.style.color = "darkgreen";
        wins++;
        gameOver();

    }
    else{
        document.querySelector("#guesses").textContent += guess + " ";
        document.querySelector("#attemptsLeft").textContent = guessesleft;
        document.querySelector("#resetBtn").style.display = "inline";
        if(attempts == 7){
            feedback.textContent = "Sorry, you lost. the random number was: " + randomNumber;
            feedback.style.color = "red";
            losses++;
            gameOver();
        }
        else if(guess > randomNumber){
            feedback.textContent = "Guess was high.";
        }
        else{
            feedback.textContent = "Guess was low.";
        }
    }
}

function gameOver(){
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none"; //hides guess button
    resetBtn.style.display = "inline"; //displays reset button
}


/* The syntax for adding an event listener is:
 * document.querySelector("selector").addEventListener("event", funtion_name);
 * selector can be a tag name,
 * event can be an event type such as "click" or "hover",
 * funtion_name is the name of the function to be called when the event is triggered.
 */