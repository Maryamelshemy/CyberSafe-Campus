// Leaderboard JavaScript - Updated with points system

document.addEventListener('DOMContentLoaded', function() {
  loadLeaderboard();
  
  // Add event listeners to filter buttons
  const filterButtons = document.querySelectorAll('[data-filter]');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Reload leaderboard with filter
      const filter = this.dataset.filter;
      loadLeaderboard(filter);
    });
  });
});

function loadLeaderboard(filter = 'all') {
  // Get all users
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  // Create leaderboard entries based on points
  let leaderboard = users.map(user => {
    // Calculate average quiz score
    let avgScore = 0;
    let bestScore = 0;
    let quizzesTaken = 0;
    
    if (user.quizzes && user.quizzes.length > 0) {
      quizzesTaken = user.quizzes.length;
      const totalScore = user.quizzes.reduce((sum, quiz) => {
        if (quiz.percentage > bestScore) {
          bestScore = quiz.percentage;
        }
        return sum + quiz.percentage;
      }, 0);
      avgScore = Math.round(totalScore / quizzesTaken);
    }
    
    return {
      id: user.id,
      username: user.username,
      points: user.points || 0,
      bestScore: bestScore,
      avgScore: avgScore,
      quizzesTaken: quizzesTaken,
      registrationDate: user.registrationDate
    };
  });
  
  // Sort by points (descending)
  leaderboard.sort((a, b) => b.points - a.points);
  
  // Update top 3 winners
  updateTopWinners(leaderboard);
  
  // Update full leaderboard table
  updateLeaderboardTable(leaderboard);
  
  // Update current user stats
  updateCurrentUserStats(leaderboard);
}

function updateTopWinners(leaderboard) {
  // Update first place
  if (leaderboard.length > 0) {
    document.getElementById('firstName').textContent = leaderboard[0].username;
    document.getElementById('firstScore').textContent = leaderboard[0].points;
  }
  
  // Update second place
  if (leaderboard.length > 1) {
    document.getElementById('secondName').textContent = leaderboard[1].username;
    document.getElementById('secondScore').textContent = leaderboard[1].points;
  }
  
  // Update third place
  if (leaderboard.length > 2) {
    document.getElementById('thirdName').textContent = leaderboard[2].username;
    document.getElementById('thirdScore').textContent = leaderboard[2].points;
  }
}

function updateLeaderboardTable(leaderboard) {
  const leaderboardBody = document.getElementById('leaderboardBody');
  leaderboardBody.innerHTML = '';
  
  leaderboard.forEach((user, index) => {
    const row = document.createElement('tr');
    
    // Highlight current user
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.id === user.id) {
      row.classList.add('table-info');
    }
    
    row.innerHTML = `
      <td class="fw-bold">${index + 1}</td>
      <td>
        <div class="d-flex align-items-center">
          <div class="leaderboard-avatar-small me-3">
            <i class="fas fa-user"></i>
          </div>
          <div>
            <div class="fw-bold">${user.username}</div>
            <small class="text-muted">Member since ${formatDate(user.registrationDate)}</small>
          </div>
        </div>
      </td>
      <td class="fw-bold text-primary">${user.points}</td>
      <td>${user.quizzesTaken}</td>
      <td>${user.avgScore}%</td>
    `;
    
    leaderboardBody.appendChild(row);
  });
}

function updateCurrentUserStats(leaderboard) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userStats = document.getElementById('userStats');
  const loginPrompt = document.getElementById('loginPrompt');
  
  if (currentUser) {
    const userRank = leaderboard.findIndex(user => user.id === currentUser.id) + 1;
    const userData = leaderboard.find(user => user.id === currentUser.id);
    
    if (userData) {
      document.getElementById('userRank').textContent = `#${userRank}`;
      document.getElementById('userBestScore').textContent = `${userData.bestScore}%`;
      document.getElementById('userQuizzesTaken').textContent = userData.quizzesTaken;
      document.getElementById('userAvgScore').textContent = `${userData.avgScore}%`;
    }
    
    userStats.style.display = 'block';
    loginPrompt.style.display = 'none';
  } else {
    userStats.style.display = 'none';
    loginPrompt.style.display = 'block';
  }
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}