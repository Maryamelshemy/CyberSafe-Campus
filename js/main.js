// main.js - Enhanced main functionality

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  checkUserLoginStatus();
  initializePageAnimations();
});

// Check if user is logged in
function checkUserLoginStatus() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const loginLink = document.getElementById('loginLink');
  const userInfo = document.getElementById('userInfo');
  const userName = document.getElementById('userName');
  
  if (user && loginLink && userInfo && userName) {
    userName.textContent = user.username;
    userInfo.classList.remove('d-none');
    loginLink.classList.add('d-none');
  }
}

// Logout function
function logout() {
  localStorage.removeItem('currentUser');
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

// Check if user is logged in (utility function)
function isUserLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

// Get current user (utility function)
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
}

// Save user progress
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

// Get user progress
function getUserProgress() {
  const user = getCurrentUser();
  if (!user) return null;
  
  const progress = JSON.parse(localStorage.getItem('userProgress')) || {};
  return progress[user.username] || { quizzes: [], games: [], lessons: [] };
}

// Calculate overall progress percentage
function calculateOverallProgress() {
  const progress = getUserProgress();
  if (!progress) return 0;
  
  const totalActivities = progress.quizzes.length + progress.games.length + progress.lessons.length;
  if (totalActivities === 0) return 0;
  
  const totalScore = [
    ...progress.quizzes,
    ...progress.games,
    ...progress.lessons
  ].reduce((sum, activity) => sum + activity.percentage, 0);
  
  return Math.round(totalScore / totalActivities);
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
  notification.style.cssText = `
    top: 20px;
    right: 20px;
    z-index: 9999;
    min-width: 300px;
  `;
  notification.innerHTML = `
    ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.parentNode.removeChild(notification);
    }
  }, 5000);
}
