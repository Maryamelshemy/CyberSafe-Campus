// Lessons JavaScript - Updated with completion tracking

document.addEventListener('DOMContentLoaded', function() {
  updateUserStatus();
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

function updateLessonProgress() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) return;
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.id === currentUser.id);
  
  if (!user || !user.completedLessons) return;
  
  const completedLessons = user.completedLessons;
  const totalLessons = document.querySelectorAll('.lesson-card').length;
  const completedCount = completedLessons.length;
  
  // Update progress bar
  const progressPercentage = (completedCount / totalLessons) * 100;
  document.getElementById('lessonsProgressBar').style.width = `${progressPercentage}%`;
  document.getElementById('completedCount').textContent = completedCount;
  
  // Update lesson completion badges
  completedLessons.forEach(lessonId => {
    const lessonCard = document.querySelector(`[data-lesson="${lessonId}"]`);
    if (lessonCard) {
      const badge = lessonCard.querySelector('.completed-badge');
      if (badge) {
        badge.style.display = 'inline-block';
      }
      lessonCard.classList.add('completed');
    }
  });
}

function markLessonComplete(lessonId) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('Please log in to track your progress.');
    window.location.href = 'login.html?redirect=lessons.html';
    return;
  }
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userIndex = users.findIndex(u => u.id === currentUser.id);
  
  if (userIndex === -1) return;
  
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
    
    // Update UI
    const lessonCard = document.querySelector(`[data-lesson="${lessonId}"]`);
    if (lessonCard) {
      const badge = lessonCard.querySelector('.completed-badge');
      if (badge) {
        badge.style.display = 'inline-block';
      }
      lessonCard.classList.add('completed');
      
      // Show success message
      showCompletionMessage('Lesson marked as complete! +10 points');
    }
    
    // Update progress
    updateLessonProgress();
  } else {
    alert('This lesson is already marked as complete.');
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
    document.body.removeChild(toast);
  }, 3000);
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
