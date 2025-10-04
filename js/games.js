// games.js - Complete games functionality
let currentGame = null;
let gameScore = 0;
let currentRound = 0;
const totalRounds = 3;

// Phishing game data
const phishingEmails = [
    {
        id: 1,
        subject: "Urgent: Your Account Will Be Suspended",
        sender: "security@yourbank.com",
        content: "Dear customer, we detected suspicious activity on your account. Click here to verify your identity immediately or your account will be suspended within 24 hours.",
        isPhishing: true,
        clues: ["Creates false urgency", "Generic greeting", "Suspicious link"]
    },
    {
        id: 2,
        subject: "Quarterly Security Newsletter",
        sender: "newsletter@microsoft.com",
        content: "Hello, here's our latest security updates and best practices for keeping your systems secure. This is a regular educational newsletter.",
        isPhishing: false,
        clues: ["Educational content", "No urgent action required", "Legitimate sender"]
    },
    {
        id: 3,
        subject: "Package Delivery Failed",
        sender: "noreply@ups-delivery.com",
        content: "We attempted to deliver your package but failed. Click this link to reschedule delivery and pay the $2.50 redelivery fee.",
        isPhishing: true,
        clues: ["Unexpected delivery notice", "Requests payment", "Suspicious sender address"]
    }
];

// Password strength examples
const passwordExamples = [
    {
        password: "password123",
        strength: "Very Weak",
        reason: "Common word with sequential numbers"
    },
    {
        password: "P@ssw0rd!",
        strength: "Weak", 
        reason: "Common pattern with simple substitutions"
    },
    {
        password: "MyDogSpot2024!",
        strength: "Medium",
        reason: "Longer but uses personal information"
    },
    {
        password: "C0rrectH0rseB@tterySt@ple!",
        strength: "Strong",
        reason: "Long passphrase with mixed characters"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Games system initialized');
    checkUserLoginStatus();
});

function startPhishingGame() {
    if (!isUserLoggedIn()) {
        alert('Please log in to play games and save your progress!');
        window.location.href = 'login.html?redirect=games.html';
        return;
    }

    currentGame = 'phishing';
    gameScore = 0;
    currentRound = 0;
    
    // Show game interface
    document.querySelector('section.py-5').classList.add('d-none');
    document.getElementById('gameInterface').classList.remove('d-none');
    
    loadPhishingRound();
}

function startPasswordGame() {
    if (!isUserLoggedIn()) {
        alert('Please log in to play games and save your progress!');
        window.location.href = 'login.html?redirect=games.html';
        return;
    }

    currentGame = 'password';
    gameScore = 0;
    currentRound = 0;
    
    document.querySelector('section.py-5').classList.add('d-none');
    document.getElementById('gameInterface').classList.remove('d-none');
    
    loadPasswordRound();
}

function loadPhishingRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    const email = phishingEmails[currentRound];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Phishing Spotter - Round ${currentRound + 1}/${totalRounds}</h3>
            <p>Is this email legitimate or a phishing attempt?</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="email-preview card mb-4">
            <div class="card-header">
                <strong>From:</strong> ${email.sender}<br>
                <strong>Subject:</strong> ${email.subject}
            </div>
            <div class="card-body">
                <p>${email.content}</p>
            </div>
        </div>
        
        <div class="game-actions text-center">
            <button class="btn btn-danger btn-lg me-3" onclick="checkPhishingAnswer(true)">
                <i class="fas fa-fish me-2"></i>Phishing
            </button>
            <button class="btn btn-success btn-lg" onclick="checkPhishingAnswer(false)">
                <i class="fas fa-check me-2"></i>Legitimate
            </button>
        </div>
    `;
}

function loadPasswordRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    const password = passwordExamples[currentRound];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Password Defender - Round ${currentRound + 1}/${totalRounds}</h3>
            <p>Rate the strength of this password:</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="password-example card mb-4">
            <div class="card-body text-center">
                <h4 class="text-monospace">${password.password}</h4>
            </div>
        </div>
        
        <div class="game-actions text-center">
            <button class="btn btn-warning btn-lg me-2" onclick="checkPasswordAnswer('Very Weak')">
                Very Weak
            </button>
            <button class="btn btn-danger btn-lg me-2" onclick="checkPasswordAnswer('Weak')">
                Weak
            </button>
            <button class="btn btn-info btn-lg me-2" onclick="checkPasswordAnswer('Medium')">
                Medium
            </button>
            <button class="btn btn-success btn-lg" onclick="checkPasswordAnswer('Strong')">
                Strong
            </button>
        </div>
    `;
}

