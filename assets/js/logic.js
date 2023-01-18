// Select all the required elements from HTML page
let start_btn = document.querySelector("#start");
let timeCount = document.querySelector(".timer #time");
let choicesList = document.querySelector(".choices");

let counter;
let timerValue = 100;


// If start button clicked
start_btn.onclick = () => {
    // Hide start screen
    document.getElementById("start-screen").classList.remove("start");
    document.getElementById("start-screen").classList.add("hide");
    
    // Start timer
    startTimer(timerValue);

    // Show questions
    document.getElementById("questions").classList.remove("hide");
    showQuestions(0);
}






function startTimer(time) {
    // Assign value to counter
    counter = setInterval(timer, 1000);
    
    // Create timer function
    function timer() {
        timeCount.textContent = time;
        time--;

        if(time < 0) {
            clearInterval(counter);
        }

    }

}

function showQuestions(index) {
    let questionText = document.querySelector("#question-title");

    // Create span and div tags for question and choices, passing into it the arrays index
    let questionTag = '<span>' + questions[index].question + '</span>';
    let choicesTag = '<button class="choices"><span>'+ questions[index].answers[0] +'</span></button>'
    + '<button class="choices"><span>'+ questions[index].answers[1] +'</span></button>'
    + '<button class="choices"><span>'+ questions[index].answers[2] +'</span></button>'
    + '<button class="choices"><span>'+ questions[index].answers[3] +'</span></button>';
    questionText.innerHTML = questionTag; //adding new span tag inside que_tag
    choicesList.innerHTML = choicesTag; //adding new div tag inside option_tag
    
}