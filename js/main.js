// main.js - Fixed for new authentication system

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    checkUserLoginStatus();
    initializePageAnimations();
});

// FIXED: Uses new authentication system
function checkUserLoginStatus() {
    const user = getCurrentUser();
    const loginLink = document.getElementById('loginLink');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    
    if (user && loginLink && userInfo && userName) {
        userName.textContent = user.username;
        userInfo.classList.remove('d-none');
        loginLink.classList.add('d-none');
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

// Logout function - FIXED for new system
function logout() {
    localStorage.removeItem('current_user');
    window.location.href = 'index.html';
}

// Initialize page animations
function initializePageAnimations() {
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
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

// Save user progress - FIXED for new system
function saveUserProgress(activity, score, total, type = 'quiz') {
    const user = getCurrentUser();
    if (!user) return false;
    
    const progress = JSON.parse(localStorage.getItem('userProgress')) || {};
    const userProgress = progress[user.username] || { quizzes: [], games: [], lessons: [] };
    
    const newEntry = {
        activity: activity,
        score: score,
        total: total,
        percentage: Math.round((score / total) * 100),
        date: new Date().toISOString(),
        timestamp: new Date().getTime()
    };
    
    if (type === 'quiz') {
        userProgress.quizzes.push(newEntry);
    } else if (type === 'game') {
        userProgress.games.push(newEntry);
    } else if (type === 'lesson') {
        userProgress.lessons.push(newEntry);
    }
    
    progress[user.username] = userProgress;
    localStorage.setItem('userProgress', JSON.stringify(progress));
    
    return true;
}

// Make logout globally available
window.logout = logout;
