let questionDiv = document.querySelector(".question")
let answers = document.querySelector(".answers")
let counter = document.querySelector(".counter")
let nextbtn = document.querySelector(".next-btn");
let info = document.querySelector(".info");
let title = document.querySelector(".title");
let AppConatiner = document.querySelector(".AppConatiner");
let result = document.querySelector(".result");

let go_btn = document.querySelector(".go");

let currentIndexQuestion = 0;
let correctAnswer = 0;
let timerInterval;

function question() {

            let req = new XMLHttpRequest();

            req.onreadystatechange =  function () {
                
                if (this.readyState === 4 && this.status === 200) {

                    
                    let Allobjects = JSON.parse(this.responseText)
                    let numberOfQuestions =  Allobjects.length;

                    InsertingQuestions(Allobjects[currentIndexQuestion], numberOfQuestions);

                    countDown(15, numberOfQuestions);

                    

                    nextbtn.addEventListener("click", () => {

                        let correctAnswer =  Allobjects[currentIndexQuestion].Correct_Answer;
                        
                        currentIndexQuestion ++;

                        checkTheAnswer(correctAnswer, numberOfQuestions );

                        questionDiv.innerHTML = "";
                        answers.innerHTML = "";

                        InsertingQuestions(Allobjects[currentIndexQuestion], numberOfQuestions);


                        clearInterval(timerInterval)
                        countDown(15, numberOfQuestions);

                        Results(numberOfQuestions);


                        
                    })

                }
            }

    req.open("GET",`../jsons/champ.json`,true);
    req.send();
}

function checkTheAnswer(Correct_Answer, count) {

    let answers = document.getElementsByName("quiz");
    let chossenAnswer;

    for (let i = 0; i < answers.length; i++) {

        if(answers[i].checked){

            chossenAnswer = answers[i].dataset.answer;
        }

    }

    if( Correct_Answer === chossenAnswer){
        correctAnswer ++;
    }

}

function InsertingQuestions(object, count){

    if ( currentIndexQuestion < count  ) {
        
    let question = document.createElement("h2");
    
    let questionText = document.createTextNode(object['title']);
    
    question.appendChild(questionText);
    
    questionDiv.appendChild(question);

    //Answers part 

    for(let i = 1; i <= 4; i++){

        let answerDiv = document.createElement("div");

        answerDiv.className = "answer";

        let radio = document.createElement("input");

        radio.type = "radio";
        radio.name = "quiz";
        radio.id = `answer-${i}`;
        radio.dataset.answer = object[`Answer-${i}`];

        if( i == 1){

            radio.checked = true

        }

        let label = document.createElement("label");

        label.htmlFor = `answer-${i}`;

        let labelNode = document.createTextNode( object[`Answer-${i}`]);

        label.appendChild(labelNode);

        answerDiv.appendChild(label);
        answerDiv.appendChild(radio);

        answers.appendChild(answerDiv);

        answers.style.direction = "ltr"
    }

    }

    
}

function Results(count){

    if (count === currentIndexQuestion){

        let Finalresult;
        let msg;

        questionDiv.remove()
        answers.remove()
        nextbtn.remove()
        counter.remove()

        if (correctAnswer > (count / 2) && correctAnswer <= (count-2) ) {

            Finalresult = `<span class = good> لا باس بك  ${count} / ${correctAnswer} </span>`
            msg = `<h1>توقعت افضل الصراحه</h1>`


            result.innerHTML = Finalresult
            info.style.backgroundColor = "blue";
            title.style.color = "#fff";

            title.innerHTML = msg;
            title.style.width = "100%";
            title.style.textAlign = "center";
            document.body.style.marginTop = "200px"

        } else if (correctAnswer < (count / 2)) {

            Finalresult = `<span class = bad> فاشل اتعلم كوره ${count} / ${correctAnswer}  </span>`
            msg = `<h1>لا تعليق</h1>`


            result.innerHTML = Finalresult
            info.style.backgroundColor = "red";
            title.style.color = "#fff";

            title.innerHTML = msg;
            title.style.width = "100%";
            title.style.textAlign = "center";
            document.body.style.marginTop = "200px !important"

        } else if (correctAnswer >= (count -1) && correctAnswer <= count ) {

            
            Finalresult = `<span class = perfect> احترام كبير لك ${count} / ${correctAnswer}  </span>`
            msg = `<h1>اسطوريييي</h1>`


            result.innerHTML = Finalresult
            info.style.backgroundColor = "green";
            title.style.color = "#fff";

            title.innerHTML = msg;
            title.style.width = "100%";
            title.style.textAlign = "center";
            document.body.style.marginTop = "200px !important"

        } 

    }

}

function countDown(duration, count){

    if (currentIndexQuestion < count) {

    let mintues ;
    let seconds ;

        timerInterval = setInterval(() => {

            mintues = parseInt(duration / 60);
            seconds = parseInt(duration % 60);
        
            mintues = mintues < 10 ? `0${mintues}`: mintues;
            seconds = seconds < 10 ? `0${seconds}`: seconds;
        
            counter.innerHTML = `${mintues} : ${seconds}`

            counter.style.fontSize = "20px"

            if(--duration < 0){

                clearInterval(timerInterval);
                nextbtn.click();
            }
        
            },1000)

    }

    // <span class="min">00 :</span>  <span class="sec">15</span>

}


question();