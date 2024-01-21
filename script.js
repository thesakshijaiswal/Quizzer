const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const header = document.querySelector('.header');
const quizBox = document.querySelector('.quiz-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');

startBtn.onclick = () =>{
    popupInfo.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick = () =>{
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
continueBtn.onclick = () =>{
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    header.style="display:none";
    quizBox.classList.add('active');
    
    showQuestions(0);
    questionCounter(1);
    headerScore();
}
tryAgainBtn.onclick = () =>{
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore= 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
goHomeBtn.onclick = () =>{
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');   
    resultBox.classList.remove('active');
    header.style="display: flex";
    questionCount = 0;
    questionNumb = 1;
    userScore= 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}
let questionCount = 0;
let questionNumb = 1;
let userScore= 0;

const nextBtn = document.querySelector('.next-btn');
const resultBox = document.querySelector('.result-box');

nextBtn.onclick = () =>{
 if(questionCount < questions.length - 1){
    questionCount++;
    showQuestions(questionCount);
    questionNumb++;
    questionCounter(questionNumb);
    nextBtn.classList.remove('active');
    }
    else{
     showResultBox();           
    }
}

const optionList = document.querySelector('.option-list');

//getting questions and options from array
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].num}.${questions[index].question}`;
    
    let optionTag = `<div class="option">
                     <span>${questions[index].option[0]}</span>
                 </div>
                 <div class="option">
                     <span>${questions[index].option[1]}</span>
                 </div>
                 <div class="option">
                     <span>${questions[index].option[2]}</span>
                 </div>
                 <div class="option">
                     <span>${questions[index].option[3]}</span>
                 </div>`;

optionList.innerHTML = optionTag;         
const option = document.querySelectorAll('.option');  

for(let i=0; i < option.length; i++){
    option[i].setAttribute('onclick','optionSelected(this)');
}
}

function optionSelected(answer) {
    let userAnswer= answer.innerText;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length; 
   if(userAnswer == correctAnswer) {
       answer.classList.add('correct');
       userScore += 1;  
       headerScore();
   }
   else{
       answer.classList.add('incorrect');
//auto selecting correct answer       
       for(let i=0; i < allOptions; i++){
       if(optionList.children[i].innerText == correctAnswer){
          optionList.children[i].setAttribute('class','option correct');
       }  
       }
   }
      
   //once user select any option all others get disabled
   for(let i=0; i < allOptions; i++){
       optionList.children[i].classList.add('disabled');
       
   }
   nextBtn.classList.add('active');
}

function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent =`${index} of ${questions.length} questions`;
}

function headerScore() {
const headerScoreText = document.querySelector('.header-score');
headerScoreText.textContent = `score:${userScore}/${questions.length}`
}

function showResultBox() {
resultBox.classList.add('active');
quizBox.classList.remove('active'); 
const scoreText = document.querySelector('.score-text');
scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`;
    
const circularProgress = document.querySelector('.circular-progress');
const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = Math.floor((userScore / questions.length * 100));
    let speed = 20;
    let progress = setInterval(() => {
        progressStartValue++;        
        progressValue.textContent = `${progressStartValue}%`;
       circularProgress.style.background = `conic-gradient(#ff892b ${progressStartValue * 3.6}deg, #80451552 0deg)`; 
       if(progressStartValue == progressEndValue) {
        clearInterval(progress);
    }
    }, speed);
    
}
