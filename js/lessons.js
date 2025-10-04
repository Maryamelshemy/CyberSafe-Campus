// lessons.js - Enhanced with new authentication compatibility

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
    const currentUser = getCurrentUser();
    
    // Hide progress section if no user logged in
    if (!currentUser) {
        const progressSection = document.getElementById('progressSection');
        if (progressSection) progressSection.classList.add('d-none');
        
        // Hide mark complete buttons for logged out users
        document.querySelectorAll('.mark-complete').forEach(btn => {
            btn.classList.add('d-none');
        });
        return;
    }
    
    // Show progress section
    const progressSection = document.getElementById('progressSection');
    if (progressSection) progressSection.classList.remove('d-none');
    
    // Get user's completed lessons from the new system
    const completedLessons = currentUser.completedLessons || [];
    const totalLessons = document.querySelectorAll('.lesson-card').length;
    const completedCount = completedLessons.length;
    
    // Update progress bar
    const progressPercentage = (completedCount / totalLessons) * 100;
    const progressBar = document.getElementById('lessonsProgressBar') || document.getElementById('overallProgress');
    if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`;
    }
    
    // Update completed count
    const completedCountElement = document.getElementById('completedCount');
    if (completedCountElement) {
        completedCountElement.textContent = completedCount;
    }
    
    const totalLessonsElement = document.getElementById('totalLessons');
    if (totalLessonsElement) {
        totalLessonsElement.textContent = totalLessons;
    }
    
    // Update lesson completion badges
    completedLessons.forEach(lessonId => {
        updateLessonUI(lessonId, true);
    });
}

function markLessonComplete(lessonId) {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showNotification('Please log in to track your progress.', 'warning');
        setTimeout(() => {
            window.location.href = 'login.html?redirect=lessons.html';
        }, 1500);
        return;
    }
    
    console.log('Marking lesson complete for user:', currentUser.username, 'Lesson:', lessonId);
    
    // Get all users
    const users = JSON.parse(localStorage.getItem('cybersafe_users')) || [];
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
        
        // Save to users database
        localStorage.setItem('cybersafe_users', JSON.stringify(users));
        
        // Update current user session
        updateCurrentUserSession(users[userIndex]);
        
        // Update UI
        updateLessonUI(lessonId, false);
        
        // Show success message
        showCompletionMessage('Lesson marked as complete! +10 points');
        
        // Update progress
        updateLessonProgress();
    } else {
        showNotification('This lesson is already marked as complete.', 'info');
    }
}

function updateCurrentUserSession(updatedUser) {
    const currentSession = getCurrentUser();
    if (currentSession) {
        const updatedSession = {
            ...currentSession,
            points: updatedUser.points,
            completedLessons: updatedUser.completedLessons || [],
            completedQuizzes: updatedUser.completedQuizzes || []
        };
        
        localStorage.setItem('current_user', JSON.stringify(updatedSession));
        console.log('User session updated');
    }
}

function updateLessonUI(lessonId, fromLoad = false) {
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
        
        // Hide toggle and complete buttons (only if not from load)
        if (!fromLoad) {
            const toggleBtn = lessonCard.querySelector('.lesson-toggle');
            const completeBtn = lessonCard.querySelector('.mark-complete');
            
            if (toggleBtn) toggleBtn.classList.add('d-none');
            if (completeBtn) completeBtn.classList.add('d-none');
        }
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
    
    const iconClass = type === 'success' ? 'check-circle' : 
                     type === 'warning' ? 'exclamation-triangle' : 
                     type === 'danger' ? 'times-circle' : 'info-circle';
    
    const alertClass = type === 'success' ? 'alert-success' : 
                      type === 'warning' ? 'alert-warning' : 
                      type === 'danger' ? 'alert-danger' : 'alert-info';
    
    toast.innerHTML = `
        <div class="toast show" role="alert">
            <div class="toast-header ${alertClass}">
                <i class="fas fa-${iconClass} me-2"></i>
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

// Get current user from new authentication system
function getCurrentUser() {
    try {
        return JSON.parse(localStorage.getItem('current_user'));
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
}

// Update user status in navigation
function updateUserStatus() {
    const currentUser = getCurrentUser();
    const loginLink = document.getElementById('loginLink');
    const userInfo = document.getElementById('userInfo');
    const userName = document.getElementById('userName');
    
    if (currentUser && loginLink && userInfo && userName) {
        userName.textContent = currentUser.username;
        userInfo.classList.remove('d-none');
        loginLink.classList.add('d-none');
    } else {
        // User not logged in
        if (userInfo) userInfo.classList.add('d-none');
        if (loginLink) loginLink.classList.remove('d-none');
    }
}

// Make functions globally available
window.markLessonComplete = markLessonComplete;
window.showNotification = showNotification;
