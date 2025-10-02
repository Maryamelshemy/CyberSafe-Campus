// Quiz Data - Comprehensive questions for all topics

const quizData = {
  comprehensive: {
    id: 'comprehensive',
    title: 'Comprehensive Cybersecurity Quiz',
    timeLimit: 1200, // 20 minutes in seconds
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
      },
      {
        id: 6,
        text: 'Which of these is an example of social engineering?',
        options: [
          'A virus that replicates itself across networks',
          'An email pretending to be from your bank asking for account details',
          'A firewall blocking unauthorized access',
          'Encrypting sensitive files on your computer'
        ],
        correctAnswer: 1,
        explanation: 'Social engineering involves psychological manipulation rather than technical hacking methods.',
        topic: 'social'
      },
      {
        id: 7,
        text: 'What is the purpose of a VPN?',
        options: [
          'To make your computer run faster',
          'To create a secure connection over the internet',
          'To protect against viruses and malware',
          'To backup your important files'
        ],
        correctAnswer: 1,
        explanation: 'A VPN creates an encrypted tunnel for your internet traffic, enhancing privacy and security.',
        topic: 'network'
      },
      {
        id: 8,
        text: 'Which practice helps protect against ransomware attacks?',
        options: [
          'Using the same password for multiple accounts',
          'Regularly backing up important data',
          'Disabling your antivirus software',
          'Opening email attachments from unknown senders'
        ],
        correctAnswer: 1,
        explanation: 'Regular backups ensure you can restore your files without paying ransom if attacked.',
        topic: 'malware'
      },
      {
        id: 9,
        text: 'What does HTTPS in a website URL indicate?',
        options: [
          'The website is hosted on a fast server',
          'The connection to the website is encrypted',
          'The website contains secure payment options',
          'The website is verified by Google'
        ],
        correctAnswer: 1,
        explanation: 'HTTPS indicates that the connection between your browser and the website is encrypted.',
        topic: 'network'
      },
      {
        id: 10,
        text: 'Why should you be cautious about using public Wi-Fi?',
        options: [
          'It might slow down your device',
          'It could expose your data to eavesdroppers',
          'It might install unwanted software',
          'It could damage your device hardware'
        ],
        correctAnswer: 1,
        explanation: 'Public Wi-Fi networks are often unsecured, making it easier for attackers to intercept your data.',
        topic: 'network'
      }
    ]
  },
  
  password: {
    id: 'password',
    title: 'Password Security Quiz',
    timeLimit: 600, // 10 minutes in seconds
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
      },
      {
        id: 4,
        text: 'How often should you change your passwords?',
        options: [
          'Every week',
          'Every month',
          'Only when you suspect a breach',
          'Every 3-6 months for critical accounts'
        ],
        correctAnswer: 3,
        explanation: 'Regular password changes are recommended, especially for important accounts.',
        topic: 'password'
      },
      {
        id: 5,
        text: 'What is a password phrase?',
        options: [
          'A single word password',
          'A sequence of random characters',
          'A memorable sentence used as a password',
          'A password that includes special characters'
        ],
        correctAnswer: 2,
        explanation: 'Password phrases are long, memorable sentences that provide good security.',
        topic: 'password'
      }
    ]
  },
  
  phishing: {
    id: 'phishing',
    title: 'Phishing Awareness Quiz',
    timeLimit: 600,
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
      },
      {
        id: 3,
        text: 'Which of these is a red flag in an email?',
        options: [
          'Proper grammar and spelling',
          'Familiar sender address',
          'Requests for sensitive information',
          'Clear contact information'
        ],
        correctAnswer: 2,
        explanation: 'Legitimate organizations rarely ask for sensitive information via email.',
        topic: 'phishing'
      },
      {
        id: 4,
        text: 'What is "spear phishing"?',
        options: [
          'Phishing attacks targeting specific individuals',
          'Phishing using phone calls',
          'Phishing through social media',
          'Phishing that uses encrypted messages'
        ],
        correctAnswer: 0,
        explanation: 'Spear phishing targets specific individuals with personalized messages.',
        topic: 'phishing'
      },
      {
        id: 5,
        text: 'How can you verify a suspicious email?',
        options: [
          'By clicking all links in the email',
          'By contacting the organization directly using official contact information',
          'By replying to the email asking for verification',
          'By checking if your friends received the same email'
        ],
        correctAnswer: 1,
        explanation: 'Always use official contact methods from the organization\'s website, not the email itself.',
        topic: 'phishing'
      }
    ]
  },
  
  malware: {
    id: 'malware',
    title: 'Malware Basics Quiz',
    timeLimit: 600,
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
      },
      {
        id: 3,
        text: 'What is a Trojan horse?',
        options: [
          'Malware that replicates itself',
          'Malware disguised as legitimate software',
          'Malware that spreads through networks',
          'Malware that records keystrokes'
        ],
        correctAnswer: 1,
        explanation: 'Trojans appear to be useful software but contain malicious code.',
        topic: 'malware'
      },
      {
        id: 4,
        text: 'How can you prevent malware infections?',
        options: [
          'By never using the internet',
          'By keeping software updated and using antivirus',
          'By using only mobile devices',
          'By disabling all security features'
        ],
        correctAnswer: 1,
        explanation: 'Regular updates and antivirus software are key to malware prevention.',
        topic: 'malware'
      },
      {
        id: 5,
        text: 'What does antivirus software do?',
        options: [
          'Makes your computer faster',
          'Prevents all cyber attacks',
          'Detects and removes malicious software',
          'Encrypts your internet connection'
        ],
        correctAnswer: 2,
        explanation: 'Antivirus software scans for, detects, and removes malware.',
        topic: 'malware'
      }
    ]
  },
  
  social: {
    id: 'social',
    title: 'Social Engineering Quiz',
    timeLimit: 600,
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
      },
      {
        id: 3,
        text: 'How can you protect against social engineering?',
        options: [
          'By using stronger passwords',
          'By being skeptical of unsolicited requests',
          'By installing a firewall',
          'By using incognito mode'
        ],
        correctAnswer: 1,
        explanation: 'Critical thinking and verification are key defenses against social engineering.',
        topic: 'social'
      },
      {
        id: 4,
        text: 'What is "tailgating" in security?',
        options: [
          'Following someone into a secure area',
          'Sending spam emails',
          'Creating fake social media profiles',
          'Intercepting network traffic'
        ],
        correctAnswer: 0,
        explanation: 'Tailgating is physically following someone into a restricted area.',
        topic: 'social'
      },
      {
        id: 5,
        text: 'Why is social engineering often successful?',
        options: [
          'Because people are naturally trusting',
          'Because computers are vulnerable',
          'Because encryption is weak',
          'Because firewalls don\'t work'
        ],
        correctAnswer: 0,
        explanation: 'Social engineering exploits human psychology and trust.',
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
  // Default to comprehensive if topic not found
  return quizData.comprehensive;
}