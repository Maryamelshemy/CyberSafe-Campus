// Main JavaScript - Updated with user management

document.addEventListener('DOMContentLoaded', function() {
  updateUserStatus();
  initializeApp();
});

function initializeApp() {
  // Initialize users in localStorage if not exists
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]));
  }
  
  // Check if we're on the home page and update stats
  if (document.getElementById('totalUsers')) {
    updateHomeStats();
  }
}

function updateUserStatus() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const loginLink = document.getElementById('loginLink');
  const userInfo = document.getElementById('userInfo');
  const userName = document.getElementById('userName');
  
  if (currentUser) {
    if (loginLink) loginLink.classList.add('d-none');
    if (userInfo) {
      userInfo.classList.remove('d-none');
      if (userName) userName.textContent = currentUser.username;
    }
  } else {
    if (loginLink) loginLink.classList.remove('d-none');
    if (userInfo) userInfo.classList.add('d-none');
  }
}

function logout() {
  localStorage.removeItem('currentUser');
  updateUserStatus();
  window.location.href = 'index.html';
}

function updateHomeStats() {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Update user count
  document.getElementById('totalUsers').textContent = users.length;
  
  // Calculate total quizzes taken
  let totalQuizzes = 0;
  users.forEach(user => {
    if (user.quizzes) {
      totalQuizzes += user.quizzes.length;
    }
  });
  
  document.getElementById('totalQuizzes').textContent = totalQuizzes;
  
  // Calculate average score
  let totalScore = 0;
  let scoreCount = 0;
  
  users.forEach(user => {
    if (user.quizzes) {
      user.quizzes.forEach(quiz => {
        totalScore += quiz.percentage;
        scoreCount++;
      });
    }
  });
  
  const averageScore = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 0;
  document.getElementById('averageScore').textContent = `${averageScore}%`;
  
  // Update leaderboard preview
  updateLeaderboardPreview(users);
}

function updateLeaderboardPreview(users) {
  const leaderboardPreview = document.getElementById('leaderboardPreview');
  if (!leaderboardPreview) return;
  
  // Create leaderboard entries based on points
  let leaderboard = users.map(user => {
    return {
      username: user.username,
      points: user.points || 0
    };
  });
  
  // Sort by points (descending) and take top 5
  leaderboard.sort((a, b) => b.points - a.points);
  leaderboard = leaderboard.slice(0, 5);
  
  leaderboardPreview.innerHTML = '';
  
  leaderboard.forEach((user, index) => {
    const row = document.createElement('div');
    row.className = 'list-group-item d-flex justify-content-between align-items-center';
    
    // Add medal for top 3
    let medal = '';
    if (index === 0) medal = '<i class="fas fa-trophy text-warning me-2"></i>';
    else if (index === 1) medal = '<i class="fas fa-medal text-secondary me-2"></i>';
    else if (index === 2) medal = '<i class="fas fa-medal text-danger me-2"></i>';
    
    row.innerHTML = `
      <div>
        ${medal}
        <span class="fw-bold">${user.username}</span>
      </div>
      <span class="badge bg-primary rounded-pill">${user.points} pts</span>
    `;
    
    leaderboardPreview.appendChild(row);
  });
  
  // Show message if no users
  if (leaderboard.length === 0) {
    leaderboardPreview.innerHTML = `
      <div class="text-center py-4 text-muted">
        <i class="fas fa-users fa-2x mb-2"></i>
        <p>No users yet. Be the first to register!</p>
      </div>
    `;
  }
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