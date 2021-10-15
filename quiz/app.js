const questionNumber            = document.querySelector(".question-number");
const questionText              = document.querySelector(".question-text");
const optionContainer           = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox   = document.querySelector(".home-box");
const quizBox   = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push les questions dans le tableau availableQuestions
let setAvailableQuestion = () => {
    let choice1 = document.querySelector("#ten");
    let choice2 = document.querySelector("#eight");
    let choice3 = document.querySelector("#six");
    let choice4 = document.querySelector("#four");
    let choice5 = document.querySelector("#two");

    let totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        availableQuestions.push(quiz[i])       
    }   

}

// definition du numero de la question, les questions et les options
let getNewQuestion = () => {
    // definie le numero de la question
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " sur " + quiz.length;

    // definie les questions
    // question aleatoire
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;

    // Recupere la position de questionIndex du tableau availableQuestions
    const index1 = availableQuestions.indexOf(questionIndex);

    // Remove la questionIndex du tableau availableQuestions pour éviter que la question se répète dans une même serie
    availableQuestions.splice(index1,1);

    // definie les options
    // recupere la longueur des options
    const optionLen = currentQuestion.options.length
    
    // push les options dans le tableau availableOptions
    for (let i = 0; i < optionLen; i++) {
        availableOptions.push(i)        
    }

    optionContainer.innerHTML = "";
    let animationDelay = 0.2;
    // creation des options dans le html
    for (let i = 0; i < optionLen; i++) {
        
        /*
        // option aleatoire
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];

        // recupere la postion de optionIndex du tableau availableOptions
        const index2 = availableOptions.indexOf(optionIndex);

        // remove l'optionIndex du tableau availableOptions pour éviter les repetitions
        availableOptions.splice(index2,1);
        */

        // creation des options
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        option.id = i;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.2;
        option.className = "option";
        optionContainer.appendChild(option)   
        option.setAttribute("onclick", "getResult(this)");    
    }

    questionCounter++;
}

// recupere le resultat de la tentative de reponse a la question
let getResult = (element) => {
    const id = parseInt(element.id);

    // recupere la reponse par comparaison avec l'id de l'option
    if (id === currentQuestion.answer) {
        // selectionne en vert pour reponse correct
        element.classList.add("correct");

        // indicateur de bonne reponse
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        // selectionne en rouge pour une mauvaise reponse 
        element.classList.add("wrong");

        // indicateur de mauvaise reponse
        updateAnswerIndicator("wrong")

        // va montrer quelle était la bonne reponse en cas de mauvaise reponse est incorrect
        const optionLen = optionContainer.children.length;
        for (let i = 0; i < optionLen; i++) {
            if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
            
        }
    }
    attempt++;
    unclickableOptions();
}

// Pour rendre incliquable une fois la reponse déjà donner
let unclickableOptions = () => {
    const optionLen = optionContainer.children.length;
    for (let i=0 ; i< optionLen; i++) {
        optionContainer.children[i].classList.add("already-answered");
        
    }
}

// indicateur de reponse
let answersIndicator = () => {
    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for (let i = 0; i < totalQuestion; i++) {
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);  
    }
}

// type d'indicateur de reponse
let updateAnswerIndicator = (markType) => {
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

// button suivant
let buttonNext = document.querySelector("#next");
buttonNext.addEventListener("click", () => {
    if (questionCounter === quiz.length) {
        quizOver();
    } else{
        getNewQuestion();
    }
})

// recupere le resultat
let quizResult = () => {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length)*100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

// quiz terminer
let quizOver = () =>{

    // cache le quiz box
    quizBox.classList.add("hide");

    // affiche le resultat
    resultBox.classList.remove("hide");
    quizResult();
}

// reset le quiz
let resetQuiz = () => {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
}

// button rejouer
let buttonReplay = document.querySelector("#replay");
buttonReplay.addEventListener("click", () => {
    
    // cache resultatBox
    resultBox.classList.add("hide");

    // affiche quizBox
    quizBox.classList.remove("hide");
    
    resetQuiz();
    startQuiz();
})

let buttonMain = document.querySelector("#main");
buttonMain.addEventListener("click", () => {
    
    // cache resultatBox
    resultBox.classList.add("hide");

    // affiche quizBox
    homeBox.classList.remove("hide");  
    resetQuiz();
    
})

// commencer le quiz
let startQuiz = () => {
       
    // cache home box
    homeBox.classList.add("hide");
    // affiche quiz box
    quizBox.classList.remove("hide");

    // va definir tout les questions dans le tableau availableQuestions
    setAvailableQuestion();

    // appelle la fonction getNewQuestion();
    getNewQuestion();

    // creer un indicateur de reponses
    answersIndicator();
    
}

window.onload = function () {
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}