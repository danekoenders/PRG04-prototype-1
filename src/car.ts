import * as PIXI from 'pixi.js'

export class Car extends PIXI.Sprite {
    private xspeed : number = 0
    private yspeed : number = 0

    constructor(texture: PIXI.Texture){
       super(texture)
       this.xspeed = 0
       this.yspeed = 0
       this.x = 500
       this.y = 400
       this.anchor.set(0.5)
       this.scale.set(0.2)

       window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
       window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    thrive() {
        this.x += this.xspeed
        this.y += this.yspeed
    }

    shoot(){
        console.log("shooooot!")
    }

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                this.shoot()
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }
}