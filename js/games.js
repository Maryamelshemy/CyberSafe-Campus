// games.js - Enhanced with more variety and complexity
let currentGame = null;
let gameScore = 0;
let currentRound = 0;
const totalRounds = 5; // Increased from 3 to 5 for more variety

// Enhanced game data with more variety
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
    },
    {
        id: 3,
        subject: "Package Delivery Failed - Action Required",
        sender: "noreply@delivery-service.com",
        content: "We attempted to deliver your package but couldn't access your location. Please click the link below to reschedule delivery and pay the $2.50 redelivery fee.",
        isPhishing: true,
        clues: ["Unexpected delivery notice", "Requests payment", "Generic sender name"],
        image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 4,
        subject: "Your Subscription Renewal Confirmation",
        sender: "billing@netflix.com",
        content: "Your Netflix subscription has been successfully renewed. The amount of $15.99 has been charged to your card ending in 1234. If this wasn't you, please contact our support team.",
        isPhishing: false,
        clues: ["Transaction confirmation", "Specific amount mentioned", "Legitimate service"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        id: 5,
        subject: "Security Alert: Unusual Login Detected",
        sender: "noreply@google-accounts.com",
        content: "We noticed a new sign-in to your Google Account from a new device. If this was you, you can ignore this message. If not, secure your account immediately.",
        isPhishing: false,
        clues: ["Security notification", "No immediate action demanded", "Legitimate security practice"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const passwordExamples = [
    {
        password: "password123",
        strength: "Very Weak",
        reason: "Common word with sequential numbers - easily guessable",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        password: "P@ssw0rd!",
        strength: "Weak", 
        reason: "Common pattern with simple substitutions - vulnerable to dictionary attacks",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        password: "Summer2024!",
        strength: "Medium",
        reason: "Seasonal reference with common pattern - could be stronger with more randomness",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        password: "MyDogSpot2024!",
        strength: "Medium",
        reason: "Longer but uses personal information that could be guessed from social media",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        password: "C0rrectH0rseB@tterySt@ple!",
        strength: "Strong",
        reason: "Long passphrase with mixed characters, numbers, and symbols - very difficult to crack",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

// FIXED: Malware Hunter Game - Now with actual quiz questions
const malwareQuizQuestions = [
    {
        question: "What is the main characteristic of ransomware?",
        options: [
            "It steals your personal information",
            "It encrypts your files and demands payment",
            "It slows down your computer",
            "It displays unwanted advertisements"
        ],
        correctAnswer: 1,
        explanation: "Ransomware encrypts files and demands ransom for decryption."
    },
    {
        question: "How does a Trojan horse malware typically spread?",
        options: [
            "By replicating itself across networks",
            "By disguising itself as legitimate software",
            "Through email attachments only",
            "By exploiting browser vulnerabilities"
        ],
        correctAnswer: 1,
        explanation: "Trojans appear to be useful software but contain malicious code."
    },
    {
        question: "What is the primary purpose of spyware?",
        options: [
            "To encrypt your files",
            "To monitor your activity and collect information",
            "To overload your network",
            "To display advertisements"
        ],
        correctAnswer: 1,
        explanation: "Spyware secretly monitors user activity and collects sensitive information."
    },
    {
        question: "Which of these is NOT a common way to protect against malware?",
        options: [
            "Keeping software updated",
            "Using antivirus software",
            "Clicking on suspicious links to test them",
            "Being cautious with email attachments"
        ],
        correctAnswer: 2,
        explanation: "Clicking on suspicious links is dangerous and can lead to malware infection."
    },
    {
        question: "What should you do if you suspect your computer has malware?",
        options: [
            "Continue using it normally",
            "Run a antivirus scan immediately",
            "Ignore it and hope it goes away",
            "Share files with others to warn them"
        ],
        correctAnswer: 1,
        explanation: "Running an antivirus scan is the first step to identify and remove malware."
    }
];

const socialEngineeringScenarios = [
    {
        scenario: "A caller claims to be from IT support asking for your password to 'fix a system issue'",
        isDangerous: true,
        explanation: "Legitimate IT support will never ask for your password",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "A colleague asks for help with a work project and needs access to shared files",
        isDangerous: false,
        explanation: "Normal workplace collaboration within established procedures",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Someone claiming to be from HR sends an email asking you to confirm your social security number for 'records update'",
        isDangerous: true,
        explanation: "Sensitive personal information should never be shared via email",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "A person at the office entrance says they forgot their badge and asks you to let them in",
        isDangerous: true,
        explanation: "This is tailgating - always verify identity through proper channels",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Your manager sends a Teams message asking you to join a planning meeting",
        isDangerous: false,
        explanation: "Normal workplace communication through established channels",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const networkScenarios = [
    {
        scenario: "Connecting to public Wi-Fi at a coffee shop without using a VPN",
        isSecure: false,
        explanation: "Public Wi-Fi is often unencrypted and vulnerable to eavesdropping",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Home network with WPA3 encryption and a strong, unique password",
        isSecure: true,
        explanation: "WPA3 is the latest and most secure Wi-Fi encryption standard",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Using the same password for router admin access and Wi-Fi network",
        isSecure: false,
        explanation: "Different access levels should have different credentials",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Corporate network with segmented VLANs for different departments",
        isSecure: true,
        explanation: "Network segmentation contains potential breaches",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Sharing network credentials with guests instead of using a guest network",
        isSecure: false,
        explanation: "Guest networks isolate visitor devices from your main network",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

const privacyScenarios = [
    {
        scenario: "Sharing your location data with all apps without reviewing permissions",
        isPrivate: false,
        explanation: "Apps should only get location access when necessary for functionality",
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Using a privacy-focused browser with tracking protection and clearing cookies regularly",
        isPrivate: true,
        explanation: "Privacy browsers limit data collection by advertisers and trackers",
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Posting vacation photos on social media while still on vacation",
        isPrivate: false,
        explanation: "This reveals your home is empty and could be targeted",
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Using unique passwords for different online accounts",
        isPrivate: true,
        explanation: "Prevents credential stuffing attacks if one service is breached",
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
        scenario: "Accepting all cookies without reviewing privacy settings on websites",
        isPrivate: false,
        explanation: "Many cookies are used for tracking and data collection",
        image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
];

// Shuffle function to randomize game questions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let currentGameData = [];

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
    currentGameData = shuffleArray(phishingEmails).slice(0, totalRounds);
    
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
    currentGameData = shuffleArray(passwordExamples).slice(0, totalRounds);
    
    document.querySelector('section.py-5').classList.add('d-none');
    document.getElementById('gameInterface').classList.remove('d-none');
    
    loadPasswordRound();
}

// FIXED: Malware Hunter Game - Now with proper quiz functionality
function startMalwareGame() {
    if (!isUserLoggedIn()) {
        alert('Please log in to play games and save your progress!');
        window.location.href = 'login.html?redirect=games.html';
        return;
    }

    currentGame = 'malware';
    gameScore = 0;
    currentRound = 0;
    currentGameData = shuffleArray(malwareQuizQuestions).slice(0, totalRounds);
    
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
    currentGameData = shuffleArray(socialEngineeringScenarios).slice(0, totalRounds);
    
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
    currentGameData = shuffleArray(networkScenarios).slice(0, totalRounds);
    
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
    currentGameData = shuffleArray(privacyScenarios).slice(0, totalRounds);
    
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

    const email = currentGameData[currentRound];
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

    const password = currentGameData[currentRound];
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

// FIXED: Malware Hunter Game - Now with proper quiz interface
function loadMalwareRound() {
    if (currentRound >= currentGameData.length) {
        endGame();
        return;
    }

    const question = currentGameData[currentRound];
    const gameContainer = document.getElementById('gameContainer');
    
    gameContainer.innerHTML = `
        <div class="game-header text-center mb-4">
            <h3>Malware Hunter - Round ${currentRound + 1}/${currentGameData.length}</h3>
            <p>Answer the question about malware:</p>
            <div class="score-display">Score: ${gameScore}</div>
        </div>
        
        <div class="question-card card mb-4">
            <div class="card-body">
                <h5 class="card-title">${question.question}</h5>
                <div class="options mt-3">
                    ${question.options.map((option, index) => `
                        <div class="form-check mb-2">
                            <input class="form-check-input" type="radio" name="malwareQuestion" id="option${index}" value="${index}">
                            <label class="form-check-label" for="option${index}">
                                ${option}
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
        
        <div class="game-actions text-center">
            <button class="btn btn-primary btn-lg" onclick="checkMalwareAnswer()">
                Submit Answer
            </button>
        </div>
    `;
}

function loadSocialRound() {
    if (currentRound >= totalRounds) {
        endGame();
        return;
    }

    const scenario = currentGameData[currentRound];
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

    const scenario = currentGameData[currentRound];
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

    const scenario = currentGameData[currentRound];
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
    const email = currentGameData[currentRound];
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
    const password = currentGameData[currentRound];
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

// FIXED: Malware Hunter Game - Now with proper answer checking
function checkMalwareAnswer() {
    const selectedOption = document.querySelector('input[name="malwareQuestion"]:checked');
    
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }
    
    const userAnswer = parseInt(selectedOption.value);
    const question = currentGameData[currentRound];
    const isCorrect = (userAnswer === question.correctAnswer);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', [question.explanation]);
    } else {
        showGameFeedback('Incorrect! 😞', 'danger', [question.explanation]);
    }
    
    currentRound++;
    setTimeout(loadMalwareRound, 3000);
}

function checkSocialAnswer(userSaidDangerous) {
    const scenario = currentGameData[currentRound];
    const isCorrect = (userSaidDangerous === scenario.isDangerous);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', [scenario.explanation]);
    } else {
        showGameFeedback('Incorrect! 😞', 'danger', [scenario.explanation]);
    }
    
    currentRound++;
    setTimeout(loadSocialRound, 3000);
}

function checkNetworkAnswer(userSaidSecure) {
    const scenario = currentGameData[currentRound];
    const isCorrect = (userSaidSecure === scenario.isSecure);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', [scenario.explanation]);
    } else {
        showGameFeedback('Incorrect! 😞', 'danger', [scenario.explanation]);
    }
    
    currentRound++;
    setTimeout(loadNetworkRound, 3000);
}

function checkPrivacyAnswer(userSaidPrivate) {
    const scenario = currentGameData[currentRound];
    const isCorrect = (userSaidPrivate === scenario.isPrivate);
    
    if (isCorrect) {
        gameScore += 10;
        showGameFeedback('Correct! 🎉', 'success', [scenario.explanation]);
    } else {
        showGameFeedback('Incorrect! 😞', 'danger', [scenario.explanation]);
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
        ${clues ? `<p><strong>Explanation:</strong> ${clues.join(', ')}</p>` : ''}
    `;
    
    gameContainer.appendChild(feedback);
}

function endGame() {
    const gameContainer = document.getElementById('gameContainer');
    const user = getCurrentUser();
    
    let performanceMessage = '';
    if (gameScore >= 40) {
        performanceMessage = 'Excellent work! You\'re a cybersecurity expert!';
    } else if (gameScore >= 30) {
        performanceMessage = 'Great job! You have strong cybersecurity knowledge.';
    } else if (gameScore >= 20) {
        performanceMessage = 'Good effort! Keep practicing to improve your skills.';
    } else {
        performanceMessage = 'Keep learning! Cybersecurity is an important skill to master.';
    }
    
    gameContainer.innerHTML = `
        <div class="game-complete text-center">
            <i class="fas fa-trophy fa-4x text-warning mb-3"></i>
            <h2>Game Complete!</h2>
            <p class="lead">Your final score: ${gameScore} points</p>
            <p class="mb-4">${performanceMessage}</p>
            
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

// Make functions globally available
window.startMalwareGame = startMalwareGame;
window.checkMalwareAnswer = checkMalwareAnswer;
window.playAgain = playAgain;
window.backToGames = backToGames;
window.saveGameScore = saveGameScore;
