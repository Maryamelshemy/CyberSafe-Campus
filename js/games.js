// games.js - Enhanced with 6 interactive games
let currentGame = null;
let gameScore = 0;
let currentRound = 0;
const totalRounds = 3;

// Enhanced game data with images/GIFs
const phishingEmails = [
    {
        id: 1,
        subject: "Urgent: Your Account Will Be Suspended",
        sender: "security@yourbank.com",
        content: "Dear customer, we detected suspicious activity on your account. Click here to verify your identity immediately or your account will be suspended within 24 hours.",
        isPhishing: true,
        clues: ["Creates false urgency", "Generic greeting", "Suspicious link"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 2,
        subject: "Quarterly Security Newsletter",
        sender: "newsletter@microsoft.com",
        content: "Hello, here's our latest security updates and best practices for keeping your systems secure. This is a regular educational newsletter.",
        isPhishing: false,
        clues: ["Educational content", "No urgent action required", "Legitimate sender"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const passwordExamples = [
    {
        password: "password123",
        strength: "Very Weak",
        reason: "Common word with sequential numbers",
        image: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        password: "P@ssw0rd!",
        strength: "Weak", 
        reason: "Common pattern with simple substitutions",
        image: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const malwareExamples = [
    {
        type: "Ransomware",
        description: "Encrypts your files and demands payment to restore access",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        protection: "Regular backups and updated antivirus"
    },
    {
        type: "Trojan Horse",
        description: "Disguised as legitimate software but contains malicious code",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        protection: "Download software only from official sources"
    }
];

const socialEngineeringScenarios = [
    {
        scenario: "A caller claims to be from IT support asking for your password",
        isDangerous: true,
        image: "https://images.unsplash.com/photo-1551836026-d5c88ac5d691?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "A colleague asks for help with a work project",
        isDangerous: false,
        image: "https://images.unsplash.com/photo-1551836026-d5c88ac5d691?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const networkScenarios = [
    {
        scenario: "Public Wi-Fi without VPN protection",
        isSecure: false,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Home network with WPA3 encryption",
        isSecure: true,
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const privacyScenarios = [
    {
        scenario: "Sharing location data with all apps",
        isPrivate: false,
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Using privacy-focused browser with tracking protection",
        isPrivate: true,
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('Enhanced games system initialized');
    checkUserLoginStatus();
});

// Game initialization functions
function startPhishingGame() {
    if (!isUserLoggedIn()) {
        alert('Please log in to play games and save your progress!');
        window.location.href = 'login.html?redirect=games.html';
        return;
    }

    currentGame = 'phishing';
    gameScore = 0;
    currentRound = 0;
    
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

function startMalwareGame() {
    if (!isUserLoggedIn()) {
        alert('Please log in to play games and save your progress!');
        window.location.href = 'login.html?redirect=games.html';
        return;
    }

    currentGame = 'malware';
    gameScore = 0;
    currentRound = 0;
    
    document.querySelector('section.py-5').classList.add('d-none');
    document.getElementById('gameInterface').classList.remove('d-none');
    
    loadMalwareRound();
}

function startSocialGame() {
    if (!isUserLoggedIn()) {
        alert('Please log in to play games and save your progress!');
        window.location.href = 'login.html?redirect=games.html';
        return;
    }

    currentGame = 'social';
    gameScore = 0;
    currentRound = 0;
    
    document.querySelector('section.py-5').classList.add('d-none');
    document.getElementById('gameInterface').classList.remove('d-none');
    
    loadSocialRound();
}

function startNetworkGame() {
    if (!isUserLoggedIn()) {
        alert('Please log in to play games and save your progress!');
        window.location.href = 'login.html?redirect=games.html';
        return;
    }

    currentGame = 'network';
    gameScore = 0;
    currentRound = 0;
    
    document.querySelector('section.py-5').classList.add('d-none');
    document.getElementById('gameInterface').classList.remove('d-none');
    
    loadNetworkRound();
}

function startPrivacyGame() {
    if (!isUserLoggedIn()) {
        alert('Please log in to play games and save your progress!');
        window.location.href = 'login.html?redirect=games.html';
        return;
    }

    currentGame = 'privacy';
    gameScore = 0;
    currentRound = 0;
    
    document.querySelector('section.py-5').classList.add('d-none');
    document.getElementById('gameInterface').classList.remove('d-none');
    
    loadPrivacyRound();
}

// Game round loading functions
function loadPhishingRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    const email = phishingEmails[currentRound % phishingEmails.length];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Phishing Spotter - Round ${currentRound + 1}/${totalRounds}</h3>
            <p>Is this email legitimate or a phishing attempt?</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="text-center mb-4">
            <img src="${email.image}" alt="Email example" class="game-gif rounded">
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

    const password = passwordExamples[currentRound % passwordExamples.length];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Password Defender - Round ${currentRound + 1}/${totalRounds}</h3>
            <p>Rate the strength of this password:</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="text-center mb-4">
            <img src="${password.image}" alt="Password security" class="game-gif rounded">
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

function loadMalwareRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    const malware = malwareExamples[currentRound % malwareExamples.length];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Malware Hunter - Round ${currentRound + 1}/${totalRounds}</h3>
            <p>Identify the malware type and protection method:</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="text-center mb-4">
            <img src="${malware.image}" alt="Malware protection" class="game-gif rounded">
        </div>
        
        <div class="malware-example card mb-4">
            <div class="card-body">
                <h5>${malware.type}</h5>
                <p>${malware.description}</p>
            </div>
        </div>
        
        <div class="game-actions text-center">
            <div class="alert alert-info">
                <strong>Protection Tip:</strong> ${malware.protection}
            </div>
            <button class="btn btn-primary btn-lg" onclick="nextMalwareRound()">
                Continue
            </button>
        </div>
    `;
}

function loadSocialRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    const scenario = socialEngineeringScenarios[currentRound % socialEngineeringScenarios.length];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Social Engineering Challenge - Round ${currentRound + 1}/${totalRounds}</h3>
            <p>Is this scenario dangerous or safe?</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="text-center mb-4">
            <img src="${scenario.image}" alt="Social engineering" class="game-gif rounded">
        </div>
        
        <div class="scenario-example card mb-4">
            <div class="card-body text-center">
                <p class="lead">"${scenario.scenario}"</p>
            </div>
        </div>
        
        <div class="game-actions text-center">
            <button class="btn btn-danger btn-lg me-3" onclick="checkSocialAnswer(true)">
                Dangerous
            </button>
            <button class="btn btn-success btn-lg" onclick="checkSocialAnswer(false)">
                Safe
            </button>
        </div>
    `;
}

function loadNetworkRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    const scenario = networkScenarios[currentRound % networkScenarios.length];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Network Defender - Round ${currentRound + 1}/${totalRounds}</h3>
            <p>Is this network configuration secure?</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="text-center mb-4">
            <img src="${scenario.image}" alt="Network security" class="game-gif rounded">
        </div>
        
        <div class="scenario-example card mb-4">
            <div class="card-body text-center">
                <p class="lead">${scenario.scenario}</p>
            </div>
        </div>
        
        <div class="game-actions text-center">
            <button class="btn btn-success btn-lg me-3" onclick="checkNetworkAnswer(true)">
                Secure
            </button>
            <button class="btn btn-danger btn-lg" onclick="checkNetworkAnswer(false)">
                Insecure
            </button>
        </div>
    `;
}

function loadPrivacyRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    const scenario = privacyScenarios[currentRound % privacyScenarios.length];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Data Privacy Challenge - Round ${currentRound + 1}/${totalRounds}</h3>
            <p>Is this practice privacy-friendly?</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="text-center mb-4">
            <img src="${scenario.image}" alt="Data privacy" class="game-gif rounded">
        </div>
        
        <div class="scenario-example card mb-4">
            <div class="card-body text-center">
                <p class="lead">${scenario.scenario}</p>
            </div>
        </div>
        
        <div class="game-actions text-center">
            <button class="btn btn-success btn-lg me-3" onclick="checkPrivacyAnswer(true)">
                Private
            </button>
            <button class="btn btn-danger btn-lg" onclick="checkPrivacyAnswer(false)">
                Not Private
            </button>
        </div>
    `;
}

// Answer checking functions
function checkPhishingAnswer(userSaidPhishing) {
    const email = phishingEmails[currentRound % phishingEmails.length];
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
    const password = passwordExamples[currentRound % passwordExamples.length];
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

function nextMalwareRound() {
    gameScore += 10;
    showGameFeedback('Good job! +10 points', 'success', ['Keep learning about malware protection!']);
    
    currentRound++;
    setTimeout(loadMalwareRound, 3000);
}

function checkSocialAnswer(userSaidDangerous) {
    const scenario = socialEngineeringScenarios[currentRound % socialEngineeringScenarios.length];
    const isCorrect = (userSaidDangerous === scenario.isDangerous);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', ['You recognized the social engineering attempt!']);
    } else {
        showGameFeedback('Incorrect! 😞', 'danger', ['Be careful with unexpected requests for information']);
    }
    
    currentRound++;
    setTimeout(loadSocialRound, 3000);
}

function checkNetworkAnswer(userSaidSecure) {
    const scenario = networkScenarios[currentRound % networkScenarios.length];
    const isCorrect = (userSaidSecure === scenario.isSecure);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', ['Good network security awareness!']);
    } else {
        showGameFeedback('Incorrect! 😞', 'danger', ['Always use secure network configurations']);
    }
    
    currentRound++;
    setTimeout(loadNetworkRound, 3000);
}

function checkPrivacyAnswer(userSaidPrivate) {
    const scenario = privacyScenarios[currentRound % privacyScenarios.length];
    const isCorrect = (userSaidPrivate === scenario.isPrivate);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', ['Excellent privacy awareness!']);
    } else {
        showGameFeedback('Incorrect! 😞', 'danger', ['Protect your personal data online']);
    }
    
    currentRound++;
    setTimeout(loadPrivacyRound, 3000);
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
    const gameNames = {
        'phishing': 'Phishing Spotter',
        'password': 'Password Defender',
        'malware': 'Malware Hunter',
        'social': 'Social Engineering Challenge',
        'network': 'Network Defender',
        'privacy': 'Data Privacy Challenge'
    };
    
    const gameName = gameNames[currentGame] || 'Cybersecurity Game';
    
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
    } else if (currentGame === 'password') {
        startPasswordGame();
    } else if (currentGame === 'malware') {
        startMalwareGame();
    } else if (currentGame === 'social') {
        startSocialGame();
    } else if (currentGame === 'network') {
        startNetworkGame();
    } else if (currentGame === 'privacy') {
        startPrivacyGame();
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
