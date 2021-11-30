const texts = [' I was once a set of cotton threads,\n stored away in a plastic box,\n compartmentalized row by row. \n' 
+ '\n I was a box of tools opened \n only to sew rickety old cots\n and fading worn out clothes.\n' +
'\n Then I moved to a new home,\n Cold, unfamiliar, \n but with hope for more. \n' + 
'\n For the first time, \n I could let the spools unwind. \n Not grabbed by a vice-like hand, \n but guided by a gentle, \n feathery will. \n' +
'\n Now, I am a tangled mess, \n frayed and knotted across.\n A thread which stretches \n over 10,000 miles wide.\n' + 
'\n Yet as I am now,\n I can weave with an honest hand, \n I can make a beautiful tapestry, \n not held back by \n rules and responsibility,\n' +
' and truly show what it means \n to be me.'];

let count = 0;
let index = 0;
let currentText = '';
let letter = '';
//const strText = text.textContent;
const listen = document.getElementById("typing");
if(listen != null) {
listen.addEventListener('playing', 


function() {(function type(){

   if(count == texts.length) {
       count = 0;
   }

   currentText = texts[count];

   letter = currentText.slice(0, index++);
   
   
  document.querySelector('.poetry').innerHTML = letter;
   


   if(letter.length === currentText.length) {
       count++;
       index = index-1;
       
   }

   setTimeout(type, 100);

}())
}
)
}






/*
text.textContent = "";
const splitText = strText.split("");


for(let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>" + splitText[i] +"</span>"
}

let char = 0;
let timer = setInterval(onTick, 50);

function onTick() {
    const span = text.querySelectorAll("span")[char];
    span.classList.add('fade');
    char++; 

    if(char == splitText.length){
        complete();
        return; 
    }
}


function complete() {
    clearInterval(timer);
    timer = null;
}
*/