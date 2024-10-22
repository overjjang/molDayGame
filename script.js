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
            { text: '4', correct: false, char: correctPassword[2] },
            { text: '5', correct: true },
            { text: '6', correct: false },
            { text: '7', correct: false }
        ],
        image: false
    },
    {
        question: '결합각이 109.5°이고 정사면체형인 분자의 공유 전자쌍 수, 비공유 전자쌍 수의 합은??',
        answers: [
            { text: '2', correct: false },
            { text: '3', correct: false },
            { text: '4', correct: true, char: correctPassword[3] },
            { text: '5', correct: false },
            { text: '6', correct: false }
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
    },
    {
        question: '안정한 바닥상태의 전자배치를 이루기 위해 필요한 조건은?\n(총 3개를 골라 모두 더하시오)',
        answers: [
            { text: '10', correct: false },
            { text: '12', correct: false, char: correctPassword[0] },
            { text: '15', correct: true },
            { text: '17', correct: false }
        ],
        image: './images/51.jpg'
    },
    {
        question: '원자량이 35인 염소의(Cl)의 존재 비율이 76%, 원자량이 37인 염소(Cl)의 존재비율이 35%일때 염소(Cl)의 평균원자량은?(소숫점 첫제 자리에서 올림)',
        answers: [
            { text: '38', correct: false },
            { text: '39', correct: false, char: correctPassword[0] },
            { text: '40', correct: true },
            { text: '41', correct: false }
        ],
        image: false
    },
    {
        question: '기체인 메테인과 산소가 반응하여 기체인 이산화 탄소와 액체인 물이 생성된다.\n CH4(메테인)기체의 부피가 22.4L일떄 CO2(아산화 탄소)기체의 부피는?',
        answers: [
            { text: '44.8L', correct: false },
            { text: '22.4L', correct: true, char: correctPassword[0] },
            { text: '11.2L', correct: false }
        ],
        image: './images/6.jpg'
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

document.getElementById('start-btn').addEventListener('click', () => {
    startTime = Date.now(); // Record the start time
    document.getElementById('start-btn').classList.add('hide');
    document.querySelectorAll('.hide').forEach(element => element.classList.remove('hide'));
    setInterval(updateTimer, 1000); // Start the timer
});

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

    let moreDiscontTime = 0;

    document.querySelectorAll('.answer-btn').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            const correctAnswer = question.answers[i];
            if (correctAnswer.correct) {
                foundCharacters[index] = correctPassword[index];
                alert(`문제를 맞추고 비밀번호를 얻었다!: ${correctPassword[index]}`);
                document.getElementById(keyId).style.display = 'none'; // Hide the key
                document.getElementById('found-characters-container').innerText = `Found Characters: ${foundCharacters.join('')}`; // Update the display
            } else {
                moreDiscontTime += 10;
                alert(`틀렸다 다시 생각해보자. ${moreDiscontTime+20}초가 감소한다.`);
                countdownTime -= 20 + moreDiscontTime;

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
document.getElementById('fail-restart-btn').addEventListener('click', () => {
    location.reload(); // Restart the game by reloading the page
});
document.getElementById('start-btn').addEventListener('click', () => {
    startTime = Date.now(); // Record the start time
    document.getElementById('start-screen').classList.add('hide');
    document.getElementById('game-container').classList.remove('hide');
});

let countdownTime = 300; // 5 minutes in seconds

function updateTimer() {
    const minutes = Math.floor(countdownTime / 60);
    const seconds = countdownTime % 60;
    document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    console.log(countdownTime);
    // Check if time has run out
    if (countdownTime <= 0) {
        document.getElementById('game-over-screen').style.visibility = 'visible';
        clearInterval(timerInterval); // Stop the timer
    } else {
        countdownTime--; // Decrease the countdown time
    }
}
