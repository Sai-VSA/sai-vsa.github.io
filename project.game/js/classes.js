// class for in-game Fighters for player1 and player2
class Sprite {
    constructor({ position, imgSrc, width, height, type, framesMax = 10, offset, animationList }) { //constructor runs when the class object is created and initialized
        this.width = width
        this.height = height
        this.position = position
        this.type = type
        this.image = new Image()
        this.image.src = imgSrc
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 20 //frames update every 
        this.scale = 1
        this.offset = offset
        this.animationList = animationList
        this.inAnimation = false

    }


    draw() {
        switch (this.type) {
            case 0:
                c.drawImage(
                        this.image, //image
                        this.framesCurrent * this.image.width / (this.framesMax), //x coordinates inside starting image
                        0, //y coordinates inside starting image 
                        this.image.width / this.framesMax, //width of subsection we'll be using
                        this.image.height, //height of subsection we'll be using
                        this.position.x - this.offset.x, //starting x coordinares
                        this.position.y - this.offset.y, //starting y coordinares
                        this.image.width / this.framesMax * this.scale, //display image
                        this.image.height * this.scale) //starting x coordinares
                if ((this.framesMax - 1) == this.framesCurrent) {
                    this.inAnimation = false;
                }
                break
            case 1:
                c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
                break
            case 2:
                c.drawImage(this.image, this.position.x, this.position.y)
                break
        }
    }

    update() {
        if ((this.framesElapsed % this.framesHold) == 0) {
            if (this.framesCurrent < (this.framesMax - 1)) {
                this.framesCurrent++;
            } else {
                this.framesCurrent = 0;
            }
        }
        this.framesElapsed++;
        this.draw()
    }

}


// class for in-game Fighters for player1 and player2
class Fighter extends Sprite {
    constructor({ position, velocity, imgSrc, width, height, type, framesMax = 10, offset, animationList, currKey }) { //constructor runs when the class object is created and initialized
        super({
            position,
            imgSrc,
            framesMax,
            type,
            offset,
            animationList
        })
        this.health = 600
        this.velocity = velocity
        this.width = 50
        this.height = 150
        this.currKey = currKey
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 145,
            height: 50
        }
        this.isAttacking = false
        this.isHit = false

        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = 40 //frames update every 
        this.scale = 3
    }

    update() {
        super.update()


        //c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)


        if (this.position.y + this.height + this.velocity.y >= (canvas.height - 55)) { //if top of block ... then ...
            //this.position.y = canvas.height - this.height
            this.velocity.y = 0;
            this.position.y = canvas.height - this.height - 55
        } else {
            this.position.y += this.velocity.y
            this.velocity.y += gravity
        }

        if (this.position.x + this.width + this.velocity.x >= canvas.width) { //if top of block ... then ...
            //this.position.y = canvas.height - this.height
            this.velocity.x = 0
            this.position.x = canvas.width - this.width
        } else if (this.position.x + this.velocity.x <= 0) { //if top of block ... then ...
            //this.position.y = canvas.height - this.height
            this.velocity.x = 0
            this.position.x = 0
        } else {
            this.position.x += this.velocity.x
        }

        if (this.currKey === "right") {
            this.attackBox.width = Math.abs(this.attackBox.width)
            this.attackBox.position.x = this.position.x
        } else {
            this.attackBox.width = -Math.abs(this.attackBox.width)
            this.attackBox.position.x = this.position.x + this.width
        }
        this.attackBox.position.y = this.position.y
    }

    hit() {
        if (!this.isHit) {
            if (this.health > 60) {
                this.health -= 60
            } else {
                this.health = 0
            }

            this.isHit = true
            setAnimation(this, 4)
        }

    }

    attack() {
        this.isAttacking = true
    }
}