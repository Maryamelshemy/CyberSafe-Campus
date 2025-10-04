// auth.js - Complete authentication system with registration

document.addEventListener('DOMContentLoaded', function() {
  initializeAuth();
});

function initializeAuth() {
  // Initialize users in localStorage if not exists
  if (!localStorage.getItem('users')) {
    const defaultUsers = [
      { id: 1, username: 'student1', email: 'student1@example.com', password: 'password123', points: 0, completedLessons: [], createdAt: new Date().toISOString() },
      { id: 2, username: 'demo', email: 'demo@example.com', password: 'demo', points: 0, completedLessons: [], createdAt: new Date().toISOString() }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
  }

  // Form event listeners
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const showRegister = document.getElementById('showRegister');
  const showLogin = document.getElementById('showLogin');

  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (registerForm) {
    registerForm.addEventListener('submit', handleRegister);
  }

  if (showRegister) {
    showRegister.addEventListener('click', function(e) {
      e.preventDefault();
      showRegisterForm();
    });
  }

  if (showLogin) {
    showLogin.addEventListener('click', function(e) {
      e.preventDefault();
      showLoginForm();
    });
  }

  // Check if user is already logged in
  checkExistingLogin();
}

function showRegisterForm() {
  document.getElementById('loginFormContainer').classList.add('d-none');
  document.getElementById('registerFormContainer').classList.remove('d-none');
}

function showLoginForm() {
  document.getElementById('registerFormContainer').classList.add('d-none');
  document.getElementById('loginFormContainer').classList.remove('d-none');
}

function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Simple validation
  if (!username || !password) {
    showAuthMessage('Please fill in all fields', 'error');
    return;
  }
  
  // Check credentials
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Create user session (without password)
    const userSession = {
      id: user.id,
      username: user.username,
      email: user.email,
      points: user.points,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userSession));
    
    showAuthMessage('Login successful! Redirecting...', 'success');
    
    // Redirect to home page after short delay
    setTimeout(() => {
      const redirectUrl = getRedirectUrl() || 'index.html';
      window.location.href = redirectUrl;
    }, 1000);
  } else {
    showAuthMessage('Invalid username or password', 'error');
  }
}

function handleRegister(e) {
  e.preventDefault();
  
  const username = document.getElementById('regUsername').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('regConfirmPassword').value;
  const acceptTerms = document.getElementById('acceptTerms').checked;
  
  // Validation
  if (!username || !email || !password || !confirmPassword) {
    showAuthMessage('Please fill in all fields', 'error');
    return;
  }
  
  if (username.length < 3 || username.length > 20) {
    showAuthMessage('Username must be between 3-20 characters', 'error');
    return;
  }
  
  if (password.length < 6) {
    showAuthMessage('Password must be at least 6 characters long', 'error');
    return;
  }
  
  if (password !== confirmPassword) {
    showAuthMessage('Passwords do not match', 'error');
    return;
  }
  
  if (!acceptTerms) {
    showAuthMessage('Please accept the terms and conditions', 'error');
    return;
  }
  
  // Check if username or email already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const existingUser = users.find(u => u.username === username || u.email === email);
  
  if (existingUser) {
    if (existingUser.username === username) {
      showAuthMessage('Username already exists', 'error');
    } else {
      showAuthMessage('Email already registered', 'error');
    }
    return;
  }
  
  // Create new user
  const newUser = {
    id: generateUserId(),
    username: username,
    email: email,
    password: password,
    points: 0,
    completedLessons: [],
    createdAt: new Date().toISOString()
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  // Auto-login after registration
  const userSession = {
    id: newUser.id,
    username: newUser.username,
    email: newUser.email,
    points: newUser.points,
    loginTime: new Date().toISOString()
  };
  
  localStorage.setItem('currentUser', JSON.stringify(userSession));
  
  showAuthMessage('Account created successfully! Redirecting...', 'success');
  
  // Redirect to home page after short delay
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}

function generateUserId() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  return users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
}

function getRedirectUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('redirect');
}

function checkExistingLogin() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user && window.location.pathname.includes('login.html')) {
    // If already logged in and on login page, redirect to home
    const redirectUrl = getRedirectUrl() || 'index.html';
    window.location.href = redirectUrl;
  }
}

function showAuthMessage(message, type) {
  // Remove any existing messages
  const existingAlert = document.querySelector('.auth-alert');
  if (existingAlert) {
    existingAlert.remove();
  }
  
  // Create new alert
  const alertDiv = document.createElement('div');
  alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} auth-alert alert-dismissible fade show mt-3`;
  alertDiv.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  // Find the current active form
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (loginForm && !loginForm.closest('.d-none')) {
    loginForm.appendChild(alertDiv);
  } else if (registerForm && !registerForm.closest('.d-none')) {
    registerForm.appendChild(alertDiv);
  }
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (alertDiv.parentNode) {
      alertDiv.remove();
    }
  }, 5000);
}

// Make functions globally available
window.logout = function() {
  localStorage.removeItem('currentUser');
  window.location.href = 'index.html';
};

// Utility function to check if user is logged in
function isUserLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

// Utility function to get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}
