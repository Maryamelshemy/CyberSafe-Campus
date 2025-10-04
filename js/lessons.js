// Lessons JavaScript - Enhanced with completion tracking and new features

document.addEventListener('DOMContentLoaded', function() {
  updateUserStatus();
  initializeLessons();
  updateLessonProgress();
  
  // Check if there's a lesson parameter in URL and scroll to it
  const urlParams = new URLSearchParams(window.location.search);
  const lessonParam = urlParams.get('lesson');
  if (lessonParam) {
    const lessonElement = document.getElementById(lessonParam);
    if (lessonElement) {
      setTimeout(() => {
        lessonElement.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }
});

function initializeLessons() {
  // Add event listeners to lesson toggle buttons
  const toggleButtons = document.querySelectorAll('.lesson-toggle');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lessonCard = this.closest('.lesson-card');
      const content = lessonCard.querySelector('.lesson-content');
      const markCompleteBtn = lessonCard.querySelector('.mark-complete');
      
      if (content.classList.contains('d-none')) {
        // Show content
        content.classList.remove('d-none');
        if (markCompleteBtn) markCompleteBtn.classList.remove('d-none');
        this.textContent = 'Show Less';
      } else {
        // Hide content
        content.classList.add('d-none');
        if (markCompleteBtn) markCompleteBtn.classList.add('d-none');
        this.textContent = 'Learn More';
      }
    });
  });
  
  // Add event listeners to mark complete buttons
  const completeButtons = document.querySelectorAll('.mark-complete');
  completeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const lessonCard = this.closest('.lesson-card');
      const lessonId = lessonCard.id;
      markLessonComplete(lessonId);
    });
  });
}

function updateLessonProgress() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
  // Hide progress section if no user logged in
  if (!currentUser) {
    const progressSection = document.getElementById('progressSection');
    if (progressSection) progressSection.classList.add('d-none');
    return;
  }
  
  // Show progress section
  const progressSection = document.getElementById('progressSection');
  if (progressSection) progressSection.classList.remove('d-none');
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.id === currentUser.id);
  
  if (!user || !user.completedLessons) {
    // Initialize user progress if doesn't exist
    if (user && !user.completedLessons) {
      user.completedLessons = [];
      localStorage.setItem('users', JSON.stringify(users));
    }
    return;
  }
  
  const completedLessons = user.completedLessons;
  const totalLessons = document.querySelectorAll('.lesson-card').length;
  const completedCount = completedLessons.length;
  
  // Update progress bar - support both old and new progress systems
  const progressPercentage = (completedCount / totalLessons) * 100;
  const progressBar = document.getElementById('lessonsProgressBar') || document.getElementById('overallProgress');
  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
  }
  
  // Update completed count - support both old and new systems
  const completedCountElement = document.getElementById('completedCount');
  if (completedCountElement) {
    completedCountElement.textContent = completedCount;
  }
  
  const totalLessonsElement = document.getElementById('totalLessons');
  if (totalLessonsElement) {
    totalLessonsElement.textContent = totalLessons;
  }
  
  // Update lesson completion badges - support both old and new systems
  completedLessons.forEach(lessonId => {
    // Try new system first (by ID)
    let lessonCard = document.getElementById(lessonId);
    
    // If not found, try old system (by data attribute)
    if (!lessonCard) {
      lessonCard = document.querySelector(`[data-lesson="${lessonId}"]`);
    }
    
    if (lessonCard) {
      // Try new badge system first
      let badge = lessonCard.querySelector('.completed-badge');
      
      // If not found, try old badge system
      if (!badge) {
        badge = lessonCard.querySelector('.badge.bg-success');
      }
      
      if (badge) {
        badge.style.display = 'inline-block';
      }
      
      // Add completed styling
      lessonCard.classList.add('completed', 'lesson-completed');
      
      // Hide toggle and complete buttons
      const toggleBtn = lessonCard.querySelector('.lesson-toggle');
      const completeBtn = lessonCard.querySelector('.mark-complete');
      
      if (toggleBtn) toggleBtn.classList.add('d-none');
      if (completeBtn) completeBtn.classList.add('d-none');
    }
  });
}

