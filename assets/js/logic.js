// Select all the required elements from HTML page
let start_btn = document.querySelector("#start");
let choicesList = document.querySelector(".choices");
let timeCount = document.querySelector(".timer #time");
let feedbackItems = document.querySelector("#feedback");
let questionText = document.querySelector("#question-title");


let counter;
let userScore = 0;
let timerValue = 100;
let questionCount = 0;

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
    
    // Create span and div tags for question and choices, passing into it the arrays index
    let questionTag = '<span>' + questions[index].question + '</span>';
    let choicesTag = '<button class="option"><span>'+ questions[index].answers[0] +'</span></button>'
    + '<button class="option"><span>'+ questions[index].answers[1] +'</span></button>'
    + '<button class="option"><span>'+ questions[index].answers[2] +'</span></button>'
    + '<button class="option"><span>'+ questions[index].answers[3] +'</span></button>';
    questionText.innerHTML = questionTag; //adding new span tag inside que_tag
    choicesList.innerHTML = choicesTag; //adding new div tag inside option_tag

    let choice = choicesList.querySelectorAll(".option");

    // Set onclick attribute to available options
    for(let i = 0; i < choice.length; i++) {
        choice[i].setAttribute("onclick", "selectedChoice(this)");
    }
    
}


function selectedChoice(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].correctAnswer;

    // Check for correct answer
    if(userAnswer == correctAnswer) {
        // Increment score and question count
        userScore += 10;
        questionCount++;
        showQuestions(questionCount);

        // Create feedback tags
        feedbackItems.innerHTML = '<p>Correct!</p>';
        
    } else {
        // Decrease time as penalty and increment question count
        timerValue -= 10;
        questionCount++;
        showQuestions(questionCount);
        
        // Create feedback tags
        feedbackItems.innerHTML = '<p>Wrong!</p>';
    }

    // Display feedback
    document.getElementById("feedback").classList.remove("hide");

}

