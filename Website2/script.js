const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//get mouse position
let mouse = {
    x: null,
    y: null,
    radius: (canvas.height / 200) * (canvas.width / 200)
}

window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
    );

//create particle 
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX/5;
        this.directionY = directionY/5;
        this.size = size/2.5;
        this.color = color;
    }


    //method to draw individual particles 
    draw() {
        ctx.filter = 'blur(4px)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }  

    //checks particle position, check mouse position, move + draw particle
    update() {
        //check is particle is still within canvas
        if (this.x > canvas.width || this.x < 0 ) {
            this.directionX = -this.directionX;
        }

        if (this.y > canvas.height || this.y < 0 ) {
            this.directionY = -this.directionY;
        }

        //check collision detection - between mouse position && particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius + this.size) {
            if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
                this.x += 10;
               
            }

            if (mouse.x > this.x && this.x > this.size * 10) {
                this.x -= 10;
               
            }

            if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
                this.y += 10;
               
            }

            if (mouse.y > this.y && this.y > this.size * 10) {
                this.y -= 10;
                
            }
        }
        //move particle
        this.x += this.directionX;
        this.y += this.directionY;
        //draw particles
        this.draw();
    }
}


//create particle array
function init() {
    particlesArray = [];
    let numberOfParticles = 20;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) -  (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) -  (size * 2)) + size * 2);
        let directionX = (Math.random() * 10) - 4.5;
        let directionY = (Math.random() * 10) - 4.5;
        let color = "white";

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));

    }
}

//animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
    connect();
}




function connect(){
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
            ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));

            if((distance < (canvas.width/30) * (canvas.height/30))) {
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();

            }
        }
    }
}


//resize event

window.addEventListener('resize', 
function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    mouse.radius = ((canvas.height/200) * canvas.height/200);
    init();
}
)
 /*
//mouse out event
window.addEventListener('mouseout',
    function() {
        mouse.x = null;
        mouse.y = null;
    }
)


**/


init();
animate();