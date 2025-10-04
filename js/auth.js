// auth.js - Complete authentication system

// Initialize authentication system
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth system initializing...');
    initializeAuthSystem();
});

function initializeAuthSystem() {
    // Initialize users storage if not exists
    initializeUsersStorage();
    
    // Setup event listeners
    setupAuthEventListeners();
    
    // Check if user is already logged in
    checkCurrentAuthStatus();
}

function initializeUsersStorage() {
    if (!localStorage.getItem('cybersafe_users')) {
        const defaultUsers = [
            {
                id: 1,
                username: 'student1',
                email: 'student1@cybersafe.edu',
                password: 'password123',
                points: 150,
                completedLessons: ['password', 'phishing'],
                completedQuizzes: ['comprehensive'],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            },
            {
                id: 2,
                username: 'demo',
                email: 'demo@cybersafe.edu',
                password: 'demo',
                points: 80,
                completedLessons: ['password'],
                completedQuizzes: [],
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            }
        ];
        localStorage.setItem('cybersafe_users', JSON.stringify(defaultUsers));
        console.log('Default users initialized');
    }
}

function setupAuthEventListeners() {
    console.log('Setting up auth event listeners...');
    
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
        console.log('Login form listener added');
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
        console.log('Register form listener added');
    }
    
    // Form switching
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    
    if (showRegister) {
        showRegister.addEventListener('click', showRegisterForm);
        console.log('Show register listener added');
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', showLoginForm);
        console.log('Show login listener added');
    }
}

function showRegisterForm(e) {
    if (e) e.preventDefault();
    console.log('Showing register form');
    document.getElementById('loginFormContainer').classList.add('d-none');
    document.getElementById('registerFormContainer').classList.remove('d-none');
}

function showLoginForm(e) {
    if (e) e.preventDefault();
    console.log('Showing login form');
    document.getElementById('registerFormContainer').classList.add('d-none');
    document.getElementById('loginFormContainer').classList.remove('d-none');
}

function handleLoginSubmit(e) {
    e.preventDefault();
    console.log('Login form submitted');
    
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
        showAuthMessage('Please fill in all fields', 'error');
        return;
    }
    
    const result = authenticateUser(username, password);
    
    if (result.success) {
        showAuthMessage('Login successful! Redirecting...', 'success');
        createUserSession(result.user);
        
        setTimeout(() => {
            redirectAfterLogin();
        }, 1000);
    } else {
        showAuthMessage(result.message, 'error');
    }
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    console.log('Register form submitted');
    
    const username = document.getElementById('regUsername').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    const acceptTerms = document.getElementById('acceptTerms').checked;
    
    // Validation
    const validation = validateRegistration(username, email, password, confirmPassword, acceptTerms);
    if (!validation.isValid) {
        showAuthMessage(validation.message, 'error');
        return;
    }
    
    const result = registerNewUser(username, email, password);
    
    if (result.success) {
        showAuthMessage('Account created successfully! Logging you in...', 'success');
        createUserSession(result.user);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } else {
        showAuthMessage(result.message, 'error');
    }
}

function validateRegistration(username, email, password, confirmPassword, acceptTerms) {
    if (!username || !email || !password || !confirmPassword) {
        return { isValid: false, message: 'Please fill in all fields' };
    }
    
    if (username.length < 3 || username.length > 20) {
        return { isValid: false, message: 'Username must be 3-20 characters long' };
    }
    
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return { isValid: false, message: 'Username can only contain letters, numbers, and underscores' };
    }
    
    if (!isValidEmail(email)) {
        return { isValid: false, message: 'Please enter a valid email address' };
    }
    
    if (password.length < 6) {
        return { isValid: false, message: 'Password must be at least 6 characters long' };
    }
    
    if (password !== confirmPassword) {
        return { isValid: false, message: 'Passwords do not match' };
    }
    
    if (!acceptTerms) {
        return { isValid: false, message: 'Please accept the terms and conditions' };
    }
    
    return { isValid: true, message: '' };
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function authenticateUser(username, password) {
    const users = JSON.parse(localStorage.getItem('cybersafe_users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Update last login
        user.lastLogin = new Date().toISOString();
        localStorage.setItem('cybersafe_users', JSON.stringify(users));
        
        return { 
            success: true, 
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                points: user.points,
                completedLessons: user.completedLessons || [],
                completedQuizzes: user.completedQuizzes || []
            }
        };
    } else {
        return { 
            success: false, 
            message: 'Invalid username or password' 
        };
    }
}

function registerNewUser(username, email, password) {
    const users = JSON.parse(localStorage.getItem('cybersafe_users')) || [];
    
    // Check if username already exists
    if (users.find(u => u.username === username)) {
        return { success: false, message: 'Username already exists' };
    }
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered' };
    }
    
    // Create new user
    const newUser = {
        id: generateNewUserId(users),
        username: username,
        email: email,
        password: password,
        points: 0,
        completedLessons: [],
        completedQuizzes: [],
        createdAt: new Date().toISOString(),
        lastLogin: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('cybersafe_users', JSON.stringify(users));
    
    return {
        success: true,
        user: {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            points: newUser.points,
            completedLessons: newUser.completedLessons,
            completedQuizzes: newUser.completedQuizzes
        }
    };
}

function generateNewUserId(users) {
    return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

function createUserSession(user) {
    const session = {
        id: user.id,
        username: user.username,
        email: user.email,
        points: user.points,
        completedLessons: user.completedLessons,
        completedQuizzes: user.completedQuizzes,
        loginTime: new Date().toISOString(),
        sessionId: generateSessionId()
    };
    
    localStorage.setItem('current_user', JSON.stringify(session));
    console.log('User session created for:', user.username);
}

function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

function checkCurrentAuthStatus() {
    const currentUser = getCurrentUser();
    if (currentUser && window.location.pathname.includes('login.html')) {
        console.log('User already logged in, redirecting...');
        // User is already logged in, redirect to home
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 500);
    }
}

function getCurrentUser() {
    try {
        const user = JSON.parse(localStorage.getItem('current_user'));
        console.log('Current user:', user);
        return user;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

function redirectAfterLogin() {
    const urlParams = new URLSearchParams(window.location.search);
    const redirect = urlParams.get('redirect');
    
    if (redirect && redirect !== 'login.html') {
        window.location.href = redirect;
    } else {
        window.location.href = 'index.html';
    }
}

function showAuthMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.auth-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} auth-message alert-dismissible fade show mt-3`;
    messageDiv.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'check-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to current form
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm && !loginForm.closest('.d-none')) {
        loginForm.appendChild(messageDiv);
    } else if (registerForm && !registerForm.closest('.d-none')) {
        registerForm.appendChild(messageDiv);
    }
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Quick login function for demo accounts
function quickLogin(username, password) {
    console.log('Quick login:', username);
    document.getElementById('loginUsername').value = username;
    document.getElementById('loginPassword').value = password;
    
    // Trigger form submission
    const loginForm = document.getElementById('loginForm');
    const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
    loginForm.dispatchEvent(submitEvent);
}

// Global logout function
window.logout = function() {
    console.log('Logging out...');
    localStorage.removeItem('current_user');
    window.location.href = 'login.html';
};

// Utility function to check if user is logged in
window.isUserLoggedIn = function() {
    return localStorage.getItem('current_user') !== null;
};

// Utility function to get current user info
window.getCurrentUserInfo = function() {
    return getCurrentUser();
};
