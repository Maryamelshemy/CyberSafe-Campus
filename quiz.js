// Quiz JavaScript - Updated with scoring and leaderboard integration

let currentQuiz = null;
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;
let timerInterval = null;
let timeLeft = 0;

document.addEventListener('DOMContentLoaded', function() {
  updateUserStatus();
  
  // Initialize quiz selection
  const quizOptions = document.querySelectorAll('.quiz-option[data-type]');
  quizOptions.forEach(option => {
    option.addEventListener('click', function() {
      // Remove selected class from all options
      quizOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to current option
      this.classList.add('selected');
      
      const quizType = this.dataset.type;
      
      // Show topic selection for topic-specific quizzes
      const topicSelection = document.getElementById('topicSelection');
      if (quizType === 'topic') {
        topicSelection.classList.remove('d-none');
      } else {
        topicSelection.classList.add('d-none');
      }
    });
  });
  
  // Start quiz button
  const startQuizBtn = document.getElementById('startQuizBtn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', startQuiz);
  }
  
  // Quiz navigation buttons
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitBtn = document.getElementById('submitBtn');
  
  if (prevBtn) prevBtn.addEventListener('click', prevQuestion);
  if (nextBtn) nextBtn.addEventListener('click', nextQuestion);
  if (submitBtn) submitBtn.addEventListener('click', finishQuiz);
});

function startQuiz() {
  const selectedQuizType = document.querySelector('.quiz-option.selected');
  if (!selectedQuizType) {
    showNotification('Please select a quiz type', 'warning');
    return;
  }
  
  const quizType = selectedQuizType.dataset.type;
  let topic = null;
  
  if (quizType === 'topic') {
    const selectedTopic = document.querySelector('input[name="topic"]:checked');
    if (!selectedTopic) {
      showNotification('Please select a topic', 'warning');
      return;
    }
    topic = selectedTopic.value;
  }
  
  // Hide selection and show quiz interface
  document.getElementById('quizSelection').style.display = 'none';
  document.getElementById('quizInterface').classList.remove('d-none');
  
  // Reset quiz state
  currentQuestionIndex = 0;
  userAnswers = [];
  quizScore = 0;
  
  // Load quiz data based on type and topic
  currentQuiz = getQuizData(quizType, topic);
  
  if (!currentQuiz) {
    showNotification('Quiz not found. Please select a valid quiz.', 'danger');
    showQuizSelection();
    return;
  }
  
  // Update quiz header
  document.getElementById('quizTitle').textContent = currentQuiz.title;
  document.getElementById('totalQuestions').textContent = currentQuiz.questions.length;
  
  // Set timer if applicable
  if (currentQuiz.timeLimit) {
    timeLeft = currentQuiz.timeLimit;
    document.getElementById('timer').style.display = 'inline-block';
    startTimer();
  } else {
    document.getElementById('timer').style.display = 'none';
  }
  
  // Display first question
  displayQuestion();
}

