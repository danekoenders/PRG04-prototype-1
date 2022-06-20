import * as PIXI from 'pixi.js'

export class Coin extends PIXI.Sprite {
    
    deadTexture : PIXI.Texture
    private speed : number
    
     constructor(texture: PIXI.Texture, deadtexture: PIXI.Texture) {
        super(texture)
        this.speed = Math.random() * 2
        this.deadTexture = deadtexture
        this.x = window.innerWidth + 100 + (Math.random() * 900)
        this.y = Math.random() * 1000
        this.anchor.set(0.4)
        this.tint = ((Math.random() * 0.001) + 0.999) * 0xFFFFFF;
        this.scale.set(0.2 + (Math.random() * 0.02))

        this.interactive = true
        this.buttonMode = true
        this.on('pointerdown', () => this.coinClicked())

        console.log("Coin Added")
    }

    public thrive() {
        this.x -= this.speed

        if (this.x < -100) {
            this.x = window.innerWidth + 100
            this.y = Math.random() * window.innerHeight
        }

        // this.y += Math.cos(this.x * 0.03) * 1.1
    }


    coinClicked() {
        console.log("Dont touch me!")
        this.rotation = 0
        this.texture = this.deadTexture
    }
}