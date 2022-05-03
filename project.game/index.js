const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576



c.fillRect(0, 0, canvas.width, canvas.height) //fill rectange from (a1, b1) to (a2, b2)

const gravity = 0.5
var timer = 60;

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imgSrc: "Free Pixel Art Forest/Preview/Background.png",
    width: 1024,
    height: 576,
    type: 1,
    offset: {
        x: 0,
        y: 0
    }
})

const backgroundFloor = new Sprite({
    position: {
        x: 0,
        y: 30
    },
    imgSrc: "Free Pixel Art Forest/PNG/Background layers/Layer_0000_9.png",
    width: 1024,
    height: 530,
    type: 0,
    offset: {
        x: 0,
        y: 0
    }
})

const player = new Fighter({
    position: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0
    },
    imgSrc: "Fantasy Warrior/Sprites/Idle.png",
    width: 1024,
    height: 530,
    type: 0,
    offset: {
        x: 200,
        y: 150
    },
    animationList: {
        idle: {
            name: "/project.game/Fantasy Warrior/Sprites/Idle.png",
            revName: "/project.game/Fantasy Warrior/Sprites/idlerev.png",
            frames: 10
        },
        run: {
            name: "/project.game/Fantasy Warrior/Sprites/Run.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Runrev.png",
            frames: 8
        },
        jump: {
            name: "/project.game/Fantasy Warrior/Sprites/Jump.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Jumprev.png",
            frames: 3
        },
        attack: {
            name: "/project.game/Fantasy Warrior/Sprites/Attack1.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Attack1rev.png",
            frames: 2
        },
        isHit: {
            name: "/project.game/Fantasy Warrior/Sprites/Take hit.png",
            revName: "Fantasy Warrior/Sprites/Take hitrev.png",
            frames: 3
        },
        fall: {
            name: "/project.game/Fantasy Warrior/Sprites/Fall.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Fallrev.png",
            frames: 3
        },
        death: {
            name: "/project.game/Fantasy Warrior/Sprites/Death.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Deathrev.png",
            frames: 2
        }
    },
    currKey: "right"
})


const enemy = new Fighter({
    position: {
        x: canvas.width - 150,
        y: 150
    },
    velocity: {
        x: 0,
        y: 0
    },
    imgSrc: "Fantasy Warrior/Sprites/Idle.png",
    width: 1024,
    height: 530,
    type: 0,
    offset: {
        x: 200,
        y: 150
    },
    animationList: {
        idle: {
            name: "/project.game/Fantasy Warrior/Sprites/Idle.png",
            revName: "/project.game/Fantasy Warrior/Sprites/idlerev.png",
            frames: 10
        },
        run: {
            name: "/project.game/Fantasy Warrior/Sprites/Run.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Runrev.png",
            frames: 8
        },
        jump: {
            name: "/project.game/Fantasy Warrior/Sprites/Jump.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Jumprev.png",
            frames: 3
        },
        attack: {
            name: "/project.game/Fantasy Warrior/Sprites/Attack1.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Attack1rev.png",
            frames: 2
        },
        isHit: {
            name: "/project.game/Fantasy Warrior/Sprites/Take hit.png",
            revName: "Fantasy Warrior/Sprites/Take hitrev.png",
            frames: 3
        },
        fall: {
            name: "/project.game/Fantasy Warrior/Sprites/Fall.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Fallrev.png",
            frames: 3
        },
        death: {
            name: "/project.game/Fantasy Warrior/Sprites/Death.png",
            revName: "/project.game/Fantasy Warrior/Sprites/Deathrev.png",
            frames: 2
        }
    },
    currKey: "left"
})

const key = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },

    w: {
        pressed: 0
    },

    upArrow: {
        pressed: 0
    },

    leftArrow: {
        pressed: false
    },

    rightArrow: {
        pressed: false
    }
}


function animate() {
    window.requestAnimationFrame(animate) //infinite loop which helps animate frame by frame
    c.fillStyle = 'black'
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update();
    player.update()
    enemy.update()
    backgroundFloor.update();

    hitCheck(player, enemy)
    hitCheck(enemy, player)

    updateMove(player, key.a.pressed, key.d.pressed, key.w.pressed)
    updateMove(enemy, key.leftArrow.pressed, key.rightArrow.pressed, key.upArrow.pressed)

    updateInterface(player, enemy)
    if (timer == 0 || player.health <= 0 || enemy.health <= 0) {
        gameEnd(player, enemy)
        return
    }

}

animate()

let a = setInterval(() => {
    if (timer <= 0 || !player.health || !enemy.health) {
        clearInterval(a)
    } else {
        timer--;
    }
}, 1000)