function getQuizData(quizType, topic = null) {
  if (quizType === 'comprehensive') {
    return {
      title: 'Comprehensive Cybersecurity Quiz',
      timeLimit: 600, // 10 minutes
      questions: [
        {
          id: 1,
          text: 'Which of the following is the strongest password?',
          options: [
            'password123',
            'P@ssw0rd!',
            'MyDogName2023',
            'C0rrectH0rseB@tterySt@ple!'
          ],
          correctAnswer: 3,
          explanation: 'The strongest password is long, complex, and uses a mix of character types without being predictable.',
          topic: 'password'
        },
        {
          id: 2,
          text: 'What is the primary goal of a phishing attack?',
          options: [
            'To encrypt your files for ransom',
            'To trick you into revealing sensitive information',
            'To overload a website with traffic',
            'To scan for open ports on your network'
          ],
          correctAnswer: 1,
          explanation: 'Phishing attacks aim to deceive users into providing sensitive data like passwords or credit card information.',
          topic: 'phishing'
        },
        {
          id: 3,
          text: 'Which of these is NOT a type of malware?',
          options: [
            'Virus',
            'Worm',
            'Firewall',
            'Trojan'
          ],
          correctAnswer: 2,
          explanation: 'A firewall is a security system that monitors network traffic, not a type of malware.',
          topic: 'malware'
        },
        {
          id: 4,
          text: 'What should you do if you receive a suspicious email asking for personal information?',
          options: [
            'Reply with the requested information',
            'Click on links to verify the sender',
            'Delete it without responding',
            'Forward it to all your contacts to warn them'
          ],
          correctAnswer: 2,
          explanation: 'The safest action is to delete suspicious emails without interacting with them.',
          topic: 'phishing'
        },
        {
          id: 5,
          text: 'What is two-factor authentication (2FA)?',
          options: [
            'Using two different passwords for the same account',
            'A security process that requires two different forms of identification',
            'Having two separate user accounts for the same service',
            'A backup authentication method when you forget your password'
          ],
          correctAnswer: 1,
          explanation: '2FA adds an extra layer of security by requiring something you know (password) and something you have (phone, token).',
          topic: 'password'
        }
      ]
    };
  } else if (quizType === 'topic' && topic) {
    // Topic-specific quizzes
    const topicQuizzes = {
      password: {
        title: 'Password Security Quiz',
        timeLimit: 300,
        questions: [
          {
            id: 1,
            text: 'What is the minimum recommended length for a strong password?',
            options: [
              '6 characters',
              '8 characters',
              '12 characters',
              '16 characters'
            ],
            correctAnswer: 2,
            explanation: 'Most security experts recommend at least 12 characters for a strong password.',
            topic: 'password'
          },
          {
            id: 2,
            text: 'Which of these is a good password practice?',
            options: [
              'Using the same password for multiple accounts',
              'Writing passwords on sticky notes',
              'Using a password manager',
              'Sharing passwords with close friends'
            ],
            correctAnswer: 2,
            explanation: 'Password managers help create and store strong, unique passwords for all your accounts.',
            topic: 'password'
          }
        ]
      },
      phishing: {
        title: 'Phishing Awareness Quiz',
        timeLimit: 300,
        questions: [
          {
            id: 1,
            text: 'What is a common indicator of a phishing email?',
            options: [
              'Personalized greeting with your name',
              'Urgent request for immediate action',
              'Professional-looking logo',
              'Links to the company website'
            ],
            correctAnswer: 1,
            explanation: 'Phishing emails often create a sense of urgency to prompt quick action without careful consideration.',
            topic: 'phishing'
          },
          {
            id: 2,
            text: 'What should you do if you receive a suspicious email?',
            options: [
              'Click on links to verify if it\'s legitimate',
              'Reply to ask for more information',
              'Report it to your IT department',
              'Forward it to colleagues to warn them'
            ],
            correctAnswer: 2,
            explanation: 'Reporting suspicious emails to IT professionals helps protect the entire organization.',
            topic: 'phishing'
          }
        ]
      },
      malware: {
        title: 'Malware Basics Quiz',
        timeLimit: 300,
        questions: [
          {
            id: 1,
            text: 'What is the main characteristic of a computer virus?',
            options: [
              'It spreads without user interaction',
              'It requires user action to replicate',
              'It only affects Windows computers',
              'It is always visible to the user'
            ],
            correctAnswer: 1,
            explanation: 'Viruses typically require user action, like opening a file, to spread.',
            topic: 'malware'
          },
          {
            id: 2,
            text: 'How does ransomware work?',
            options: [
              'It steals your personal information',
              'It encrypts your files and demands payment',
              'It slows down your computer',
              'It displays unwanted advertisements'
            ],
            correctAnswer: 1,
            explanation: 'Ransomware encrypts files and demands ransom for decryption.',
            topic: 'malware'
          }
        ]
      },
      social: {
        title: 'Social Engineering Quiz',
        timeLimit: 300,
        questions: [
          {
            id: 1,
            text: 'What is social engineering?',
            options: [
              'A type of computer virus',
              'Psychological manipulation of people',
              'A network security protocol',
              'A data encryption method'
            ],
            correctAnswer: 1,
            explanation: 'Social engineering manipulates people into breaking security procedures.',
            topic: 'social'
          },
          {
            id: 2,
            text: 'Which is an example of pretexting?',
            options: [
              'Sending a phishing email',
              'Creating a fake scenario to gain information',
              'Installing keylogger software',
              'Brute forcing a password'
            ],
            correctAnswer: 1,
            explanation: 'Pretexting involves creating a fabricated scenario to obtain information.',
            topic: 'social'
          }
        ]
      }
    };
    
    return topicQuizzes[topic] || null;
  }
  
  return null;
}

