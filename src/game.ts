import * as PIXI from 'pixi.js'

import fishImage from "./images/fish.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import sharkImage from "./images/shark.png"
import bonesImage from "./images/bones.png"

import { Fish } from "./fish"
import { Shark } from "./shark"

class Game {
    private pixi : PIXI.Application
    private loader : PIXI.Loader
    private fishes : Fish[] = []
    private shark : Shark

    constructor(){
        this.pixi = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight})
        document.body.appendChild(this.pixi.view)

        console.log(this.pixi.screen.width)

        this.loader = new PIXI.Loader()
        this.loader.add('fishTexture', fishImage)
        .add('bubbleTexture', bubbleImage)
        .add('waterTexture', waterImage)
        .add('sharkTexture', sharkImage)
        .add('backgroundTexture',waterImage)
        .add('bonesTexture',bonesImage)
        this.loader.load(()=> this.loadCompleted())
    }

    private loadCompleted() {

    let bg = new PIXI.TilingSprite(this.loader.resources["backgroundTexture"].texture!, 1200, 700)
    this.pixi.stage.addChild(bg)
    bg.scale.set (1.7)

        for (let i=0; i<50; i++){
            let lonelyFish = new Fish(this.loader.resources["fishTexture"].texture!, this.loader.resources["bonesTexture"].texture!)
            this.pixi.stage.addChild(lonelyFish)
            this.fishes.push(lonelyFish)
        }

        this.shark = new Shark(this.loader.resources["sharkTexture"].texture!)
        this.pixi.stage.addChild(this.shark)

        this.pixi.ticker.add(() => this.updateAnimations(devicePixelRatio))
    }

    private updateAnimations(delta : number){
        for(let fish of this.fishes){
            fish.swim() 
            if (this.collision(this.shark, fish ) ) fish.hitShark()
        }
        this.shark.swim()
     }

     private collision(sprite1:PIXI.Sprite, sprite2:PIXI.Sprite) {
        const bounds1 = sprite1.getBounds()
        const bounds2 = sprite2.getBounds()

        return bounds1.x < bounds2.x + bounds2.width
            && bounds1.x + bounds1.width > bounds2.x
            && bounds1.y < bounds2.y + bounds2.height
            && bounds1.y + bounds1.height > bounds2.y;
    }    
}

let g = new Game()