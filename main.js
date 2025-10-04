// main.js - Fixed navigation and authentication

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('Main.js initializing...');
    checkUserLoginStatus();
    initializePageAnimations();
});

// FIXED: Uses new authentication system
function checkUserLoginStatus() {
    const user = getCurrentUser();
    const loginLink = document.getElementById('loginLink');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    
    console.log('Checking user status:', user);
    
    if (user && loginLink && userInfo && userName) {
        userName.textContent = user.username;
        userInfo.classList.remove('d-none');
        loginLink.classList.add('d-none');
        console.log('User logged in:', user.username);
    } else {
        if (userInfo) userInfo.classList.add('d-none');
        if (loginLink) loginLink.classList.remove('d-none');
        console.log('User not logged in');
    }
}

// FIXED: Uses new authentication system
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('current_user'));
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

// Logout function - FIXED for new system
function logout() {
    console.log('Logging out...');
    localStorage.removeItem('current_user');
    window.location.href = 'login.html';
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

// Make logout globally available
window.logout = logout;
window.isUserLoggedIn = isUserLoggedIn;
window.getCurrentUser = getCurrentUser;
