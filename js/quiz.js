// quiz.js - Fixed for new authentication system

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let timer = null;
let timeLeft = 0;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Quiz system initialized');
    initializeQuizButtons();
    checkUserLoginStatus();
});

function initializeQuizButtons() {
    // Quiz type selection
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            quizOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
            
            const quizType = this.getAttribute('data-type');
            handleQuizTypeSelection(quizType);
        });
    });
    
    // Start quiz button
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startSelectedQuiz);
    }
    
    // Quiz navigation buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', showPreviousQuestion);
    if (nextBtn) nextBtn.addEventListener('click', showNextQuestion);
    if (submitBtn) submitBtn.addEventListener('click', submitQuiz);
}

function handleQuizTypeSelection(quizType) {
    const topicSelection = document.getElementById('topicSelection');
    
    if (quizType === 'topic') {
        topicSelection.classList.remove('d-none');
    } else {
        topicSelection.classList.add('d-none');
        // Clear any selected topics
        const topicRadios = document.querySelectorAll('input[name="topic"]');
        topicRadios.forEach(radio => radio.checked = false);
    }
}

function startSelectedQuiz() {
    const activeQuizOption = document.querySelector('.quiz-option.active');
    if (!activeQuizOption) {
        alert('Please select a quiz type first!');
        return;
    }
    
    const quizType = activeQuizOption.getAttribute('data-type');
    let topic = null;
    
    if (quizType === 'topic') {
        const selectedTopic = document.querySelector('input[name="topic"]:checked');
        if (!selectedTopic) {
            alert('Please select a topic for the quiz!');
            return;
        }
        topic = selectedTopic.value;
    }
    
    startQuiz(quizType, topic);
}

function startQuiz(quizType, topic = null) {
    console.log('Starting quiz:', quizType, topic);
    
    // Get quiz data
    currentQuiz = getQuizQuestions(quizType, topic);
    
    if (!currentQuiz || !currentQuiz.questions || currentQuiz.questions.length === 0) {
        alert('Quiz data not available. Please try again.');
        return;
    }
    
    // Reset quiz state
    currentQuestionIndex = 0;
    userAnswers = new Array(currentQuiz.questions.length).fill(null);
    
    // Hide selection, show quiz interface
    document.getElementById('quizSelection').classList.add('d-none');
    document.getElementById('quizInterface').classList.remove('d-none');
    document.getElementById('resultsSection').classList.add('d-none');
    
    // Setup timer
    if (currentQuiz.timeLimit) {
        timeLeft = currentQuiz.timeLimit;
        startTimer();
    }
    
    // Update quiz info
    document.getElementById('quizTitle').textContent = currentQuiz.title;
    document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
    
    // Display first question
    displayCurrentQuestion();
}

function displayCurrentQuestion() {
    if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
        endQuiz();
        return;
    }
    
    const question = currentQuiz.questions[currentQuestionIndex];
    const questionsContainer = document.getElementById('questionsContainer');
    const progressBar = document.getElementById('progressBar');
    const currentQuestionSpan = document.getElementById('currentQuestion');
    
    // Update progress
    const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Create question HTML
    questionsContainer.innerHTML = `
        <div class="question mb-4">
            <h4 class="mb-3">${question.text}</h4>
            <div class="options">
                ${question.options.map((option, index) => `
                    <div class="form-check mb-3">
                        <input class="form-check-input" type="radio" name="question${question.id}" 
                               id="option${question.id}_${index}" value="${index}"
                               ${userAnswers[currentQuestionIndex] === index ? 'checked' : ''}>
                        <label class="form-check-label" for="option${question.id}_${index}">
                            ${option}
                        </label>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Update navigation buttons
    updateNavigationButtons();
    
    // Add event listeners to radio buttons
    const radioButtons = questionsContainer.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            userAnswers[currentQuestionIndex] = parseInt(this.value);
            updateNavigationButtons();
        });
    });
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Next/Submit buttons
    const hasAnswer = userAnswers[currentQuestionIndex] !== null;
    
    if (currentQuestionIndex === currentQuiz.questions.length - 1) {
        nextBtn.classList.add('d-none');
        submitBtn.classList.remove('d-none');
        submitBtn.disabled = !hasAnswer;
    } else {
        nextBtn.classList.remove('d-none');
        submitBtn.classList.add('d-none');
        nextBtn.disabled = !hasAnswer;
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayCurrentQuestion();
    }
}

