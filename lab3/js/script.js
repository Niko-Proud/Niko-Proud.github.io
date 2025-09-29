document.querySelector("button").addEventListener("click", gradeQuiz);

displayQ4Choices();

//Global variables
let score = 0;
    //Using a local web storage to hold this value even if the webpage is refreshed
let attempts = localStorage.getItem("total_attempts");

//functions
function displayQ4Choices(){
    let q4ChoicesArray = ["Wizard", "Bard", "Druid", "Cleric"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for(let i = 0; i < q4ChoicesArray.length; i++){
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id="${q4ChoicesArray[i]}" 
        value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]} </label>`;

    }
}

function isFormValid(){
    let isValid = true;
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered.";
    }
    return isValid;
}

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src ='img/checkmark.png' alt='Checkmark'>";
    score += 20;

}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src ='img/xmark.png' alt='xmark'>";
}

function gradeQuiz(){
    console.log("Grading quiz...");
    document.querySelector("#validationFdbk").innerHTML = "";
    if(!isFormValid()){
        return;
    }

    //variables
    score = 0;
    let q1response = document.querySelector("#q1").value.toLowerCase();
    let q2response = document.querySelector("#q2").value;
    let q4response = document.querySelector("input[name=q4]:checked").value;
    let q5response = document.querySelector("#q5").value;
    console.log(q1response);
    console.log(q2response);

    //Grading q1
    if(q1response == "fighter"){
        rightAnswer(1);
    }
    else{
        wrongAnswer(1);
    }

    //Grading q2
    if(q2response == "Poison"){
         rightAnswer(2);
    }
    else{
        wrongAnswer(2);
    }

    //Grading q3
    if(document.querySelector("#side12").checked && !document.querySelector("#side10").checked 
    && !document.querySelector("#side8").checked && !document.querySelector("#side6").checked){
        rightAnswer(3)
    }
    else{
        wrongAnswer(3);
    }

    //Grading q4
    if(q4response == "Bard"){
        rightAnswer(4);
    }
    else{
        wrongAnswer(4);
    }

    //Grading q5
    if(q5response == "Force"){
        rightAnswer(5);
    }
    else{
        wrongAnswer(5);
    }

    //A template litteral, remember to use backticks, not single quotes around the part thats going to be displayed
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;

    if(score < 80){
        document.querySelector("#totalScore").className = "bg-danger text-white";
    }
    else{
        document.querySelector("#totalScore").className = "bg-success text-white";
        document.querySelector("#congrats").textContent = "Great Success!";
    }

    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    //Setting the value of our local web storage variable
    localStorage.setItem("totatl_attempts", attempts);
}