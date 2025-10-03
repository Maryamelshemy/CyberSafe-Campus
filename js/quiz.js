// js/quiz.js - Complete quiz functionality

let currentQuiz = null;
let currentQuestionIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 0;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz system initialized');
    initializeQuizButtons();
    
    // Check if we're already on a quiz page
    if (window.location.pathname.includes('quiz.html')) {
        setupQuizPage();
    }
});

function initializeQuizButtons() {
    // Add click events to all quiz buttons
    const quizButtons = document.querySelectorAll('[data-quiz], .quiz-btn, .start-quiz, .quiz-card');
    
    quizButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const quizType = this.getAttribute('data-quiz-type') || 'comprehensive';
            const topic = this.getAttribute('data-topic');
            console.log('Starting quiz:', quizType, topic);
            startQuiz(quizType, topic);
        });
    });
    
    console.log('Initialized quiz buttons:', quizButtons.length);
}

function setupQuizPage() {
    // If we're on quiz.html, set up the interface
    const urlParams = new URLSearchParams(window.location.search);
    const quizType = urlParams.get('type') || 'comprehensive';
    const topic = urlParams.get('topic');
    
    if (quizType || topic) {
        startQuiz(quizType, topic);
    }
}

function startQuiz(quizType, topic = null) {
    console.log('Starting quiz:', quizType, topic);
    
    // Get quiz data
    currentQuiz = getQuizQuestions(quizType, topic);
    
    if (!currentQuiz || !currentQuiz.questions) {
        console.error('Quiz data not found');
        showError('Quiz data not available. Please try again.');
        return;
    }
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    
    // Redirect to quiz page if not already there
    if (!window.location.pathname.includes('quiz.html')) {
        window.location.href = `quiz.html?type=${quizType}${topic ? '&topic=' + topic : ''}`;
        return;
    }
    
    // Setup timer if available
    if (currentQuiz.timeLimit) {
        timeLeft = currentQuiz.timeLimit;
        startTimer();
    }
    
    // Show quiz interface
    showQuizInterface();
    
    // Display first question
    displayCurrentQuestion();
}

function showQuizInterface() {
    // Hide any other sections and show quiz container
    const sections = document.querySelectorAll('section, .container');
    sections.forEach(section => {
        if (section.id !== 'quiz-container') {
            section.style.display = 'none';
        }
    });
    
    const quizContainer = document.getElementById('quiz-container');
    if (quizContainer) {
        quizContainer.style.display = 'block';
        quizContainer.innerHTML = '<div class="quiz-loading">Loading quiz...</div>';
    }
}

function displayCurrentQuestion() {
    if (!currentQuiz || !currentQuiz.questions[currentQuestionIndex]) {
        endQuiz();
        return;
    }
    
    const question = currentQuiz.questions[currentQuestionIndex];
    const quizContainer = document.getElementById('quiz-container');
    
    if (!quizContainer) return;
    
    quizContainer.innerHTML = `
        <div class="quiz-header">
            <h2 id="quiz-title">${currentQuiz.title}</h2>
            <div class="quiz-progress">
                <span>Question ${currentQuestionIndex + 1} of ${currentQuiz.questions.length}</span>
                ${currentQuiz.timeLimit ? `<div class="timer">Time Left: <span id="time-left">${formatTime(timeLeft)}</span></div>` : ''}
            </div>
        </div>
        
        <div class="question-container">
            <h3 class="question-text">${question.text}</h3>
            <div class="options-container">
                ${question.options.map((option, index) => `
                    <button class="option-btn" data-answer="${index}">
                        <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                        <span class="option-text">${option}</span>
                    </button>
                `).join('')}
            </div>
        </div>
        
        <div class="quiz-controls">
            <button id="next-btn" class="btn-primary" style="display: none;">Next Question</button>
        </div>
    `;
    
    // Add event listeners
    const optionButtons = document.querySelectorAll('.option-btn');
    optionButtons.forEach(button => {
        button.addEventListener('click', handleAnswer);
    });
    
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
}

function handleAnswer(e) {
    const selectedAnswer = parseInt(e.target.closest('.option-btn').getAttribute('data-answer'));
    const question = currentQuiz.questions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    optionButtons.forEach(button => {
        button.disabled = true;
        button.style.cursor = 'not-allowed';
    });
    
    // Show correct/incorrect
    optionButtons.forEach((button, index) => {
        if (index === question.correctAnswer) {
            button.classList.add('correct');
        } else if (index === selectedAnswer && index !== question.correctAnswer) {
            button.classList.add('incorrect');
        }
    });
    
    // Update score
    if (selectedAnswer === question.correctAnswer) {
        score++;
    }
    
    // Show explanation
    const questionContainer = document.querySelector('.question-container');
    const explanationDiv = document.createElement('div');
    explanationDiv.className = 'explanation';
    explanationDiv.innerHTML = `
        <div class="explanation-content">
            <strong>Explanation:</strong> ${question.explanation}
        </div>
    `;
    questionContainer.appendChild(explanationDiv);
    
    // Show next button
    document.getElementById('next-btn').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuiz.questions.length) {
        displayCurrentQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    if (timer) clearInterval(timer);
    
    timer = setInterval(() => {
        timeLeft--;
        
        const timeDisplay = document.getElementById('time-left');
        if (timeDisplay) {
            timeDisplay.textContent = formatTime(timeLeft);
        }
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function endQuiz() {
    if (timer) clearInterval(timer);
    
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    
    quizContainer.innerHTML = `
        <div class="quiz-results">
            <div class="result-card">
                <h2>🎉 Quiz Complete!</h2>
                <div class="score-display">
                    <h3>Your Score: ${score}/${currentQuiz.questions.length}</h3>
                    <div class="percentage">${percentage}%</div>
                    <p class="score-message">${getScoreMessage(percentage)}</p>
                </div>
                <div class="quiz-actions">
                    <button id="retry-quiz" class="btn-primary">Retry Quiz</button>
                    <button id="back-to-lessons" class="btn-secondary">Back to Lessons</button>
                    <button id="view-leaderboard" class="btn-secondary">View Leaderboard</button>
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners to result buttons
    document.getElementById('retry-quiz').addEventListener('click', () => {
        startQuiz(currentQuiz.id);
    });
    
    document.getElementById('back-to-lessons').addEventListener('click', () => {
        window.location.href = 'lessons.html';
    });
    
    document.getElementById('view-leaderboard').addEventListener('click', () => {
        window.location.href = 'leaderboard.html';
    });
}

function getScoreMessage(percentage) {
    if (percentage >= 90) return 'Excellent! You\'re a cybersecurity expert!';
    if (percentage >= 70) return 'Great job! You have strong cybersecurity knowledge.';
    if (percentage >= 50) return 'Good effort! Keep learning to improve your skills.';
    return 'Keep studying! Cybersecurity is an important skill to master.';
}

function showError(message) {
    alert(message); // You can replace this with a better error display
}
