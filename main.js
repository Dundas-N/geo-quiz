const startQuiz = document.getElementById("startQuiz");
const displayQuiz = document.getElementById("displayQuiz");
const startPage = document.querySelectorAll("startPage");

startQuiz.addEventListener('click', showDisplayQuiz);

function showDisplayQuiz(){
    
    document.querySelector(".startPage").style.display="none";
    document.getElementById('displayQuiz').style.display = "grid";
}


// QUESTION PART
function Question(text, choices, answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.correctAnswer = function(choice) {
    return choice === this.answer;
}

//ACTUAL QUESTION SCORING
function Quiz(questions){
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

//answercheck
Quiz.prototype.getQuestionIndex = function(){
    return this.questions[this.questionIndex];
}

Quiz.prototype.hasEnded = function(){
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer){

    if(this.getQuestionIndex().correctAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

function populate() {
    if(quiz.hasEnded()) {
        showScores();
    } else {
        //show question
        let element = document.getElementById('question');
        element.innerHTML = quiz.getQuestionIndex().text;

        //show options
        let choices = quiz.getQuestionIndex().choices;

        for(let i = 0; i< choices.length; i++) {
            let element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
        showProgress();
    }
}

function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
}
 
 
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
 
}

function showScores() {
    let gameOverHtml = "<h1>Result</h1>";
    gameOverHtml += "<h2 id='score'>Score: " + quiz.score + "</h2>";
    let element = document.getElementById("quiz");
    // let element = document.querySelectorAll("quiz");
    element.innerHTML = gameOverHtml;
 
}

//array queestions
let questions = [
    new Question ("What is the capital of Uruguay?", ["Lima", "Montevideo", "Budapest", "Dakar"], "Montevideo"),
    new Question ("What is the capital of the Philippines?", ["Manila", "Kuala Lumpur", "Nur-Sultan", "Bogota"], "Manila"),
    new Question ("What is the largest island in Japan?", ["Borneo", "Honsu", "Luzon", "Shikoku"], "Honsu"),
    new Question ("How many states are in the US?", ["49", "55", "52", "50"], "50"),
    new Question ("What is the capital of Suriname?", ["Willemstad", "Oranjestad", "Paramaribo", "Dodoma"], "Paramaribo"),
    new Question ("What is the name of the worlds highest waterfall?", ["Angel Falls", "Niagara Falls", "Mongefossen", "Tugela Falls"], "Angel Falls"),
];

let quiz = new Quiz(questions);

populate();



