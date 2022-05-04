//event listeners for keyboard keys
window.addEventListener('keydown', (event) => {
    //  init()
    if (player.health && timer > 0)
        switch (event.key) {
            case 'w':
                if (!key.w.pressed && !player.attackTimer) {
                    key.w.pressed = 1
                    setAnimation(player, 1)
                }
                break
            case 'a':
                key.a.pressed = true
                player.currKey = 'left'
                setAnimation(player, 2)
                break
            case 'd':
                key.d.pressed = true
                player.currKey = 'right'
                setAnimation(player, 2)
                break
                //need case 's' for crouch
            case ' ':
                if (!player.isAttacking) {
                    player.attack()
                    setAnimation(player, 3)
                }
                break
        }

    if (enemy.health && timer > 0)
        switch (event.key) {
            case 'ArrowUp':
                if (!key.upArrow.pressed && !enemy.attackTimer) {
                    key.upArrow.pressed = 1
                    setAnimation(enemy, 1)
                }
                break
            case 'ArrowLeft':
                key.leftArrow.pressed = true
                enemy.currKey = 'left'
                setAnimation(enemy, 2)
                break
            case 'ArrowRight':
                key.rightArrow.pressed = true
                enemy.currKey = 'right'
                setAnimation(enemy, 2)
                break
            case 'Enter':
                if (!enemy.isAttacking) {
                    enemy.attack()
                    setAnimation(enemy, 3)
                }

                break
                //need case 's' for crouch
        }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'w':
            key.w.pressed = 0
            setAnimation(player, 0)

            break
        case 'a':
            key.a.pressed = false
            setAnimation(player, 0)
            break
        case 'd':
            key.d.pressed = false
            setAnimation(player, 0)
            break
        case ' ':
            player.isAttacking = false
            enemy.isHit = false
            setAnimation(player, 0)
            break
            //need case 's' for crouch

    }

    switch (event.key) {
        case 'ArrowUp':
            key.upArrow.pressed = 0
            setAnimation(enemy, 0)
            break
        case 'ArrowLeft':
            key.leftArrow.pressed = false
            setAnimation(enemy, 0)
            break
        case 'ArrowRight':
            key.rightArrow.pressed = false
            setAnimation(enemy, 0)
            break
        case 'Enter':
            enemy.isAttacking = false
            player.isHit = false
            setAnimation(enemy, 0)
            break
            //need case 's' for crouch
    }
})

//updates Fighter velocity
function updateMove(sp, leftPressed, rightPressed, upPressed) {
    if (sp.health) {

        if (leftPressed && sp.currKey === 'left') {
            sp.velocity.x = -2
        } else if (rightPressed && sp.currKey === 'right') {
            sp.velocity.x = 2
        } else {
            decelerate(sp, 2)
        }

        if (upPressed == 1) {
            if ((canvas.height - sp.height - 55) <= sp.position.y) {
                sp.velocity.y = -15 //FIX this from happening multiple times!
                if (sp == player) {
                    key.w.pressed += 1
                } else {
                    key.upArrow.pressed += 1
                }
            }
        }
    }
}

//deceleration function for left and right movement (code 1: up not used)
function decelerate(sp, cond) {
    switch (cond) {
        case 1:
            while (sp.velocity.y != 0) {
                sp.velocity.y *= 0.75
                if (Math.abs(sp.velocity.y) < 0.1) {
                    sp.velocity.y = 0
                }
            }
            break
        case 2:
            while (sp.velocity.x != 0) {
                sp.velocity.x *= 0.75

                if (Math.abs(sp.velocity.x) < 0.1) {
                    sp.velocity.x = 0
                }
            }
            break
    }
}

