//a few nice initialisations

const init_vel=0.025                     //initial vel of ball
const vel_incr=0.00075                   //to slowly incr the vel of ball

export default class ball{
    constructor(ballEl){                 //creating ball element
        this.element=ballEl;
        this.reset()
    }

    //now basically doing the getters and setters for x,y and hue
    get x(){
        return parseFloat(getComputedStyle(this.element).getPropertyValue('--x'))
    }

    set x(value){
        this.element.style.setProperty('--x',value)
    }

    get y(){
        return parseFloat(getComputedStyle(this.element).getPropertyValue('--y'))
    }

    set y(value){
        this.element.style.setProperty('--y',value)
    }

    get hue(){
        return parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'))
    }

    set hue(value){
        document.documentElement.style.setProperty('--hue',value)
    }

    //yeahh, we'll need this also down the lane
    rect(){
        return this.element.getBoundingClientRect()
    }

    //resetting after every point scored
    reset(){
        this.x=50;
        this.y=50;
        this.hue=200;
        this.direction={x:0,y:0}
        while (Math.abs(this.direction.x<0.2) || Math.abs(this.direction.x>0.9)){
            var t=getNumberBetween(0,2*Math.PI)
            this.direction={x:Math.cos(t),y:Math.sin(t)}
            
        }
        
        this.counter=parseInt(getNumberBetween(3,9))
        document.getElementById('counter').innerText=this.counter+' hits to get a point'
        this.velocity=init_vel
    }

    //main game loop 
    update(delta,rects){

        //for ball motion
        this.velocity+=this.velocity*vel_incr
        
        this.x+=this.velocity*this.direction.x*delta
        this.y+=this.velocity*this.direction.y*delta

        this.hue+=0.1       //for color change
        
        
        var size=this.rect()

        //if it goes out of side bounds
        if (size.left<=0 || size.right>=window.innerWidth){
            isLose(size)
            this.reset()
        }
       
        //if it goes out of top and bottom bounds
        if (size.top<=0||size.bottom>=window.innerHeight){
            this.direction.y*=-1
            
        }

        //basically the condition for the collission to happen (for either of the paddles)
        var cond=(r)=>{
            return (r.rect().top<=size.bottom && r.rect().bottom>=size.top && r.rect().left<=size.right && r.rect().right>=size.left)
        }

        if (rects.some(cond)){
            this.direction.x*=-1
        } 
        
        //to check if the first paddle is where the collission happened
        if(rects[0].rect().top<=size.bottom && rects[0].rect().bottom>=size.top && rects[0].rect().left<=size.right && rects[0].rect().right>=size.left){
            this.counter-=1
            document.getElementById('counter').innerText=this.counter+' hits to get a point'
        }


        // to give the point if the no of hits are done        
        if(this.counter==0){
            var p_score=document.getElementById('player')
            p_score.innerText=parseInt(p_score.innerText)+1 
            this.reset()
        }

        //updating the game scores as needed
        if(document.getElementById('player').innerText=='5'){
            document.getElementById('player').innerText=0
            alert('YOU WON !!')
            location.reload()
        }
        if(document.getElementById('comp').innerText=='5'){
            document.getElementById('comp').innerText=0
            alert('YOU LOST !!')
            location.reload()
        }
    }
}


//a few functions which we needed
function getNumberBetween(min,max){
    return Math.random()*(max-min) + min
}

function isLose(size){
    if (size.right>=window.innerWidth){
        var p_score=document.getElementById('player')
        p_score.innerText=parseInt(p_score.innerText)+1
        
    }
    if (size.left<=0){
        var c_score=document.getElementById('comp')
        c_score.innerText=parseInt(c_score.innerText)+1
        
    }
}

