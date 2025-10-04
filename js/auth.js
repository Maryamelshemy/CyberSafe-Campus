// auth.js - Enhanced authentication system

document.addEventListener('DOMContentLoaded', function() {
  initializeAuth();
});

function initializeAuth() {
  const loginForm = document.getElementById('loginForm');
  const showRegister = document.getElementById('showRegister');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (showRegister) {
    showRegister.addEventListener('click', function(e) {
      e.preventDefault();
      handleRegister();
    });
  }
  
  // Check if user is already logged in
  checkExistingLogin();
}

function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const rememberMe = document.getElementById('rememberMe')?.checked;
  
  // Simple validation
  if (!username || !password) {
    showAuthMessage('Please fill in all fields', 'error');
    return;
  }
  
  // Check credentials (in real app, this would be a server call)
  if (validateCredentials(username, password)) {
    // Create user session
    const user = {
      username: username,
      loginTime: new Date().toISOString(),
      rememberMe: rememberMe
    };
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    showAuthMessage('Login successful! Redirecting...', 'success');
    
    // Redirect to home page after short delay
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 1000);
  } else {
    showAuthMessage('Invalid username or password', 'error');
  }
}

function validateCredentials(username, password) {
  // Demo accounts - in real app, this would be a server-side check
  const demoAccounts = [
    { username: 'student1', password: 'password123' },
    { username: 'demo', password: 'demo' },
    { username: 'test', password: 'test' },
    { username: 'admin', password: 'admin123' }
  ];
  
  return demoAccounts.some(account => 
    account.username === username && account.password === password
  );
}

function handleRegister() {
  // Simple registration for demo purposes
  const username = prompt('Enter a username for registration (demo purposes):');
  if (username) {
    showAuthMessage(`Account '${username}' created! You can now login with any password.`, 'success');
  }
}

function checkExistingLogin() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user && window.location.pathname.includes('login.html')) {
    // If already logged in and on login page, redirect to home
    window.location.href = 'index.html';
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
  
  const form = document.getElementById('loginForm');
  if (form) {
    form.appendChild(alertDiv);
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
