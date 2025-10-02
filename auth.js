// Authentication JavaScript

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const registerLink = document.getElementById('registerLink');
  const loginLinkForm = document.getElementById('loginLinkForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }
  
  if (registerForm) {
    registerForm.addEventListener('submit', handleRegistration);
  }
  
  if (registerLink) {
    registerLink.addEventListener('click', showRegistration);
  }
  
  if (loginLinkForm) {
    loginLinkForm.addEventListener('click', showLogin);
  }
});

// Handle login form submission
function handleLogin(e) {
  e.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  // Simple validation
  if (!username || !password) {
    showNotification('Please fill in all fields', 'danger');
    return;
  }
  
  // Check if user exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    // Store current user in localStorage
    localStorage.setItem('currentUser', JSON.stringify({
      id: user.id,
      username: user.username,
      loginTime: new Date().toISOString()
    }));
    
    showNotification('Login successful!', 'success');
    
    // Redirect to home page after a short delay
    setTimeout(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect');
      window.location.href = redirect || 'index.html';
    }, 1000);
  } else {
    showNotification('Invalid username or password', 'danger');
  }
}

// Handle registration form submission
function handleRegistration(e) {
  e.preventDefault();
  
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  const email = document.getElementById('regEmail').value;
  
  // Simple validation
  if (!username || !password || !email) {
    showNotification('Please fill in all fields', 'danger');
    return;
  }
  
  if (username.length < 3) {
    showNotification('Username must be at least 3 characters long', 'warning');
    return;
  }
  
  if (password.length < 6) {
    showNotification('Password must be at least 6 characters long', 'warning');
    return;
  }
  
  // Check if username already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.username === username)) {
    showNotification('Username already exists', 'warning');
    return;
  }
  
  // Create new user
  const newUser = {
    id: Date.now().toString(),
    username: username,
    password: password,
    email: email,
    registrationDate: new Date().toISOString(),
    completedLessons: [],
    quizzes: [],
    points: 0
  };
  
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  
  showNotification('Registration successful! Please log in.', 'success');
  
  // Switch back to login form
  showLogin();
}

// Show registration form
function showRegistration(e) {
  if (e) e.preventDefault();
  
  document.getElementById('loginForm').classList.add('d-none');
  document.getElementById('registerForm').classList.remove('d-none');
}

// Show login form
function showLogin(e) {
  if (e) e.preventDefault();
  
  document.getElementById('registerForm').classList.add('d-none');
  document.getElementById('loginForm').classList.remove('d-none');
}

// Notification system
function showNotification(message, type) {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 p-3';
  toast.style.zIndex = '11';
  
  const alertClass = type === 'success' ? 'alert-success' : 
                    type === 'warning' ? 'alert-warning' : 
                    type === 'danger' ? 'alert-danger' : 'alert-info';
  
  toast.innerHTML = `
    <div class="toast show" role="alert">
      <div class="toast-header">
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'danger' ? 'times-circle' : 'info-circle'} text-${type} me-2"></i>
        <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
        <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
      </div>
      <div class="toast-body">
        ${message}
      </div>
    </div>
  `;
  
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, 3000);
}