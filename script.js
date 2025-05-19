const guessInput = document.querySelector('.number-container input');
const sendBtn = document.getElementById('send');
const clearBtn = document.getElementById('clear');
const message = document.getElementById('message');
const scoreP = document.querySelector('.score');
const remainingP = document.querySelector('.remaining-points');

let secretNumber = Math.floor(Math.random() * 100) + 1;
let score = 0;
let remainingPoints = 5;

function updateStats() {
    scoreP.textContent = `Score: ${score}`;
    remainingP.textContent = `Remaining Points: ${remainingPoints}`;
}

function showMessage(text,colorClass){
    message.textContent = text;
    message.style.display = 'block';
    if(colorClass === 'higher' || colorClass === 'lower'){
        message.style.color = 'red';
    } else if(colorClass === 'correct'){
        message.style.color = 'green';
    } else{
        message.style.color ='blue';
    }
}

function resetGame(){
    secretNumber = Math.floor(Math.random() * 100) + 1;
    score = 0;
    remainingPoints = 5;
    guessInput.value = '';
    message.style.display = 'none';
    updateStats();
    guessInput.disabled = false;
    sendBtn.disabled = false;
}

sendBtn.addEventListener('click', () => {
    const guess = Number(guessInput.value);

    if(!guess || guess < 1 || guess > 100){
        showMessage('Please enter a number between 1 and 100.', 'lower');
        return;
    }

    if(remainingPoints <= 0){
        showMessage('No more guesses left! Press clear to restart.', 'lower');
        return;
    }

    if(guess === secretNumber){
        score++;
        updateStats();
        showMessage('Correct!','correct');
        guessInput.disabled = true;
        sendBtn.disabled = true;
        return;
    }

    remainingPoints--;
    updateStats();

    if(guess < secretNumber){
        showMessage('Try a higher number!', 'higher');
    } else{
        showMessage('Try a lower number!', 'lower');
    }

    if(remainingPoints === 0){
        showMessage(`Game Over! The number was ${secretNumber}. Please clear to restart.`, 'lower');
        guessInput.disabled = true;
        sendBtn.disabled = true;
    }
});

clearBtn.addEventListener('click',resetGame);

resetGame();