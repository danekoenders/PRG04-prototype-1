import * as PIXI from 'pixi.js'
import bonesImage from "./images/bones.png"

export class Fish extends PIXI.Sprite {
    
    deadTexture : PIXI.Texture
    private speed : number
    
     constructor(texture: PIXI.Texture, deadtexture: PIXI.Texture) {
        super(texture)
        this.speed = Math.random() * 2
        this.deadTexture = deadtexture
        console.log("I am a fish")
        this.x = Math.random() * 1500
        this.y = Math.random() * 1000
        this.anchor.set(0.4)
        this.tint = ((Math.random() * 0.001) + 0.999) * 0xFFFFFF;
        this.scale.set(0.8 + (Math.random() * 0.3))

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.fishClicked())
    }

    public swim() {
        this.x -= this.speed
        if (this.x < -100) {
        this.x = window.innerWidth + 100 
        this.y = Math.random() * window.innerHeight
        }

        this.y += Math.cos(this.x * 0.03) * 1.1
    }


    fishClicked() {
        console.log("dont touch me!")
        this.rotation = 0
        this.texture = this.deadTexture
    }

    public hitShark () {
        this.texture  = this.deadTexture

        if (this.texture = this.deadTexture){
            
        }
    }
}