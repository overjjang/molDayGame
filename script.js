let foundCharacters = new Array(4).fill('_'); // Initialize an array to store found characters
let startTime = Date.now(); // Record the start time
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || []; // Load leaderboard from local storage

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
// console.log(`Generated Password: ${correctPassword}`); // Display the password in the console for debugging
const questions = [
    {
        question: '원자번호1-20 까지의 원소중 금속 원소의 개수는?',
        answers: [
            { text: '3', correct: false },
            { text: '4', correct: false },
            { text: '5', correct: false, char: correctPassword[0] },
            { text: '6', correct: false },
            { text: '7', correct: true }
        ],
        image: './images/1.jpg'
    },
    {
        question: '다음 화학식에서 괄호 안에 들어갈 숫자는?',
        answers: [
            { text: '1', correct: false, char: correctPassword[1] },
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: true },
            { text: '5', correct: false }
        ],
        image: './images/2.png'
    },
    {
        question: 'L껍질의 주 양자수, 오비탈의 총수, 최대 수용 전자수의 합을 구하고 각 자릿수의 합을 구하시오.',
        answers: [
            { text: '4', correct: true, char: correctPassword[2] }
        ],
        image: false
    },
    {
        question: '결합각이 109.5°인 분자의 공유 전자쌍 수는?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: false },
            { text: 'Jupiter', correct: true, char: correctPassword[3] }
        ],
        image: false
    },
    {
        question: '메테인에 대한 설명으로 옳은 것의 개수를 구하시오',
        answers: [
            { text: '1', correct: false },
            { text: '2', correct: true, char: correctPassword[0] },
            { text: '3', correct: false },
            { text: '5', correct: false }
        ],
        image: './images/32.jpg'
    }
];

// Function to shuffle the questions array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    console.log(array);
}

shuffle(questions); // Shuffle the questions array

const assigneQuestionNumber = 1;

const keys = ['key1', 'key2', 'key3', 'key4'];
const assignedQuestions = keys.map((key, index) => {
    return { key, questions: questions.slice(index * assigneQuestionNumber, index * assigneQuestionNumber + assigneQuestionNumber) };
});
console.log(assignedQuestions);

document.getElementById('door').addEventListener('click', () => {
    if (foundCharacters.includes('_')) {
        alert('문이 잠겨있다... 비밀번호를 입력해야 열리는 문이다.');
    } else {
        document.getElementById('password-container').classList.remove('hide');
    }
});

assignedQuestions.forEach(({ key, questions }, index) => {
    document.getElementById(key).addEventListener('click', () => {
        const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
        showQuestion(randomQuestion, key, index);
    });
});

document.getElementById('submit-password').addEventListener('click', () => {
    const enteredPassword = document.getElementById('password').value;
    if (enteredPassword === correctPassword) {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - startTime) / 1000);
        const minutes = Math.floor(timeTaken / 60);
        const seconds = timeTaken % 60;
        document.getElementById('final-time').innerText = `Time taken: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        document.getElementById('result-screen').style.visibility = 'visible';
    } else {
        alert('비밀번호가 틀렸다. 다시 입력해보자.');
    }
});

function showQuestion(question, keyId, index) {
    if (!question) {
        alert('없다 문제.');
        return;
    }
    const modal = document.getElementById('quiz-modal');
    const questionText = question.question;
    const answers = question.answers.map(answer => `<button class="answer-btn">${answer.text}</button>`).join('');
    document.getElementById('quiz-question').innerText = questionText;
    document.getElementById('quiz-answers').innerHTML = answers;
    if (question.image){document.getElementById('quiz-image').src = question.image;
    document.getElementById('quiz-image').style.display = 'block';}
    else document.getElementById('quiz-image').style.display = 'none';
    modal.style.display = 'block';

    document.querySelectorAll('.answer-btn').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const correctAnswer = question.answers[i];
            if (correctAnswer.correct) {
                foundCharacters[index] = correctPassword[index];
                alert(`문제를 풀고 비밀번호를 얻었다!: ${correctPassword[index]}`);
                document.getElementById(keyId).style.display = 'none'; // Hide the key
                document.getElementById('found-characters-container').innerText = `찾은 비밀번호: ${foundCharacters.join('')}`; // Update the display
            } else {
                alert('틀렸다 다시 해보자.');
            }
            modal.style.display = 'none';
        });
    });

    document.querySelector('.close-btn').addEventListener('click', () => {
        modal.style.display = 'none';
    });
}
document.getElementById('restart-btn').addEventListener('click', () => {
    location.reload(); // Restart the game by reloading the page
});
// Timer function
function updateTimer() {
    const currentTime = Date.now();
    const timeElapsed = Math.floor((currentTime - startTime) / 1000);
    const minutes = Math.floor(timeElapsed / 60);
    const seconds = timeElapsed % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

setInterval(updateTimer, 1000); // Update the timer every second