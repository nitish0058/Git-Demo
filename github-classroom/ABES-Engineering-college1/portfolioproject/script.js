const quiz=[

{
question:"HTML stands for?",
answers:[
"Hyper Text Markup Language",
"High Text Machine Language",
"Home Tool Markup Language",
"Hyperlinks Text Management"
],
correct:0
},

{
question:"Which language is used for styling webpages?",
answers:["Java","Python","CSS","C++"],
correct:2
},

{
question:"JavaScript is a ____ language.",
answers:[
"Programming",
"Database",
"Markup",
"Operating System"
],
correct:0
},

{
question:"Which company developed Java?",
answers:[
"Microsoft",
"Sun Microsystems",
"Google",
"IBM"
],
correct:1
},

{
question:"Which data structure uses FIFO?",
answers:[
"Stack",
"Queue",
"Tree",
"Graph"
],
correct:1
},

{
question:"CSS stands for?",
answers:[
"Cascading Style Sheets",
"Computer Style Sheet",
"Creative Style Sheet",
"Colorful Style Sheet"
],
correct:0
},

{
question:"Which symbol is used for comments in JavaScript?",
answers:[
"//",
"<!-- -->",
"#",
"**"
],
correct:0
},

{
question:"Which HTML tag inserts an image?",
answers:[
"<img>",
"<image>",
"<src>",
"<picture>"
],
correct:0
},

{
question:"Which keyword declares a constant in JS?",
answers:[
"let",
"var",
"const",
"int"
],
correct:2
},

{
question:"Which HTML tag creates a hyperlink?",
answers:[
"<a>",
"<link>",
"<href>",
"<hyperlink>"
],
correct:0
}

];

let current=0;
let score=0;
let time=15;
let timer;

const question=document.getElementById("question");
const answers=document.getElementById("answers");
const next=document.getElementById("nextBtn");
const result=document.getElementById("result");
const timerText=document.getElementById("timer");
const progress=document.getElementById("progressBar");

function loadQuestion(){

clearInterval(timer);

time=15;

timerText.innerHTML=time;

timer=setInterval(updateTimer,1000);

question.innerHTML=quiz[current].question;

answers.innerHTML="";

progress.style.width=((current+1)/quiz.length)*100+"%";

quiz[current].answers.forEach((ans,index)=>{

let btn=document.createElement("button");

btn.innerHTML=ans;
btn.textContent=ans;

btn.classList.add("option");

btn.onclick=()=>checkAnswer(index,btn);

answers.appendChild(btn);

});

}

function updateTimer(){

time--;

timerText.innerHTML=time;

if(time==0){

clearInterval(timer);

current++;

if(current<quiz.length)

loadQuestion();

else

showResult();

}

}

function checkAnswer(index,btn){

clearInterval(timer);

let options=document.querySelectorAll(".option");

options.forEach(b=>b.disabled=true);

if(index===quiz[current].correct){

btn.classList.add("correct");
correctSound.currentTime=0;
correctSound.play();

score++;

}

else{

btn.classList.add("wrong");
wrongSound.currentTime=0;
wrongSound.play();

options[quiz[current].correct].classList.add("correct");

}

}

next.onclick=()=>{

current++;

if(current<quiz.length)

loadQuestion();

else

showResult();

}

function showResult() {

    clearInterval(timer);

    question.style.display = "none";
    answers.style.display = "none";
    next.style.display = "none";
    document.querySelector(".timer").style.display = "none";

    const trophy = document.getElementById("trophy");
    const trophyIcon = document.querySelector("#trophy i");

    trophy.style.display = "block";

    let percentage = (score / quiz.length) * 100;
    let message = "";

    if (score === quiz.length) {

        trophyIcon.style.color = "gold";
        message = "🏆 Perfect Score! Outstanding!";

    } else if (percentage >= 80) {

        trophyIcon.style.color = "silver";
        message = "🎉 Excellent Work!";

    } else if (percentage >= 50) {

        trophyIcon.style.color = "#CD7F32";
        message = "👍 Good Job! Keep Practicing.";

    } else {

        trophy.style.display = "none";
        message = "📚 Keep Learning! You Can Do Better.";

    }

    result.innerHTML = `
        <h2>${message}</h2>
        <h3>🏅 Score : ${score}/${quiz.length}</h3>
        <h3>📊 Percentage : ${percentage.toFixed(1)}%</h3>
    `;
    if(score>=quiz.length*0.8){
        launchConfetti();
    }


    restartBtn.style.display = "inline-block";

}
function launchConfetti() {
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });
}
const restartBtn=document.getElementById("restartBtn");
restartBtn.addEventListener("click",restartQuiz);
function restartQuiz(){
current=0;
score=0;
question.style.display="block";
answers.style.display="block";
next.style.display="inline-block";
document.querySelector(".timer").style.display="block";
result.innerHTML="";
restartBtn.style.display="none";
loadQuestion();
document.getElementById("trophy").style.display="none";
}
function updateProgressBar(){
    const progress=document.getElementById("progressBar");
progress.style.width=((current+1)/quiz.length)*100+"%";
}
const correctSound=new Audio("correct.mp3");
const wrongSound=new Audio("wrong.mp3");
function launchConfetti(){
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.6 }
    });
}


loadQuestion();