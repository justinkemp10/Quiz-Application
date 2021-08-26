// declare variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");




// retrieves local storage
var allScores = localStorage.getItem("allScores");
allScores = JSON.parse(allScores);

if (allScores !== null) {
    
    for (var i = 0; i < allScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.classList.add('highScoreLi')
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);

    }
}

// event listener - 'click' to clear scores
clear.addEventListener("click", function () {
    localStorage.removeItem("allScores");
    location.reload();
});

// event listener - 'click' to move back to the index page
goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});