// lessons.js - Enhanced with interactive elements and images
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
                // Show content with animation
                content.style.display = 'block';
                setTimeout(() => {
                    content.classList.remove('d-none');
                    content.style.opacity = '1';
                }, 10);
                if (markCompleteBtn) markCompleteBtn.classList.remove('d-none');
                this.textContent = 'Show Less';
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline-primary');
            } else {
                // Hide content with animation
                content.style.opacity = '0';
                setTimeout(() => {
                    content.classList.add('d-none');
                    if (markCompleteBtn) markCompleteBtn.classList.add('d-none');
                }, 300);
                this.textContent = 'Learn More';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline-primary');
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
    
    // Add hover effects to lesson cards
    const lessonCards = document.querySelectorAll('.lesson-card');
    lessonCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
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
        progressBar.textContent = `${Math.round(progressPercentage)}%`;
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
        
        // Add celebration effect
        celebrateCompletion(lessonId);
    } else {
        showNotification('This lesson is already marked as complete.', 'info');
    }
}

function celebrateCompletion(lessonId) {
    const lessonCard = document.getElementById(lessonId);
    if (lessonCard) {
        // Add celebration animation
        lessonCard.style.transition = 'all 0.5s ease';
        lessonCard.style.boxShadow = '0 0 20px rgba(40, 167, 69, 0.5)';
        
        // Create confetti effect
        createConfetti(lessonCard);
        
        // Reset shadow after animation
        setTimeout(() => {
            lessonCard.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        }, 2000);
    }
}

function createConfetti(element) {
    const colors = ['#28a745', '#20c997', '#17a2b8', '#6f42c1', '#e83e8c'];
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '8px';
        confetti.style.height = '8px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '0';
        confetti.style.opacity = '0';
        confetti.style.zIndex = '1000';
        
        element.appendChild(confetti);
        
        // Animate confetti
        const animation = confetti.animate([
            { opacity: 0, transform: 'translateY(0) rotate(0deg)' },
            { opacity: 1, transform: `translateY(${Math.random() * 100 + 50}px) rotate(${Math.random() * 360}deg)` },
            { opacity: 0, transform: `translateY(${Math.random() * 100 + 150}px) rotate(${Math.random() * 720}deg)` }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        animation.onfinish = () => {
            confetti.remove();
        };
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
            if (!fromLoad) {
                badge.style.animation = 'pulse 1s ease-in-out';
            }
        }
        
        // Add completed styling
        lessonCard.classList.add('completed', 'lesson-completed');
        
        // Hide toggle and complete buttons (only if not from load)
        if (!fromLoad) {
            const toggleBtn = lessonCard.querySelector('.lesson-toggle');
            const completeBtn = lessonCard.querySelector('.mark-complete');
            
            if (toggleBtn) {
                toggleBtn.style.display = 'none';
            }
            if (completeBtn) {
                completeBtn.style.display = 'none';
            }
        }
        
        // Update lesson status icon
        const statusIcon = lessonCard.querySelector('.lesson-status i');
        if (statusIcon) {
            statusIcon.className = 'fas fa-check-circle text-success fa-2x';
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
            <div class="toast-header bg-success text-white">
                <i class="fas fa-check-circle me-2"></i>
                <strong class="me-auto">Success</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
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
            <div class="toast-header ${alertClass} text-white">
                <i class="fas fa-${iconClass} me-2"></i>
                <strong class="me-auto">${type.charAt(0).toUpperCase() + type.slice(1)}</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
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

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    .lesson-content {
        transition: opacity 0.3s ease;
    }
    
    .lesson-card {
        transition: all 0.3s ease;
    }
    
    .completed-badge {
        animation: pulse 1s ease-in-out;
    }
`;
document.head.appendChild(style);

// Make functions globally available
window.markLessonComplete = markLessonComplete;
window.showNotification = showNotification;
