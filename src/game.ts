import * as PIXI from 'pixi.js'

import coinImage from "./images/coin.png"
import highwayImage from "./images/highway.jpg"
import carImage from "./images/car.png"

import { Coin } from "./coin"
import { Car } from "./car"

class Game {
    private pixi : PIXI.Application
    private loader : PIXI.Loader
    private coins : Coin[] = []
    private car : Car
    
    constructor() {
        this.pixi = new PIXI.Application({ width: window.innerWidth, height: (window.innerHeight - 90)})
        const pixiCanvas = document.getElementById("pixi-canvas")

        if (pixiCanvas != null) {
            pixiCanvas.appendChild(this.pixi.view)
        }

        console.log(this.pixi.screen.width)

        this.loader = new PIXI.Loader()
        this.loader
        .add('coinTexture', coinImage)
        .add('carTexture', carImage)
        .add('backgroundTexture',highwayImage)
        this.loader.load(()=> this.loadCompleted())
    }

    private loadCompleted() {

        let bg = new PIXI.TilingSprite(this.loader.resources["backgroundTexture"].texture!, 1200, 700)
        this.pixi.stage.addChild(bg)
        bg.scale.set (1.7)

        for (let i=0; i<20; i++){
            let lonelyCoin = new Coin(this.loader.resources["coinTexture"].texture!)
            this.pixi.stage.addChild(lonelyCoin)
            this.coins.push(lonelyCoin)
        }

        this.car = new Car(this.loader.resources["carTexture"].texture!)
        this.pixi.stage.addChild(this.car)

        this.pixi.ticker.add(() => this.checkCollision(devicePixelRatio))
    }

    private checkCollision(delta : number){
        for (let coin of this.coins) {
            coin.thrive() 
            if (this.collision(this.car, coin)) {
            }
        }
        this.car.thrive()
    }

    private collision(car:PIXI.Sprite, coin:PIXI.Sprite) {
        const bounds1 = car.getBounds()
        const bounds2 = coin.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }
}

let g = new Game()
console.log("Prototype 1")