//event listeners
document.querySelector("#statMethod").addEventListener("change", displayNums);

//Functions
function abilityModifier(Score){

    let modifier = Math.floor((Score - 10)/2);
    
    return modifier;
}

function displayNums(){
    let choice = document.querySelector("input[name=statOptions]:checked").value;
    console.log(choice);

    if(choice == "standardArray"){
        let numbers = [ 15, 14, 13, 12, 10, 8];
        let statOptions = document.querySelectorAll(".statRolls");
        console.log(statOptions.length);
        document.querySelector("#statNums").innerHTML = "Stat Options: 15, 14, 13, 12, 10, 8";

        //Figured out with help of GPT to debug using multiple selects
        //outer loop to move through the different selects in the group
       for(let option of statOptions){
         option.innerHTML = `<option> -- </option>`;
            //inner loop to actually add the numbers
            for(let num of numbers){
                option.innerHTML += `<option value = ${num}>${num}</option>`;
            }
       }

       statListeners();

    }
    
    if(choice == "diceRoll"){
        rollStats();
        statListeners();
    }
}

function rollStats(){
    let statOptions = document.querySelectorAll(".statRolls");
    console.log(statOptions.length);
    let roll = 0;
    let stats = [];

    let display = document.querySelector("#statNums");
    for(i = 0; i < 6; i++){
        for(j = 0; j < 3; j++){
            roll += Math.floor(Math.random() * 6) + 1;
        }
        stats.push(roll);
        roll = 0;
    }

    //Method for displaying from array from: https://stackoverflow.com/a/70073637
    display.innerHTML = "Stat Options: " + stats.join(", ");

    //reusing because it works
    for(let option of statOptions){
     option.innerHTML = `<option> -- </option>`;
        for(let num of stats){
            option.innerHTML += `<option value=${num}>${num}</option>`;
        }
    }

    let buttonEl = document.createElement("button");
    buttonEl.textContent = "Re-Roll";
    let statNums = document.querySelector("#statNums");
    statNums.append(buttonEl);
    buttonEl.addEventListener("click", rollStats);

}

//Also had to get GPT help to figure out how to do this
function statListeners(){
    let stats = document.querySelectorAll(".statRolls");
    for(let num of stats){
        num.addEventListener("change", function(event){
            //grabs the value from the updated select menu
            let value = parseInt(event.target.value);
            //grabs the parent div, so that everything happens in the right place
            let parent = num.closest("div");

            //grabs the span as related to the parent div, to display things in the right place
            let span = parent.querySelector(".abilityMod");

            let modifier = abilityModifier(value);

            if(modifier >= 0){
                span.textContent = '+' + modifier;
            }
            else{
                span.textContent = modifier;
            }

        });
    }
}
