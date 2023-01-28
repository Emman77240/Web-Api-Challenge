// Select all the required elements from HTML page
let start_btn = document.querySelector("#start");
let submitBtn = document.querySelector("#submit");
let userData = document.querySelector("#initials");
let choicesList = document.querySelector(".choices");
let timeCount = document.querySelector(".timer #time");
let finalScore = document.querySelector("#final-score");
let feedbackItems = document.querySelector("#feedback");
let questionText = document.querySelector("#question-title");


let timer;
let counter;
let feedbackTag;
let userScore = 0;
let duration = 100;
let scoresArray = [];
let questionCount = 0;


// If start button clicked
start_btn.onclick = () => {
    // Hide start screen
    document.getElementById("start-screen").classList.remove("start");
    document.getElementById("start-screen").classList.add("hide");
    
    // Show questions
    document.getElementById("questions").classList.remove("hide");
    showQuestions(0);

    // Start timer
    startTimer(duration);
}


// Create timer function
function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {
        timeCount.textContent = time;
        time--;

        // Stop timer and end the quiz when time is zero 
        if(time < 0) {
            clearInterval(counter);
            
            // Save and display user details to highscore page
            transferHighscore();
        }
    
    }
}

function showQuestions(index) {

    if(index < 10) {
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

    } else {
        // Assign feedback to page
        feedbackItems.innerHTML = feedbackTag;

        // Save and display user details to highscore page
        transferHighscore();

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

        // Create feedback tag
        feedbackTag = '<p>Correct!</p>'; 
        
    } else {
        // Decrease time as penalty 
        clearInterval(counter);
        console.log(timeCount.textContent);
        duration = timeCount.textContent;
        duration -= 10;
        
        // Restart timer
        startTimer(duration);

        // Increment question count to show next question
        questionCount++;
        showQuestions(questionCount);
       
        // Create feedback tag
        feedbackTag = '<p>Wrong!</p>';
    }

    // Assign feedback to page
    feedbackItems.innerHTML = feedbackTag;

    // Display feedback
    document.getElementById("feedback").classList.remove("hide");

}





// Add score and users initials to local storage
function transferHighscore() {
    // Display final score
    finalScore.innerHTML = userScore;
            
    // Create user object
    let userObj = {
        initials: userData.value,
        scores: userScore
    }

    // Check local storage for existing data or create new data
    if(!localStorage.getItem("highscores")) {

        // Add user object to scores array
        scoresArray.push(userObj);

        // Save scores array to local storage
        localStorage.setItem("highscores", JSON.stringify(scoresArray));
    } else {
        // Set local storage items to scores array
        scoresArray = JSON.parse(localStorage.getItem("highscores"));

        // Add array object to scores array
        scoresArray.push(userObj);

        // Re-add scores array to local storage
        localStorage.setItem("highscores", JSON.stringify(scoresArray));

    }

    // Add event listener to update local storage with user scores on click
    submitBtn.addEventListener('click', () => {
        transferHighscore();
        location.href = "highscores.html";
    
    });

    // Hide questions class
    document.getElementById("questions").classList.add("hide");

    // Reveal end screen
    document.getElementById("end-screen").classList.remove("hide");

}