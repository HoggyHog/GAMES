//p much like the main.js file where you import diff js files

import ball from './ball.js'
import paddle from './paddle.js'

// making the objects
var Ball= new ball(document.getElementById('ball'));
var Paddle1= new paddle(document.getElementById('paddle-left'))
var Paddle2= new paddle(document.getElementById('paddle-right'))

//basically making the infinite loop so that we can keep the game running
var new_time=0
function update(time){
    var delta=time-new_time

    Ball.update(delta,[Paddle1,Paddle2])
    Paddle2.update(Ball.y)    //only for paddle2, coz paddle1 is controlled by mouse

    new_time=time

    window.requestAnimationFrame(update)  //causes the infinite loop

}

window.requestAnimationFrame(update)

//making the motion for paddle1
window.addEventListener("mousemove",e=>{
    Paddle1.position=e.y*100/window.innerHeight
})
