// games.js - Fixed for new authentication system

let currentGame = null;
let gameScore = 0;
let currentRound = 0;
const totalRounds = 5;

const phishingEmails = [
    // ... (keep your existing phishing emails data)
];

function startPhishingGame() {
    currentGame = 'phishing';
    gameScore = 0;
    currentRound = 0;
    
    document.querySelector('section.py-5').classList.add('d-none');
    document.getElementById('gameInterface').classList.remove('d-none');
    
    loadPhishingRound();
}

// ... (keep all your existing game functions)

// FIXED: Uses new authentication system
function saveGameScore(score, total, gameName) {
    const user = getCurrentUser();
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
    
    // Update user points
    updateUserGamePoints(user.id, score * 5); // 5 points per correct answer in games
}

// FIXED: Uses new database system
function updateUserGamePoints(userId, pointsToAdd) {
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

// FIXED: Uses new authentication system
function isUserLoggedIn() {
    return localStorage.getItem('current_user') !== null;
}

// FIXED: Uses new authentication system
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('current_user'));
    } catch (error) {
        return null;
    }
}

// Add this to initialize user status in games page
document.addEventListener('DOMContentLoaded', function() {
    checkUserLoginStatus();
});

function checkUserLoginStatus() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userName').textContent = user.username;
        document.getElementById('userInfo').classList.remove('d-none');
        document.getElementById('loginLink').classList.add('d-none');
    }
}