function displayQuestion() {
  if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
    finishQuiz();
    return;
  }
  
  const question = currentQuiz.questions[currentQuestionIndex];
  
  // Update progress
  document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
  document.getElementById('progressBar').style.width = `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%`;
  
  // Display question
  const questionsContainer = document.getElementById('questionsContainer');
  questionsContainer.innerHTML = `
    <h5 class="mb-4">${question.text}</h5>
    <div id="questionOptions"></div>
  `;
  
  // Display options
  const optionsContainer = document.getElementById('questionOptions');
  
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'quiz-option card mb-2 p-3';
    optionElement.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="quizOption" id="option${index}" value="${index}">
        <label class="form-check-label w-100" for="option${index}">
          ${option}
        </label>
      </div>
    `;
    
    optionElement.addEventListener('click', function() {
      const radioInput = this.querySelector('input[type="radio"]');
      radioInput.checked = true;
      
      // Remove selected class from all options
      document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      
      // Add selected class to current option
      this.classList.add('selected');
      
      // Save answer
      userAnswers[currentQuestionIndex] = parseInt(radioInput.value);
    });
    
    optionsContainer.appendChild(optionElement);
  });
  
  // Restore previous answer if exists
  if (userAnswers[currentQuestionIndex] !== undefined && userAnswers[currentQuestionIndex] !== null) {
    const radioInput = document.querySelector(`input[value="${userAnswers[currentQuestionIndex]}"]`);
    if (radioInput) {
      radioInput.checked = true;
      radioInput.closest('.quiz-option').classList.add('selected');
    }
  }
  
  // Update navigation buttons
  document.getElementById('prevBtn').disabled = currentQuestionIndex === 0;
  document.getElementById('nextBtn').style.display = currentQuestionIndex < currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
  document.getElementById('submitBtn').style.display = currentQuestionIndex === currentQuiz.questions.length - 1 ? 'inline-block' : 'none';
}

function nextQuestion() {
  currentQuestionIndex++;
  displayQuestion();
}

function prevQuestion() {
  currentQuestionIndex--;
  displayQuestion();
}

function finishQuiz() {
  // Clear timer
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  
  // Calculate score
  calculateScore();
  
  // Hide quiz container, show results
  document.getElementById('quizInterface').classList.add('d-none');
  document.getElementById('resultsSection').classList.remove('d-none');
  
  // Display results
  displayResults();
  
  // Save quiz results if user is logged in
  saveQuizResults();
}

function calculateScore() {
  if (!currentQuiz) return;
  
  let correctAnswers = 0;
  
  currentQuiz.questions.forEach((question, index) => {
    if (userAnswers[index] === question.correctAnswer) {
      correctAnswers++;
    }
  });
  
  quizScore = Math.round((correctAnswers / currentQuiz.questions.length) * 100);
}

function displayResults() {
  if (!currentQuiz) return;
  
  const correctAnswers = currentQuiz.questions.filter((question, index) => 
    userAnswers[index] === question.correctAnswer
  ).length;
  
  document.getElementById('scoreDisplay').textContent = `${correctAnswers}/${currentQuiz.questions.length}`;
  document.getElementById('percentageDisplay').textContent = `${quizScore}%`;
  
  // Display performance message
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const successMessage = document.getElementById('successMessage');
  const loginMessage = document.getElementById('loginMessage');
  
  if (currentUser) {
    successMessage.style.display = 'block';
    loginMessage.style.display = 'none';
  } else {
    successMessage.style.display = 'none';
    loginMessage.style.display = 'block';
  }
}

function saveQuizResults() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) return;
  
  // Initialize quizzes array if it doesn't exist
  if (!users[userIndex].quizzes) {
    users[userIndex].quizzes = [];
  }
  
  // Add quiz result
  const quizResult = {
    topic: currentQuiz.title,
    score: quizScore,
    percentage: quizScore,
    date: new Date().toISOString(),
    correctAnswers: currentQuiz.questions.filter((question, index) => 
      userAnswers[index] === question.correctAnswer
    ).length,
    totalQuestions: currentQuiz.questions.length
  };
  
  users[userIndex].quizzes.push(quizResult);
  
  // Award points based on performance
  if (!users[userIndex].points) {
    users[userIndex].points = 0;
  }
  
  // Base points + bonus for high scores
  let pointsEarned = 10; // Base points for completing a quiz
  if (quizScore >= 90) {
    pointsEarned += 20; // Bonus for excellent performance
  } else if (quizScore >= 70) {
    pointsEarned += 10; // Bonus for good performance
  }
  
  users[userIndex].points += pointsEarned;
  
  localStorage.setItem('users', JSON.stringify(users));
}

function startTimer() {
  updateTimerDisplay();
  
  timerInterval = setInterval(function() {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      finishQuiz();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  // Change color when time is running low
  if (timeLeft < 60) {
    document.getElementById('timer').className = 'badge bg-danger';
  } else if (timeLeft < 120) {
    document.getElementById('timer').className = 'badge bg-warning';
  } else {
    document.getElementById('timer').className = 'badge bg-light text-dark';
  }
}

function showQuizSelection() {
  document.getElementById('quizSelection').style.display = 'block';
  document.getElementById('quizInterface').classList.add('d-none');
  document.getElementById('resultsSection').classList.add('d-none');
}

// Notification system
function showNotification(message, type) {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 p-3';
  toast.style.zIndex = '11';
  
  const alertClass = type === 'success' ? 'alert-success' : 
                    type === 'warning' ? 'alert-warning' : 
                    type === 'danger' ? 'alert-danger' : 'alert-info';
  
  toast.innerHTML = `
    <div class="toast show" role="alert">
      <div class="toast-header">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'danger' ? 'times-circle' : 'info-circle'} text-${type} me-2"></i>
        <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
}