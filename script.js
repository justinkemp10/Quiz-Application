// declared variables for the 5 questions
var questions = [
    {
        question: "What is the capital of Nebraska?",
        choices: ["Omaha", "Nebraska City", "Lincoln", "Grand Island"],
        answer: "Lincoln"
    },
    {
        question: "Who is the 41st President of the United States?",
        choices: ["Ronald Reagan", "George H.W. Bush", "Bill Clinton", "Joe Biden"],
        answer: "George H.W. Bush"
    },
    {
        question: "What is the state bird of Minnesota?",
        choices: ["American Goldfinch", "Woodpecker", "Cardinal", "Common loon"],
        answer: "Common loon"
    },
    {
        question: "What is the longest river in the United States?",
        choices: ["Mississippi River", "Yukon River", "Missouri River", "Rio Grande"],
        answer: "Missouri River"
    },
    {
        question: "What was the first declared state in America?",
        choices: ["Pennsylvania", "New Jersey", "Delaware", "Rhode Island"],
        answer: "Delaware"
    }
]
// declare variables for start button, the quiz questions, & question container
var startBtn = document.querySelector('#startQuizBtn');
var questionText = document.querySelector('#quizQuestion');
var welcomeContainer = document.querySelector('#welcomeContainer');
var highScoresContainer = document.querySelector('#highScoresContainer');
var questionContainer = document.querySelector('#questionContainer');


// declare variables for multiple choices, 
var choicesUl = document.querySelector('.choicesUl');
var scoreText = document.querySelector('#highScoresContainer');
var hidden = document.querySelector('.hidden');
var timeLeft = document.querySelector('#timeLeft');

var secondsLeft = 75;
var intervalId;
var penalty = 15;
var holdInterval = 0;

var currentQuestion = {};
var acceptingAnswers = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];

var questionAmount = 5;
var SCORE_POINTS = timeLeft;

startBtn.addEventListener('click', function () {
    startQuiz();
});

function startQuiz() {
    welcomeContainer.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    
    startTimer();
    showQuestion(questionCounter);
}

function startTimer() {
    if (!intervalId) {
        intervalId = setInterval(function () {
            // secondsLeft--;
            timeLeft.textContent = --secondsLeft;
            
            if (secondsLeft <= 0) {
                clearInterval(intervalId);
                timerDone();
                timeLeft.textContent = "Time's Up!";
            }
        }, 1000);
    }
}

function showQuestion(questionCounter) {
    var listItem;
    var newItem;
    var ulCreate = document.createElement("ul");

    // TO DO: take the current question object from the questions array
    // using the questionCounter index
    var questionObject = questions[questionCounter];
    // TO DO: get the question text and assign it to the element that has the id quizQuestion
    questionText.innerHTML = "";
    quizQuestion.textContent = questionObject.question;
    for (var i = 0; i < questionObject.choices.length; i++) {
        // construct your list item (<li></li>)
        newItem = questionObject.choices[i];
        listItem = document.createElement("li");
        listItem.setAttribute("class", "choiceList");
        listItem.textContent = newItem;
        questionText.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", compare);
    }
}

function compare(event) {
    var element = event.target;

    if (element.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("class", "createDiv");
        if (element.textContent == questions[questionCounter].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is: " + questions[questionCounter].answer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is: " + questions[questionCounter].answer;
        }
    }
    questionCounter++;

    if (questionCounter >= questions.length) {
        timerDone();
        createDiv.textContent = "You've reached the end of the quiz!" + " " + "You got " + score + "/" + questions.length + " Correct!";
    } else {
        showQuestion(questionCounter);
    }
    quizQuestion.appendChild(createDiv);
}

function stopTimer() {
    clearInterval(intervalId);
    console.log(secondsLeft);
}

function timerDone() {
    stopTimer();
    timeLeft.textContent = secondsLeft;
    quizQuestion.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Finished!"
    quizQuestion.appendChild(createH1);

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");
    quizQuestion.appendChild(createP);

    if (timeLeft >= 0) {
        var timeRemaining = timeLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        quizQuestion.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    quizQuestion.appendChild(createLabel);

    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    quizQuestion.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    quizQuestion.appendChild(createSubmit);

    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        var currentScore = secondsLeft;

        clearInterval(holdInterval);
        timeLeft.textContent = "- -";
        
        if (initials === null) {
            console.log("No value entered!");
        } else {
            var finalScore = {
                initials: initials,
                score: currentScore
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // travel to high scores page
            window.location.replace("./highscores.html");
        }
    })
}