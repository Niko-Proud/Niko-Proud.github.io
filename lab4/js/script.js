// Event listeners
document.querySelector("#zip").addEventListener("change", displayCity );
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#username").addEventListener("change", checkUserName);
document.querySelector("#password").addEventListener("click", suggestPwd);
// An event listener that needs to handle all of the informaton submitted, so it gets a special param
document.querySelector("#signupForm").addEventListener("submit", function(Event){
    validateForm(Event);
});

displayStates();

// Functions
async function displayCity(){
    let zipCode = document.querySelector("#zip").value;
    console.log(zipCode);
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;

    // The async keyword must be used in any function that uses the await keyword internally
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);

    if(data.zip !== zipCode){
        document.querySelector("#zipNotFound").innerHTML = "Zip code not found";
        document.querySelector("#zipNotFound").className = "bg-warning text-white";
        return;
    }

    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#city").className = "m-3 bg-light text-black";
    document.querySelector("#latitude").innerHTML = data.latitude;
    document.querySelector("#latitude").className = "m-3 bg-light text-black";
    document.querySelector("#longitude").innerHTML = data.longitude;
    document.querySelector("#longitude").className = "m-3 bg-light text-black";
}

async function displayCounties(){
    let state = document.querySelector("#state").value;
    if(state === "Select State"){return;}
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;

    let response = await fetch(url);
    let data = await response.json();

    let countyList = document.querySelector("#county");

    // Every time this function is called, innerHTML will override whatever is curently selected
    // within the countyList dropdown because of this line 
    countyList.innerHTML = `<option> Select County </option>`;
    for(let i = 0; i < data.length; i++){
        countyList.innerHTML += `<option>${data[i].county}</option>`;
    }

    // A more efficient loop version would be 
    // for(let i of data) 
    // {countyList.innerHTML += `<option>${i.county}</option>`;}

}

async function displayStates() {
    let url = `https://csumb.space/api/allStatesAPI.php`;
    let stateList = document.querySelector("#state");

    let response = await fetch(url);
    let data = await response.json();

    stateList.innerHTML = `<option> Select State </option>`;
    for(let i of data){
        stateList.innerHTML += `<option value="${i.usps}">${i.state}</option>`;
    }
}

async function checkUserName() {
    let username = document.querySelector("#username").value;
    console.log(username);
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;

    let response = await fetch(url);
    let data = await response.json();

    let usernameError = document.querySelector("#usernameError");
    if(data.available){
        usernameError.innerHTML = " Username Available! ";
        // usernameError.style.color = "green";
        usernameError.className = "m-3 bg-success text-white";
    }
    else{
        usernameError.innerHTML = " Username  Unavailable! ";
        //usernameError.style.color = "red";
        usernameError.className = "m-3 bg-danger text-white";
    }

}

async function suggestPwd() {
    let url = `https://csumb.space/api/suggestedPassword.php?length=6`;

    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("#suggestedPwd").innerHTML = "Suggested Password: " + data.password;
    document.querySelector("#suggestedPwd").className = "m-3 bg-light";

}

//validaing form data
function validateForm(e){
    let isValid = true;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let retypePwd = document.querySelector("#retypePwd").value;

    if(username.length < 3){
        document.querySelector("#usernameError").innerHTML = "Username must be at least 3 characters!";
        //document.querySelector("#usernameError").style.color = "red";
        document.querySelector("#usernameError").className = "m-3 bg-danger text-white";
        isValid = false;
    }

    if(password.length < 6 ){
        document.querySelector("#passwordlength").innerHTML = "Password must be 6 or more characters.";
        // document.querySelector("#passwordlength").style.color = "red";
        document.querySelector("#passwordlength").className = "m-3 bg-danger text-white";
        isValid = false;
    }

    if(retypePwd.length == 0){
        document.querySelector("#passwordError").innerHTML = "Passwords do not match, check for errors and try again.";
        //document.querySelector("#passwordError").style.color = "red";
        document.querySelector("#passwordError").className = "m-3 bg-danger text-white";
        isValid = false;
    }

    if(retypePwd !== password){
        document.querySelector("#passwordError").innerHTML = "Passwords do not match, check for errors and try again.";
        //document.querySelector("#passwordError").style.color = "red";
        document.querySelector("#passwordError").className = "m-3 bg-danger text-white";
        isValid = false;
    }

    if(!isValid){
        e.preventDefault(); //This prevents the submission of the form, by preventing the default functionality of the event
    }
}