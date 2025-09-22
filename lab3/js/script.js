document.querySelector("#quizBtn").addEventListener("click",gradeQuiz);


displayQ3Options();

function displayQ3Options(){

    let q3Options = ["font-color", "fontColor", "color", "textColor"];
    q3Options = _.shuffle(q3Options);

    for (let i of q3Options) {

        let inputElement = document.createElement("input");
        inputElement.type = "radio";
        inputElement.name = "q3";
        inputElement.value = i;
        console.log(inputElement);

        let labelElement = document.createElement("label");
        labelElement.textContent = i;
        labelElement.prepend(inputElement);

        document.querySelector("#q3Options").append(labelElement);
        
    }


}

function gradeQuiz(){

    let userAnswer1 = document.querySelector("input[name=q1]:checked").value;

    //alert(userAnswer1);

    if (userAnswer1 == "color") {

        alert("Right!")

    } else {

        alert("Wrong!")
    }
}