import * as PIXI from 'pixi.js'

import coinImage from "./images/coin.png"
import highwayImage from "./images/highway.jpg"
import carImage from "./images/car.png"
import bonesImage from "./images/bones.png"

import { Coin } from "./coin"
import { Car } from "./car"

class Game {
    private pixi : PIXI.Application
    private loader : PIXI.Loader
    private coins : Coin[] = []
    private car : Car

    constructor(){
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
        .add('bonesTexture',bonesImage)
        this.loader.load(()=> this.loadCompleted())
    }

    private loadCompleted() {

    let bg = new PIXI.TilingSprite(this.loader.resources["backgroundTexture"].texture!, 1200, 700)
    this.pixi.stage.addChild(bg)
    bg.scale.set (1.7)

        for (let i=0; i<50; i++){
            let lonelyCoin = new Coin(this.loader.resources["coinTexture"].texture!, this.loader.resources["bonesTexture"].texture!)
            this.pixi.stage.addChild(lonelyCoin)
            this.coins.push(lonelyCoin)
        }

        this.car = new Car(this.loader.resources["carTexture"].texture!)
        this.pixi.stage.addChild(this.car)

        this.pixi.ticker.add(() => this.updateAnimations(devicePixelRatio))
    }

    private updateAnimations(delta : number){
        for(let coin of this.coins){
            coin.thrive() 
        }
        this.car.thrive()
     }
}

let g = new Game()
console.log("Prototype 1")