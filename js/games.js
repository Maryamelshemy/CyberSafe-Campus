// games.js - Interactive learning games

let currentGame = null;
let gameScore = 0;
let currentRound = 0;
const totalRounds = 5;

const phishingEmails = [
  {
    id: 1,
    subject: "Urgent: Your Account Will Be Suspended",
    sender: "security@your-bank.com",
    content: "Dear Customer, We've detected suspicious activity on your account. Click here immediately to verify your identity and prevent account suspension.",
    isPhishing: true,
    clues: ["Creates false urgency", "Generic greeting", "Suspicious link"]
  },
  {
    id: 2,
    subject: "Meeting Invitation: Project Review",
    sender: "manager@your-company.com",
    content: "Hi team, Please join the project review meeting tomorrow at 10 AM in Conference Room B. Agenda and documents attached.",
    isPhishing: false,
    clues: ["Specific details", "Professional tone", "No urgent demands"]
  },
  {
    id: 3,
    subject: "You've Won $1,000,000!",
    sender: "prizes@free-lottery.com",
    content: "CONGRATULATIONS! You've been selected as our grand prize winner. Click here to claim your $1,000,000 prize!",
    isPhishing: true,
    clues: ["Too good to be true", "Pressure to act quickly", "Suspicious sender"]
  },
  {
    id: 4,
    subject: "Password Reset Request",
    sender: "noreply@trusted-service.com",
    content: "We received a request to reset your password. If you made this request, click the link below. If not, please ignore this email.",
    isPhishing: false,
    clues: ["Provides safe alternative", "No pressure", "Legitimate sender"]
  },
  {
    id: 5,
    subject: "IMPORTANT: Package Delivery Failed",
    sender: "delivery@shipping-service.net",
    content: "Your package could not be delivered. Click here immediately to reschedule delivery or your package will be returned.",
    isPhishing: true,
    clues: ["False urgency", "Suspicious domain", "Demands immediate action"]
  }
];

function startPhishingGame() {
  currentGame = 'phishing';
  gameScore = 0;
  currentRound = 0;
  
  document.querySelector('section.py-5').classList.add('d-none');
  document.getElementById('gameInterface').classList.remove('d-none');
  
  loadPhishingRound();
}

