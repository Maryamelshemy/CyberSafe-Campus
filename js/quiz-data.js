// js/quiz-data.js - Complete quiz data

const quizData = {
  comprehensive: {
    id: 'comprehensive',
    title: 'Comprehensive Cybersecurity Quiz',
    timeLimit: 600, // 10 minutes
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
      },
      {
        id: 4,
        text: 'What should you do if you receive a suspicious email asking for personal information?',
        options: [
          'Reply with the requested information',
          'Click on links to verify the sender',
          'Delete it without responding',
          'Forward it to all your contacts to warn them'
        ],
        correctAnswer: 2,
        explanation: 'The safest action is to delete suspicious emails without interacting with them.',
        topic: 'phishing'
      },
      {
        id: 5,
        text: 'What is two-factor authentication (2FA)?',
        options: [
          'Using two different passwords for the same account',
          'A security process that requires two different forms of identification',
          'Having two separate user accounts for the same service',
          'A backup authentication method when you forget your password'
        ],
        correctAnswer: 1,
        explanation: '2FA adds an extra layer of security by requiring something you know (password) and something you have (phone, token).',
        topic: 'password'
      }
    ]
  },
  
  password: {
    id: 'password',
    title: 'Password Security Quiz',
    timeLimit: 300, // 5 minutes
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
      },
      {
        id: 3,
        text: 'What makes a password truly strong?',
        options: [
          'Using only uppercase letters',
          'Using personal information like birthdates',
          'A combination of length, complexity, and unpredictability',
          'Using common words with numbers at the end'
        ],
        correctAnswer: 2,
        explanation: 'Strong passwords combine length, various character types, and avoid predictable patterns.',
        topic: 'password'
      }
    ]
  },
  
  phishing: {
    id: 'phishing',
    title: 'Phishing Awareness Quiz',
    timeLimit: 300,
    questions: [
      {
        id: 1,
        text: 'What is a common indicator of a phishing email?',
        options: [
          'Personalized greeting with your name',
          'Urgent request for immediate action',
          'Professional-looking logo',
          'Links to the company website'
        ],
        correctAnswer: 1,
        explanation: 'Phishing emails often create a sense of urgency to prompt quick action without careful consideration.',
        topic: 'phishing'
      },
      {
        id: 2,
        text: 'What should you do if you receive a suspicious email?',
        options: [
          'Click on links to verify if it\'s legitimate',
          'Reply to ask for more information',
          'Report it to your IT department',
          'Forward it to colleagues to warn them'
        ],
        correctAnswer: 2,
        explanation: 'Reporting suspicious emails to IT professionals helps protect the entire organization.',
        topic: 'phishing'
      }
    ]
  },
  
  malware: {
    id: 'malware',
    title: 'Malware Basics Quiz',
    timeLimit: 300,
    questions: [
      {
        id: 1,
        text: 'What is the main characteristic of a computer virus?',
        options: [
          'It spreads without user interaction',
          'It requires user action to replicate',
          'It only affects Windows computers',
          'It is always visible to the user'
        ],
        correctAnswer: 1,
        explanation: 'Viruses typically require user action, like opening a file, to spread.',
        topic: 'malware'
      },
      {
        id: 2,
        text: 'How does ransomware work?',
        options: [
          'It steals your personal information',
          'It encrypts your files and demands payment',
          'It slows down your computer',
          'It displays unwanted advertisements'
        ],
        correctAnswer: 1,
        explanation: 'Ransomware encrypts files and demands ransom for decryption.',
        topic: 'malware'
      }
    ]
  },
  
  social: {
    id: 'social',
    title: 'Social Engineering Quiz',
    timeLimit: 300,
    questions: [
      {
        id: 1,
        text: 'What is social engineering?',
        options: [
          'A type of computer virus',
          'Psychological manipulation of people',
          'A network security protocol',
          'A data encryption method'
        ],
        correctAnswer: 1,
        explanation: 'Social engineering manipulates people into breaking security procedures.',
        topic: 'social'
      },
      {
        id: 2,
        text: 'Which is an example of pretexting?',
        options: [
          'Sending a phishing email',
          'Creating a fake scenario to gain information',
          'Installing keylogger software',
          'Brute forcing a password'
        ],
        correctAnswer: 1,
        explanation: 'Pretexting involves creating a fabricated scenario to obtain information.',
        topic: 'social'
      }
    ]
  }
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
