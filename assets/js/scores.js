// Select requried elements from HTML page
let highscores = document.querySelector("#highscores");
let clearScoresBtn = document.querySelector("#clear");


// Display high scores
let storedInitial = localStorage.getItem("initials");
let storedUserScore = localStorage.getItem("scores");

highscores.innerHTML = '<li>' + storedInitial + ' - ' + storedUserScore + '</li>';


// Clear highscores
function clear() {
    localStorage.clear();
    highscores.innerHTML = "";
}

// Add event listener for clear button click
clearScoresBtn.addEventListener('click', clear);

console.log(localStorage.length);