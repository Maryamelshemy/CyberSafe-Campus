// leaderboard.js - Enhanced leaderboard with demo data

// Demo users data
const demoUsers = [
  { username: "CyberExpert99", score: 95, percentage: 95, quiz: "Comprehensive Quiz", date: "2025-01-15", type: "quiz" },
  { username: "SecurityPro", score: 92, percentage: 92, quiz: "Comprehensive Quiz", date: "2025-01-14", type: "quiz" },
  { username: "SafeSurfer", score: 5, percentage: 100, game: "Phishing Spotter", date: "2025-01-14", type: "game" },
  { username: "CodeGuardian", score: 88, percentage: 88, quiz: "Password Security Quiz", date: "2025-01-13", type: "quiz" },
  { username: "DigitalShield", score: 4, percentage: 80, game: "Phishing Spotter", date: "2025-01-13", type: "game" },
  { username: "NetProtector", score: 85, percentage: 85, quiz: "Comprehensive Quiz", date: "2025-01-12", type: "quiz" },
  { username: "CryptoMaster", score: 90, percentage: 90, quiz: "Malware Basics Quiz", date: "2025-01-12", type: "quiz" },
  { username: "PrivacyFirst", score: 3, percentage: 60, game: "Phishing Spotter", date: "2025-01-11", type: "game" },
  { username: "SecureMind", score: 82, percentage: 82, quiz: "Social Engineering Quiz", date: "2025-01-11", type: "quiz" },
  { username: "FirewallKing", score: 78, percentage: 78, quiz: "Comprehensive Quiz", date: "2025-01-10", type: "quiz" }
];

document.addEventListener('DOMContentLoaded', function() {
  initializeLeaderboard();
  checkUserLoginStatus();
});

function initializeLeaderboard() {
  loadLeaderboardData();
  setupFilterHandlers();
}

function loadLeaderboardData() {
  let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
  
  // Add demo users if leaderboard is empty or has few entries
  if (leaderboard.length < 5) {
    leaderboard = [...demoUsers, ...leaderboard];
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
  }
  
  displayLeaderboard(leaderboard);
}

function displayLeaderboard(data) {
  const tbody = document.getElementById('leaderboardBody');
  const filter = document.getElementById('leaderboardFilter').value;
  
  // Filter data
  let filteredData = data;
  if (filter !== 'all') {
    filteredData = data.filter(item => item.type === filter);
  }
  
  // Sort by percentage (descending) and then by date (newest first)
  filteredData.sort((a, b) => {
    if (b.percentage !== a.percentage) {
      return b.percentage - a.percentage;
    }
    return new Date(b.date) - new Date(a.date);
  });
  
  tbody.innerHTML = '';
  
  filteredData.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.className = `leaderboard-item fade-in ${index < 3 ? `rank-${index + 1}` : ''}`;
    
    const activityType = entry.type === 'game' 
      ? `<span class="badge bg-success">Game: ${entry.game}</span>`
      : `<span class="badge bg-primary">Quiz: ${entry.quiz}</span>`;
    
    row.innerHTML = `
      <td>
        <div class="d-flex align-items-center">
          <span class="rank-badge ${index < 3 ? `rank-${index + 1}-badge` : ''}">${index + 1}</span>
          <div>
            <div class="fw-bold">${entry.username}</div>
            <small class="text-muted">${activityType}</small>
          </div>
        </div>
      </td>
      <td>
        <div class="score-display">
          <span class="fw-bold ${getScoreColor(entry.percentage)}">${entry.percentage}%</span>
          <div class="progress mt-1" style="height: 6px; width: 80px;">
            <div class="progress-bar ${getScoreColor(entry.percentage)}" 
                 style="width: ${entry.percentage}%"></div>
          </div>
        </div>
      </td>
      <td>${entry.score}${entry.total ? `/${entry.total}` : ''}</td>
      <td>${entry.date}</td>
    `;
    
    tbody.appendChild(row);
  });
  
  // Update stats
  updateLeaderboardStats(filteredData);
}

function getScoreColor(percentage) {
  if (percentage >= 90) return 'bg-success';
  if (percentage >= 70) return 'bg-warning';
  if (percentage >= 50) return 'bg-info';
  return 'bg-danger';
}

function updateLeaderboardStats(data) {
  const totalEntries = data.length;
  const avgPercentage = totalEntries > 0 
    ? Math.round(data.reduce((sum, entry) => sum + entry.percentage, 0) / totalEntries)
    : 0;
  
  const quizCount = data.filter(entry => entry.type === 'quiz').length;
  const gameCount = data.filter(entry => entry.type === 'game').length;
  
  document.getElementById('totalEntries').textContent = totalEntries;
  document.getElementById('avgPercentage').textContent = `${avgPercentage}%`;
  document.getElementById('quizCount').textContent = quizCount;
  document.getElementById('gameCount').textContent = gameCount;
}

function setupFilterHandlers() {
  document.getElementById('leaderboardFilter').addEventListener('change', function() {
    loadLeaderboardData();
  });
  
  document.getElementById('searchLeaderboard').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const allData = JSON.parse(localStorage.getItem('leaderboard')) || [];
    const filteredData = allData.filter(entry => 
      entry.username.toLowerCase().includes(searchTerm)
    );
    displayLeaderboard(filteredData);
  });
}

function clearLeaderboard() {
  if (confirm('Are you sure you want to clear all leaderboard data? This cannot be undone.')) {
    localStorage.removeItem('leaderboard');
    loadLeaderboardData(); // This will reload demo data
  }
}

function checkUserLoginStatus() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  if (user) {
    document.getElementById('userName').textContent = user.username;
    document.getElementById('userInfo').classList.remove('d-none');
    document.getElementById('loginLink').classList.add('d-none');
  }
}
