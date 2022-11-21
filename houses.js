const canvas = document.querySelector('canvas');
 let c = canvas.getContext("2d")
 canvas.width = 1024
 canvas.height = 576
 const music = new Audio()
 music.src = "map1.mp3"

  

 const collisionsMap = []
 for (let i = 0; i < collisions.length; i+= 70) {
collisionsMap.push(collisions.slice(i, 70 + i))
 }


 const boundaries = []
 const offset = {
    x: -1820,
        y: -1300
} 

 collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if(symbol === 52)
        boundaries.push(new Boundray1({position:{
           x: j * Boundray1.width + offset.x,
           y: i * Boundray1.height + offset.y
        }}))
    })
 })
console.log(boundaries)
let src = "img/hinterior.png"

  
const image = new Image()
image.src = src

const foregroundimage = new Image()
foregroundimage.src = './img/foreground1.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'



const player = new Sprite({
    position:{
       x:canvas.width / 2 - 192 / 4 / 2,
       y:canvas.height / 2 - 68 / 4, 
    },
    image: playerUpImage,
    frames: {
        max: 4
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})
const background = new Sprite({
    position: {
        x: -1820,
        y: -1300
    },
    image: image
})


const foreground = new Sprite({
    position: {
        x: -1820,
        y: -1300
    },
    image: foregroundimage
})
const keys = {
    w: {
        pressed:false
    },
    a: {
        pressed:false
    },
    s: {
        pressed:false
    },
    d: {
        pressed:false
    },
}

const movables = [background, ...boundaries,foreground]
function recCollision({rectangle1,rectangle2}) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
        )
}


function animate() {
window.requestAnimationFrame(animate)
music.play()

background.draw()
boundaries.forEach((boundary) => {
    boundary.draw()
})
player.draw()

foreground.draw()

let moving = true
player.moving = false
if (keys.w.pressed && lastKey === 'w') {
    player.moving = true
    player.image = player.sprites.up
for (let i = 0; i < boundaries.length; i++){
    const boundary = boundaries[i]
    if(
        recCollision({
            rectangle1: player,
            rectangle2: {...boundary, position: {
               x:boundary.position.x ,
               y:boundary.position.y + 3
            }}
        })
    ){
        moving = false
    break
        }
}
if(moving)
    movables.forEach(movable => {movable.position.y += 3})}
else if(keys.a.pressed && lastKey === 'a') {
    player.moving = true
    player.image = player.sprites.left
    for (let i = 0; i < boundaries.length; i++){
        const boundary = boundaries[i]
        if(
            recCollision({
                rectangle1: player,
                rectangle2: {...boundary, position: {
                   x:boundary.position.x + 3,
                   y:boundary.position.y 
                }}
            })
        ){
            moving = false
        break
            }
    }
    if(moving)
    movables.forEach(movable => {movable.position.x += 3})}
else if(keys.d.pressed && lastKey === 'd') {
    player.moving = true
    player.image = player.sprites.right
    for (let i = 0; i < boundaries.length; i++){
        const boundary = boundaries[i]
        if(
            recCollision({
                rectangle1: player,
                rectangle2: {...boundary, position: {
                   x:boundary.position.x - 3,
                   y:boundary.position.y 
                }}
            })
        ){
            moving = false
        break
            }
    }
    if(moving)
    movables.forEach(movable => {movable.position.x -= 3})}
else if(keys.s.pressed && lastKey === 's') {
    music.play()
    player.moving = true
    player.image = player.sprites.down
    for (let i = 0; i < boundaries.length; i++){
        const boundary = boundaries[i]
        if(
            recCollision({
                rectangle1: player,
                rectangle2: {...boundary, position: {
                   x:boundary.position.x,
                   y:boundary.position.y - 3
                }}
            })
        ){
            moving = false
        break
            }
    }
    if(moving)
    movables.forEach(movable => {movable.position.y -= 3})}   
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
switch(e.key){
    case "w":
        keys.w.pressed = true
        lastKey = 'w'
    break;
    case "a":
        keys.a.pressed = true
        lastKey = 'a'
    break;
    case "s":
        keys.s.pressed = true
        lastKey = 's'
    break;
    case "d":
        keys.d.pressed = true
        lastKey = 'd'
    break;
}
})
window.addEventListener('keyup', (e) => {
    switch(e.key){
        case "w":
            keys.w.pressed = false
        break;
        case "a":
            keys.a.pressed = false
        break;
        case "s":
            keys.s.pressed = false
        break;
        case "d":
            keys.d.pressed = false
        break;
    }
    })

