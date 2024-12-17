const questions = [
    {
        question: "1.What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Markup Language",
            "Hyperlink and Text Management Language",
            "Home Tool Markup Language"
        ],
        correctAnswer: "Hyper Text Markup Language"
    },
    {
        question: "2.Which HTML attribute is used to include external CSS?",
        options: [
            "script",
            "src",
            "link",
            "style"
        ],
        correctAnswer: "link"
    },
    
    {
        question: "3.What does CSS stand for?",
        options: [
            "Cascading Style Sheets",
            "Computer Style System",
            "Creative Styling Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: "Cascading Style Sheets"
    },
    {
        question: "4.Which property is used to change the background color in CSS?",
        options: [
            "color",
            "font-color",
            "background-color",
            "bgcolor"
        ],
        correctAnswer: "background-color"
    },
    {
        question: "5.Which of the following is a JavaScript framework?",
        options: [
            "React",
            "HTML",
            "CSS",
            "Bootstrap"
        ],
        correctAnswer: "React"
    },
    // {
    //     question: "6.Which HTML attribute is used to include external CSS?",
    //     options: [
    //         "script",
    //         "src",
    //         "link",
    //         "style"
    //     ],
    //     correctAnswer: "link"
    // },
    // {
    //     question: "7.Which of the following is used to declare a variable in JavaScript?",
    //     options: [
    //         "var",
    //         "let",
    //         "const",
    //         "All of the above"
    //     ],
    //     correctAnswer: "All of the above"
    // },
    // {
    //     question: "8.What is the correct syntax to display 'Hello World' in an alert box using JavaScript?",
    //     options: [
    //         "alertBox('Hello World');",
    //         "msg('Hello World');",
    //         "alert('Hello World');",
    //         "console.log('Hello World');"
    //     ],
    //     correctAnswer: "alert('Hello World');"
    // },
    // {
    //     question: "9.What is the purpose of the `alt` attribute in an `<img>` tag?",
    //     options: [
    //         "To change the image size",
    //         "To specify an alternate text for the image",
    //         "To link the image to another page",
    //         "To add a caption under the image"
    //     ],
    //     correctAnswer: "To specify an alternate text for the image"
    // },
    // {
    //     question: "10.Which CSS property is used to make text bold?",
    //     options: [
    //         "font-weight",
    //         "text-bold",
    //         "bold",
    //         "font-style"
    //     ],
    //     correctAnswer: "font-weight"
    // },
    // {
    //     question: "11.Which of the following is used to add interactivity to a webpage?",
    //     options: [
    //         "HTML",
    //         "CSS",
    //         "JavaScript",
    //         "SQL"
    //     ],
    //     correctAnswer: "JavaScript"
    // },
    // {
    //     question: "12.What is the default display property of a `<div>` element?",
    //     options: [
    //         "inline",
    //         "block",
    //         "inline-block",
    //         "flex"
    //     ],
    //     correctAnswer: "block"
    // }
];

let currentQuestionIndex = 0;
let userAnswers = Array(questions.length).fill(null);
let score = 0;

// DOM Elements
const startContainer = document.getElementById("start-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");

const usernameInput = document.getElementById("username");
const startButton = document.getElementById("start-button");

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

const finalScoreElement = document.getElementById("final-score");
const answersElement = document.getElementById("answers");
const restartButton = document.getElementById("restart-button");

// Start the Quiz
startButton.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    if (username) {
        startContainer.style.display = "none";
        quizContainer.style.display = "block";
        loadQuestion();
    } else {
        alert("Please enter your name to start the quiz.");
    }
});

// Load Question
function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = "";

    question.options.forEach((option) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.classList.add("option");

        if (userAnswers[currentQuestionIndex] === option) {
            li.classList.add("selected");
        }

        li.addEventListener("click", () => selectAnswer(option));
        optionsElement.appendChild(li);
    });

    prevButton.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    nextButton.textContent = currentQuestionIndex === questions.length - 1 ? "Finish" : "Next";
}

// Select an Answer
function selectAnswer(option) {
    userAnswers[currentQuestionIndex] = option;
    loadQuestion();
}

// Next Button
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
});

// Previous Button
prevButton.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

// Show Result
function showResult() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";

    score = userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;

    finalScoreElement.textContent = `Your Score: ${score} / ${questions.length}`;

    let resultHTML = "<h3>Answers:</h3><ul>";
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index] || "Skipped";
        const correctAnswer = question.correctAnswer;

        resultHTML += `
           <li>
                <strong>${question.question}</strong><br>
                Your Answer: <span style="color: ${userAnswer === correctAnswer ? 'green' : 'red'};">${userAnswer}</span><br>
                Correct Answer: <span style="color: green;">${correctAnswer}</span>
            </li>
        
        `;
    });
    resultHTML += "</ul>";
    answersElement.innerHTML = resultHTML;
}

// Restart Button
restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    userAnswers = Array(questions.length).fill(null);
    score = 0;
    resultContainer.style.display = "none";
    startContainer.style.display = "block";
});
