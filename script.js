let foundCharacters = new Array(4).fill('_'); // Initialize an array to store found characters

// Function to generate a random password of a given length
function generateRandomPassword(length) {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

const correctPassword = generateRandomPassword(4); // Generate a random 4-digit password
console.log(`Generated Password: ${correctPassword}`); // Display the password in the console for debugging

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true, char: correctPassword[0] }
        ]
    },
    {
        question: 'Is the sky blue?',
        answers: [
            { text: 'O', correct: true, char: correctPassword[1] },
            { text: 'X', correct: false }
        ]
    },
    {
        question: 'What is 2 + 2?',
        answers: [
            { text: '4', correct: true, char: correctPassword[2] }
        ]
    },
    {
        question: 'What is the largest planet in our solar system?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: false },
            { text: 'Jupiter', correct: true, char: correctPassword[3] }
        ]
    },
    {
        question: 'What is the smallest prime number?',
        answers: [
            { text: '1', correct: false },
            { text: '2', correct: true, char: correctPassword[0] },
            { text: '3', correct: false },
            { text: '5', correct: false }
        ]
    },
    {
        question: 'What is the chemical symbol for water?',
        answers: [
            { text: 'H2O', correct: true, char: correctPassword[1] },
            { text: 'O2', correct: false },
            { text: 'CO2', correct: false },
            { text: 'H2', correct: false }
        ]
    },
    {
        question: 'What is the speed of light?',
        answers: [
            { text: '300,000 km/s', correct: true, char: correctPassword[2] },
            { text: '150,000 km/s', correct: false },
            { text: '450,000 km/s', correct: false },
            { text: '600,000 km/s', correct: false }
        ]
    }
];

// Function to shuffle the questions array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

shuffle(questions); // Shuffle the questions array

const keys = ['key1', 'key2', 'key3', 'key4'];
const assignedQuestions = keys.map((key, index) => {
    return { key, questions: questions.slice(index * 3, index * 3 + 3) };
});

document.getElementById('door').addEventListener('click', () => {
    if (foundCharacters.includes('_')) {
        alert('The door is locked. Solve the quizzes to get the password.');
    } else {
        document.getElementById('password-container').classList.remove('hide');
    }
});

assignedQuestions.forEach(({ key, questions }, index) => {
    document.getElementById(key).addEventListener('click', () => {
        alert('You found a quiz! Solve it to get a part of the password.');
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        showQuestion(randomQuestion, key, index);
    });
});

document.getElementById('submit-password').addEventListener('click', () => {
    const enteredPassword = document.getElementById('password').value;
    if (enteredPassword === correctPassword) {
        alert('You unlocked the door and escaped the room!');
    } else {
        alert('Incorrect password. Try again.');
    }
});

function showQuestion(question, keyId, index) {
    const questionText = question.question;
    const answers = question.answers.map(answer => answer.text).join('\n');
    const userAnswer = prompt(`${questionText}\n${answers}`);
    const correctAnswer = question.answers.find(answer => answer.text === userAnswer && answer.correct);

    if (correctAnswer) {
        foundCharacters[index] = correctAnswer.char;
        alert(`Correct! You found a part of the password: ${correctAnswer.char}`);
        document.getElementById(keyId).style.display = 'none'; // Hide the key
        document.getElementById('found-characters-container').innerText = `Found Characters: ${foundCharacters.join('')}`; // Update the display
    } else {
        alert('Wrong answer. Try again.');
    }
}