function showNextQuestion() {
    if (userAnswers[currentQuestionIndex] !== null && currentQuestionIndex < currentQuiz.questions.length - 1) {
        currentQuestionIndex++;
        displayCurrentQuestion();
    }
}

function submitQuiz(event) {
    if (event) event.preventDefault();
    
    if (userAnswers[currentQuestionIndex] === null) {
        alert('Please answer the current question before submitting.');
        return;
    }
    
    endQuiz();
}

function startTimer() {
    if (timer) clearInterval(timer);
    
    const timerDisplay = document.getElementById('timer');
    
    timer = setInterval(() => {
        timeLeft--;
        
        if (timerDisplay) {
            timerDisplay.textContent = formatTime(timeLeft);
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
    
    // Calculate score
    let score = 0;
    currentQuiz.questions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    
    const percentage = Math.round((score / currentQuiz.questions.length) * 100);
    
    // Show results section
    document.getElementById('quizInterface').classList.add('d-none');
    document.getElementById('resultsSection').classList.remove('d-none');
    
    // Update results display
    document.getElementById('scoreDisplay').textContent = `${score}/${currentQuiz.questions.length}`;
    document.getElementById('percentageDisplay').textContent = `${percentage}%`;
    
    // Show appropriate message
    const successMessage = document.getElementById('successMessage');
    const loginMessage = document.getElementById('loginMessage');
    const congratsText = document.getElementById('congratsText');
    
    if (isUserLoggedIn()) {
        successMessage.style.display = 'block';
        loginMessage.style.display = 'none';
        congratsText.textContent = getScoreMessage(percentage);
        saveScoreToLeaderboard(score, percentage, currentQuiz.title);
    } else {
        successMessage.style.display = 'none';
        loginMessage.style.display = 'block';
    }
}

function getScoreMessage(percentage) {
    if (percentage >= 90) return 'Excellent! You\'re a cybersecurity expert! Your score has been recorded.';
    if (percentage >= 70) return 'Great job! You have strong cybersecurity knowledge. Score recorded!';
    if (percentage >= 50) return 'Good effort! Keep learning to improve your skills. Score recorded.';
    return 'Keep studying! Cybersecurity is an important skill to master. Score recorded.';
}

// FIXED: Uses new authentication system
function isUserLoggedIn() {
    return localStorage.getItem('current_user') !== null;
}

function checkUserLoginStatus() {
    // Update UI based on login status using new system
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.username;
        document.getElementById('userInfo').classList.remove('d-none');
        document.getElementById('loginLink').classList.add('d-none');
    }
}

// FIXED: Uses new authentication system
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('current_user'));
    } catch (error) {
        return null;
    }
}

// FIXED: Uses new user database system
function saveScoreToLeaderboard(score, percentage, quizName) {
    const user = getCurrentUser();
    if (!user) return;
    
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    const newEntry = {
        username: user.username,
        score: score,
        percentage: percentage,
        quiz: quizName,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().getTime(),
        type: 'quiz'
    };
    
    leaderboard.push(newEntry);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    
    // Also update user's points in the database
    updateUserPoints(user.id, score * 10); // 10 points per correct answer
}

// FIXED: Updates user points in new database system
function updateUserPoints(userId, pointsToAdd) {
    const users = JSON.parse(localStorage.getItem('cybersafe_users')) || [];
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        if (!users[userIndex].points) {
            users[userIndex].points = 0;
        }
        users[userIndex].points += pointsToAdd;
        
        // Update completed quizzes
        if (!users[userIndex].completedQuizzes) {
            users[userIndex].completedQuizzes = [];
        }
        if (currentQuiz && !users[userIndex].completedQuizzes.includes(currentQuiz.id)) {
            users[userIndex].completedQuizzes.push(currentQuiz.id);
        }
        
        localStorage.setItem('cybersafe_users', JSON.stringify(users));
        
        // Update current session
        const currentSession = getCurrentUser();
        if (currentSession) {
            currentSession.points = users[userIndex].points;
            localStorage.setItem('current_user', JSON.stringify(currentSession));
        }
    }
}
