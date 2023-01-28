// Select requried elements from HTML page
let highscores = document.querySelector("#highscores");
let clearScoresBtn = document.querySelector("#clear");

// Create array for highscores in local storage
let highscoresArray = JSON.parse(localStorage.getItem("highscores"));

// Display each high score in local storage on page
for(let i = 0; i < highscoresArray.length; i++) {

    // Assign items in the object to their respective values
    let storedInitials = highscoresArray[i].initials;
    let storedUserScore = highscoresArray[i].scores;

    // Display high scores if initials are available
    if(storedInitials) highscores.innerHTML += '<li>' + storedInitials + ' - ' + storedUserScore + '</li>';
}

// Clear highscores
function clear() {
    localStorage.clear();
    highscores.innerHTML = "";
}

// Add event listener for clear button click
clearScoresBtn.addEventListener('click', clear);