function checkPhishingAnswer(userSaidPhishing) {
    const email = phishingEmails[currentRound];
    const isCorrect = (userSaidPhishing === email.isPhishing);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', email.clues);
    } else {
        showGameFeedback('Incorrect! 😞', 'danger', email.clues);
    }
    
    currentRound++;
    setTimeout(loadPhishingRound, 3000);
}

function checkPasswordAnswer(userStrength) {
    const password = passwordExamples[currentRound];
    const isCorrect = (userStrength === password.strength);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', [password.reason]);
    } else {
        showGameFeedback(`Incorrect! The strength is: ${password.strength}`, 'danger', [password.reason]);
    }
    
    currentRound++;
    setTimeout(loadPasswordRound, 3000);
}

function showGameFeedback(message, type, clues) {
    const gameContainer = document.getElementById('gameContainer');
    const feedback = document.createElement('div');
    
    feedback.className = `alert alert-${type} mt-3`;
    feedback.innerHTML = `
        <h5>${message}</h5>
        ${clues ? `<p><strong>Clues:</strong> ${clues.join(', ')}</p>` : ''}
    `;
    
    gameContainer.appendChild(feedback);
}

function endGame() {
    const gameContainer = document.getElementById('gameContainer');
    const user = getCurrentUser();
    
    gameContainer.innerHTML = `
        <div class="game-complete text-center">
            <i class="fas fa-trophy fa-4x text-warning mb-3"></i>
            <h2>Game Complete!</h2>
            <p class="lead">Your final score: ${gameScore} points</p>
            
            ${user ? `
                <div class="alert alert-success">
                    <p>Your score has been saved to the leaderboard!</p>
                </div>
                <button class="btn btn-primary me-2" onclick="saveGameScore()">Save Score</button>
            ` : `
                <div class="alert alert-warning">
                    <p>Log in to save your score to the leaderboard!</p>
                </div>
            `}
            
            <button class="btn btn-outline-primary me-2" onclick="playAgain()">Play Again</button>
            <button class="btn btn-outline-secondary" onclick="backToGames()">Back to Games</button>
        </div>
    `;
    
    if (user) {
        saveGameScore();
    }
}

function saveGameScore() {
    const user = getCurrentUser();
    if (!user) return;
    
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const gameName = currentGame === 'phishing' ? 'Phishing Spotter' : 'Password Defender';
    
    const newEntry = {
        username: user.username,
        score: gameScore,
        percentage: Math.min(100, Math.round((gameScore / (totalRounds * 10)) * 100)),
        game: gameName,
        date: new Date().toLocaleDateString(),
        timestamp: new Date().getTime(),
        type: 'game'
    };
    
    leaderboard.push(newEntry);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    
    // Update user points
    updateUserPoints(user.id, gameScore);
    
    alert('Score saved successfully! 🎉');
}

function updateUserPoints(userId, pointsToAdd) {
    const users = JSON.parse(localStorage.getItem('cybersafe_users')) || [];
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        if (!users[userIndex].points) {
            users[userIndex].points = 0;
        }
        users[userIndex].points += pointsToAdd;
        localStorage.setItem('cybersafe_users', JSON.stringify(users));
        
        // Update current session
        const currentSession = getCurrentUser();
        if (currentSession) {
            currentSession.points = users[userIndex].points;
            localStorage.setItem('current_user', JSON.stringify(currentSession));
        }
    }
}

function playAgain() {
    if (currentGame === 'phishing') {
        startPhishingGame();
    } else {
        startPasswordGame();
    }
}

function backToGames() {
    document.getElementById('gameInterface').classList.add('d-none');
    document.querySelector('section.py-5').classList.remove('d-none');
}

// Authentication functions
function isUserLoggedIn() {
    return localStorage.getItem('current_user') !== null;
}

function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('current_user'));
    } catch (error) {
        return null;
    }
}

function checkUserLoginStatus() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.username;
        document.getElementById('userInfo').classList.remove('d-none');
        document.getElementById('loginLink').classList.add('d-none');
    }
}