function loadPhishingRound() {
  if (currentRound >= totalRounds) {
    endGame();
    return;
  }
  
  const email = phishingEmails[currentRound];
  const gameContainer = document.getElementById('gameContainer');
  
  gameContainer.innerHTML = `
    <div class="game-container">
      <div class="game-header">
        <div class="d-flex justify-content-between align-items-center">
          <h3 class="mb-0">Phishing Spotter</h3>
          <div>
            <span class="badge bg-light text-dark">Round ${currentRound + 1}/${totalRounds}</span>
            <span class="badge bg-light text-dark ms-2">Score: ${gameScore}</span>
          </div>
        </div>
      </div>
      <div class="card-body p-4">
        <div class="email-game">
          <div class="email-preview mb-4">
            <h5>From: ${email.sender}</h5>
            <h6>Subject: ${email.subject}</h6>
            <div class="email-content p-3 bg-light rounded mt-3">
              <p>${email.content}</p>
            </div>
          </div>
          
          <div class="game-instruction mb-4">
            <p class="text-center fw-bold">Is this email legitimate or a phishing attempt?</p>
          </div>
          
          <div class="game-actions text-center">
            <button class="btn btn-success btn-lg me-3" onclick="checkPhishingAnswer(false)">
              <i class="fas fa-check me-2"></i>Legitimate
            </button>
            <button class="btn btn-danger btn-lg" onclick="checkPhishingAnswer(true)">
              <i class="fas fa-times me-2"></i>Phishing
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function checkPhishingAnswer(userSaysPhishing) {
  const email = phishingEmails[currentRound];
  const isCorrect = userSaysPhishing === email.isPhishing;
  
  if (isCorrect) {
    gameScore++;
  }
  
  const gameContainer = document.getElementById('gameContainer');
  gameContainer.innerHTML += `
    <div class="result-card mt-4 p-4 ${isCorrect ? 'bg-success' : 'bg-danger'} text-white rounded">
      <h4><i class="fas fa-${isCorrect ? 'check' : 'times'}-circle me-2"></i>${isCorrect ? 'Correct!' : 'Incorrect!'}</h4>
      <p>This email is ${email.isPhishing ? 'a PHISHING attempt' : 'LEGITIMATE'}.</p>
      <div class="clues">
        <strong>Key clues:</strong>
        <ul>
          ${email.clues.map(clue => `<li>${clue}</li>`).join('')}
        </ul>
      </div>
      <button class="btn btn-light mt-3" onclick="nextRound()">
        ${currentRound < totalRounds - 1 ? 'Next Round' : 'See Results'}
      </button>
    </div>
  `;
}

function startPasswordGame() {
  currentGame = 'password';
  document.querySelector('section.py-5').classList.add('d-none');
  document.getElementById('gameInterface').classList.remove('d-none');
  
  loadPasswordGame();
}

function loadPasswordGame() {
  const gameContainer = document.getElementById('gameContainer');
  
  gameContainer.innerHTML = `
    <div class="game-container">
      <div class="game-header">
        <h3 class="mb-0">Password Defender</h3>
      </div>
      <div class="card-body p-4">
        <div class="password-game">
          <div class="game-instruction mb-4">
            <p>Enter passwords to see their strength rating and learn what makes them secure.</p>
          </div>
          
          <div class="password-input mb-4">
            <label for="passwordInput" class="form-label">Test a Password:</label>
            <input type="text" class="form-control form-control-lg" id="passwordInput" 
                   placeholder="Enter a password to analyze" onkeyup="checkPasswordStrength()">
          </div>
          
          <div class="strength-result mb-4">
            <div class="strength-label mb-2">
              <strong>Strength: </strong><span id="strengthText">Very Weak</span>
            </div>
            <div class="password-strength-meter strength-weak" id="strengthMeter"></div>
          </div>
          
          <div class="password-feedback">
            <div id="passwordFeedback"></div>
          </div>
          
          <div class="password-examples mt-5">
            <h5>Try these examples:</h5>
            <div class="d-flex gap-2 flex-wrap">
              <button class="btn btn-outline-primary btn-sm" onclick="testExample('password')">password</button>
              <button class="btn btn-outline-primary btn-sm" onclick="testExample('P@ssw0rd')">P@ssw0rd</button>
              <button class="btn btn-outline-primary btn-sm" onclick="testExample('MyDog123')">MyDog123</button>
              <button class="btn btn-outline-primary btn-sm" onclick="testExample('C0rrect!B@tterySt@ple')">C0rrect!B@tterySt@ple</button>
            </div>
          </div>
        </div>
        
        <div class="game-actions mt-4 text-center">
          <button class="btn btn-secondary" onclick="backToGames()">
            <i class="fas fa-arrow-left me-2"></i>Back to Games
          </button>
        </div>
      </div>
    </div>
  `;
}

function checkPasswordStrength() {
  const password = document.getElementById('passwordInput').value;
  const strengthText = document.getElementById('strengthText');
  const strengthMeter = document.getElementById('strengthMeter');
  const feedback = document.getElementById('passwordFeedback');
  
  let score = 0;
  let feedbackItems = [];
  
  // Length check
  if (password.length >= 12) score += 2;
  else if (password.length >= 8) score += 1;
  else feedbackItems.push('❌ Too short (aim for 12+ characters)');
  
  // Character variety
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  if (hasLower && hasUpper && hasNumbers && hasSpecial) score += 2;
  else if ((hasLower || hasUpper) && hasNumbers && hasSpecial) score += 1;
  else {
    if (!hasLower && !hasUpper) feedbackItems.push('❌ Add letters');
    if (!hasNumbers) feedbackItems.push('❌ Add numbers');
    if (!hasSpecial) feedbackItems.push('❌ Add special characters');
  }
  
  // Common patterns
  const commonPasswords = ['password', '123456', 'qwerty', 'letmein'];
  if (commonPasswords.includes(password.toLowerCase())) {
    score = 0;
    feedbackItems.push('❌ This is a very common password');
  }
  
  // Update display
  let strengthLevel, strengthClass;
  if (score >= 3) {
    strengthLevel = 'Very Strong';
    strengthClass = 'strength-very-strong';
    feedbackItems.unshift('✅ Excellent password!');
  } else if (score >= 2) {
    strengthLevel = 'Strong';
    strengthClass = 'strength-strong';
    feedbackItems.unshift('✅ Good password');
  } else if (score >= 1) {
    strengthLevel = 'Medium';
    strengthClass = 'strength-medium';
    feedbackItems.unshift('⚠️ Fair password - could be stronger');
  } else {
    strengthLevel = 'Weak';
    strengthClass = 'strength-weak';
    feedbackItems.unshift('❌ Weak password - easy to guess');
  }
  
  strengthText.textContent = strengthLevel;
  strengthMeter.className = `password-strength-meter ${strengthClass}`;
  feedback.innerHTML = feedbackItems.map(item => `<div class="mb-1">${item}</div>`).join('');
}

function testExample(password) {
  document.getElementById('passwordInput').value = password;
  checkPasswordStrength();
}

function nextRound() {
  currentRound++;
  loadPhishingRound();
}

function endGame() {
  const gameContainer = document.getElementById('gameContainer');
  const percentage = Math.round((gameScore / totalRounds) * 100);
  
  gameContainer.innerHTML = `
    <div class="game-container">
      <div class="game-header">
        <h3 class="mb-0">Game Complete!</h3>
      </div>
      <div class="card-body p-4 text-center">
        <div class="result-display mb-4">
          <i class="fas fa-trophy fa-4x text-warning mb-3"></i>
          <h2>Your Score: ${gameScore}/${totalRounds}</h2>
          <h4 class="text-primary">${percentage}%</h4>
          <p class="text-muted">${getGameMessage(percentage)}</p>
        </div>
        
        <div class="game-actions">
          <button class="btn btn-primary me-2" onclick="startPhishingGame()">
            <i class="fas fa-redo me-2"></i>Play Again
          </button>
          <button class="btn btn-outline-primary" onclick="backToGames()">
            <i class="fas fa-arrow-left me-2"></i>Back to Games
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Save game score if user is logged in
  if (isUserLoggedIn()) {
    saveGameScore(gameScore, totalRounds, 'Phishing Spotter');
  }
}

function getGameMessage(percentage) {
  if (percentage >= 90) return 'Outstanding! You\'re a phishing detection expert!';
  if (percentage >= 70) return 'Great job! You can spot most phishing attempts.';
  if (percentage >= 50) return 'Good awareness! Keep practicing to improve.';
  return 'Keep learning! Phishing detection is an important skill.';
}

function backToGames() {
  document.getElementById('gameInterface').classList.add('d-none');
  document.querySelector('section.py-5').classList.remove('d-none');
}

function saveGameScore(score, total, gameName) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return;
  
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  const percentage = Math.round((score / total) * 100);
  
  const newEntry = {
    username: user.username,
    score: score,
    total: total,
    percentage: percentage,
    type: 'game',
    game: gameName,
    date: new Date().toLocaleDateString(),
    timestamp: new Date().getTime()
  };
  
  leaderboard.push(newEntry);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

function isUserLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}
