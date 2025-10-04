// leaderboard.js - Fixed for new authentication system

// Demo users data
const demoUsers = [
    { username: "CyberExpert99", score: 95, percentage: 95, quiz: "Comprehensive Quiz", date: "2025-01-15", type: "quiz" },
    { username: "SecurityPro", score: 92, percentage: 92, quiz: "Comprehensive Quiz", date: "2025-01-14", type: "quiz" },
    { username: "SafeSurfer", score: 5, percentage: 100, game: "Phishing Spotter", date: "2025-01-14", type: "game" },
    // ... (keep your existing demo users)
];

document.addEventListener('DOMContentLoaded', function() {
    initializeLeaderboard();
    checkUserLoginStatus();
});

function initializeLeaderboard() {
    loadLeaderboardData();
    setupFilterHandlers();
}

function loadLeaderboardData() {
    let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    
    // Add demo users if leaderboard is empty or has few entries
    if (leaderboard.length < 5) {
        leaderboard = [...demoUsers, ...leaderboard];
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
    
    displayLeaderboard(leaderboard);
}

// ... (keep all your existing leaderboard functions)

// FIXED: Uses new authentication system
function checkUserLoginStatus() {
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