function markLessonComplete(lessonId) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    showNotification('Please log in to track your progress.', 'warning');
    window.location.href = 'login.html?redirect=lessons.html';
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) {
    showNotification('User not found. Please log in again.', 'danger');
    return;
  }
  
  // Initialize completedLessons array if it doesn't exist
  if (!users[userIndex].completedLessons) {
    users[userIndex].completedLessons = [];
  }
  
  // Add lesson to completed if not already there
  if (!users[userIndex].completedLessons.includes(lessonId)) {
    users[userIndex].completedLessons.push(lessonId);
    
    // Award points for completing a lesson
    if (!users[userIndex].points) {
      users[userIndex].points = 0;
    }
    users[userIndex].points += 10; // 10 points per lesson
    
    localStorage.setItem('users', JSON.stringify(users));
    
    // Also save to the new progress system for compatibility
    saveToNewProgressSystem(lessonId);
    
    // Update UI
    updateLessonUI(lessonId);
    
    // Show success message
    showCompletionMessage('Lesson marked as complete! +10 points');
    
    // Update progress
    updateLessonProgress();
  } else {
    showNotification('This lesson is already marked as complete.', 'info');
  }
}

function saveToNewProgressSystem(lessonId) {
  // Save to the new progress system for compatibility with other features
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (!user) return;
  
  const progress = JSON.parse(localStorage.getItem('userProgress')) || {};
  const userProgress = progress[user.username] || { lessons: [] };
  
  // Check if already exists in new system
  const alreadyExists = userProgress.lessons.some(lesson => lesson.activity === lessonId);
  if (!alreadyExists) {
    userProgress.lessons.push({
      activity: lessonId,
      date: new Date().toISOString(),
      timestamp: new Date().getTime()
    });
    
    progress[user.username] = userProgress;
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }
}

function updateLessonUI(lessonId) {
  let lessonCard = document.getElementById(lessonId);
  
  // If not found by ID, try by data attribute
  if (!lessonCard) {
    lessonCard = document.querySelector(`[data-lesson="${lessonId}"]`);
  }
  
  if (lessonCard) {
    // Try new badge system first
    let badge = lessonCard.querySelector('.completed-badge');
    
    // If not found, try old badge system
    if (!badge) {
      badge = lessonCard.querySelector('.badge.bg-success');
      if (badge) {
        badge.textContent = 'Completed';
        badge.innerHTML = '<i class="fas fa-check me-1"></i>Completed';
      }
    }
    
    if (badge) {
      badge.style.display = 'inline-block';
    }
    
    // Add completed styling
    lessonCard.classList.add('completed', 'lesson-completed');
    
    // Hide toggle and complete buttons
    const toggleBtn = lessonCard.querySelector('.lesson-toggle');
    const completeBtn = lessonCard.querySelector('.mark-complete');
    
    if (toggleBtn) toggleBtn.classList.add('d-none');
    if (completeBtn) completeBtn.classList.add('d-none');
  }
}

function showCompletionMessage(message) {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 p-3';
  toast.style.zIndex = '11';
  
  toast.innerHTML = `
    <div class="toast show" role="alert">
      <div class="toast-header">
        <i class="fas fa-check-circle text-success me-2"></i>
        <strong class="me-auto">Success</strong>
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

// Enhanced notification system
function showNotification(message, type = 'info') {
  // Create toast notification
  const toast = document.createElement('div');
  toast.className = 'position-fixed bottom-0 end-0 p-3';
  toast.style.zIndex = '11';
  
  const alertClass = type === 'success' ? 'alert-success' : 
                    type === 'warning' ? 'alert-warning' : 
                    type === 'danger' ? 'alert-danger' : 'alert-info';
  
  const iconClass = type === 'success' ? 'check-circle' : 
                   type === 'warning' ? 'exclamation-triangle' : 
                   type === 'danger' ? 'times-circle' : 'info-circle';
  
  toast.innerHTML = `
    <div class="toast show" role="alert">
      <div class="toast-header">
        <i class="fas fa-${iconClass} text-${type} me-2"></i>
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

// Update user status in navigation
function updateUserStatus() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const loginLink = document.getElementById('loginLink');
  const userInfo = document.getElementById('userInfo');
  const userName = document.getElementById('userName');
  
  if (currentUser && loginLink && userInfo && userName) {
    // Try to get username from different possible locations
    const username = currentUser.username || currentUser.name || 'User';
    userName.textContent = username;
    userInfo.classList.remove('d-none');
    loginLink.classList.add('d-none');
  }
}

// Make functions globally available
window.markLessonComplete = markLessonComplete;
window.showNotification = showNotification;