function hitCheck(p1, p2) {
    if (p1.position.x <= p2.position.x) {
        hbFistFront = p1.attackBox.position.x + p1.attackBox.width //rightmost edge of fist
        hbFistBack = p1.attackBox.position.x
        hbBodyFront = p2.position.x
        hbBodyBack = p2.position.x + p2.width
    } else {
        hbFistFront = (-1) * (p1.attackBox.position.x + p1.attackBox.width)
        hbFistBack = (-1) * p1.attackBox.position.x
        hbBodyFront = (-1) * (p2.position.x + p2.width)
        hbBodyBack = (-1) * p2.position.x
    }

    hbFistBottom = p1.attackBox.position.y + p1.attackBox.height //bottom right edge of fist
    hbFistTop = p1.attackBox.position.y
    hbBodyTop = p2.position.y
    hbBodyBottom = p2.position.y + p2.height

    if ((hbFistBottom <= hbBodyBottom && hbFistTop >= hbBodyTop) &&
        (hbFistFront >= hbBodyFront && hbFistBack <= hbBodyBack) &&
        p1.isAttacking && p1.health)
        p2.hit()
}



function updateInterface(p1, p2) {
    hOffset = 10
    vOffset = 40
    pHeight = 30

    timerWidth = canvas.width / 2 - 50
    c.fillStyle = "blue"
    c.lineWidth = 10;
    c.fillRect(hOffset, vOffset, p1.health * timerWidth / 600, pHeight)
    c.strokeRect(hOffset, vOffset, timerWidth, pHeight)
    c.fillStyle = "green"
    c.fillRect(canvas.width - hOffset, vOffset, -p2.health * timerWidth / 600, pHeight)
    c.strokeRect(canvas.width - hOffset, vOffset, -timerWidth, pHeight)
    c.fillStyle = "white"
    c.fillRect(timerWidth, vOffset / 2, 100, pHeight * 2)
    c.strokeRect(timerWidth, vOffset / 2, 100, pHeight * 2)
    c.fillStyle = "black"
    c.font = '20px san-serif'
    c.fillText(timer, timerWidth + 38, 55)

}

function gameEnd(p1, p2) {
    c.fillStyle = "white"
    c.font = '30px monospace'
    text = 'draw'

    if (p2.health == 0 || p1.health > p2.health) {
        setAnimation(p2, 5)
        text = "player 1 wins"
    } else if (p1.health == 0 || p2.health > p1.health) {
        setAnimation(p1, 5)
        text = 'player 2 wins'
    }

    c.fillText(text, canvas.width / 2, canvas.height / 2)
}

function setAnimation(obj, cond) {
    if (!obj.attackTimer)
        if (obj.health) {
            switch (cond) {
                case 0: //idle
                    if (obj.currKey === "right") {
                        obj.image.src = obj.animationList.idle.name
                    } else {
                        obj.image.src = obj.animationList.idle.revName
                    }
                    obj.framesMax = obj.animationList.idle.frames
                    break
                case 1: //jump
                    if (obj.currKey === "right") {
                        obj.image.src = obj.animationList.jump.name
                    } else {
                        obj.image.src = obj.animationList.jump.revName
                    }
                    obj.framesMax = obj.animationList.jump.frames
                    break
                case 2: //left/right
                    if (obj.currKey === "right") {
                        obj.image.src = obj.animationList.run.name
                    } else {
                        obj.image.src = obj.animationList.run.revName
                    }
                    obj.framesMax = obj.animationList.run.frames
                    break
                case 3: //attack
                    obj.framesCurrent = 0
                    if (obj.currKey === "right") {
                        obj.image.src = obj.animationList.attack.name
                    } else {
                        obj.image.src = obj.animationList.attack.revName
                    }
                    obj.attackTimer = 1
                    obj.framesMax = obj.animationList.attack.frames
                    break
                case 4: //isHit
                    obj.framesCurrent = 0
                    if (obj.currKey === "right") {
                        obj.image.src = obj.animationList.isHit.name
                    } else {
                        obj.image.src = obj.animationList.isHit.revName
                    }
                    obj.framesMax = obj.animationList.isHit.frames
                    break
                case 5: //Death
                    obj.framesCurrent = 0
                    if (obj.currKey === "right") {
                        obj.image.src = obj.animationList.death.name
                    } else {
                        obj.image.src = obj.animationList.death.revName
                    }
                    obj.framesMax = obj.animationList.isHit.frames
                    break
            }
        } else { //death
            obj.framesCurrent = 0
            if (obj.currKey === "right") {
                obj.image.src = obj.animationList.death.name
            } else {
                obj.image.src = obj.animationList.death.revName
            }
            obj.framesMax = obj.animationList.isHit.frames
        }
}