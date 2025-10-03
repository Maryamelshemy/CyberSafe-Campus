// js/quiz-data.js - Complete quiz data

const quizData = {
  comprehensive: {
    id: 'comprehensive',
    title: 'Comprehensive Cybersecurity Quiz',
    timeLimit: 1200,
    questions: [
      {
        id: 1,
        text: 'Which of the following is the strongest password?',
        options: [
          'password123',
          'P@ssw0rd!',
          'MyDogName2023',
          'C0rrectH0rseB@tterySt@ple!'
        ],
        correctAnswer: 3,
        explanation: 'The strongest password is long, complex, and uses a mix of character types without being predictable.',
        topic: 'password'
      },
      {
        id: 2,
        text: 'What is the primary goal of a phishing attack?',
        options: [
          'To encrypt your files for ransom',
          'To trick you into revealing sensitive information',
          'To overload a website with traffic',
          'To scan for open ports on your network'
        ],
        correctAnswer: 1,
        explanation: 'Phishing attacks aim to deceive users into providing sensitive data like passwords or credit card information.',
        topic: 'phishing'
      },
      {
        id: 3,
        text: 'Which of these is NOT a type of malware?',
        options: [
          'Virus',
          'Worm',
          'Firewall',
          'Trojan'
        ],
        correctAnswer: 2,
        explanation: 'A firewall is a security system that monitors network traffic, not a type of malware.',
        topic: 'malware'
      }
      // Add more questions as needed...
    ]
  },
  
  password: {
    id: 'password',
    title: 'Password Security Quiz',
    timeLimit: 600,
    questions: [
      {
        id: 1,
        text: 'What is the minimum recommended length for a strong password?',
        options: [
          '6 characters',
          '8 characters',
          '12 characters',
          '16 characters'
        ],
        correctAnswer: 2,
        explanation: 'Most security experts recommend at least 12 characters for a strong password.',
        topic: 'password'
      },
      {
        id: 2,
        text: 'Which of these is a good password practice?',
        options: [
          'Using the same password for multiple accounts',
          'Writing passwords on sticky notes',
          'Using a password manager',
          'Sharing passwords with close friends'
        ],
        correctAnswer: 2,
        explanation: 'Password managers help create and store strong, unique passwords for all your accounts.',
        topic: 'password'
      }
      // Add more questions...
    ]
  }
  // Add other quiz topics...
};

// Function to get quiz questions
function getQuizQuestions(quizType, topic = null) {
  if (quizType === 'comprehensive') {
    return quizData.comprehensive;
  } else if (quizType === 'topic' && topic && quizData[topic]) {
    return quizData[topic];
  }
  return quizData.comprehensive;
}
