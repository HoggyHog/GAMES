

export default class paddle{
    constructor(elem){
        this.element=elem
    }

    //GETTERS AND SETTERS FOR POSITION NOW
    get position(){
        return parseFloat(getComputedStyle(this.element).getPropertyValue('--position'))
    }

    set position(value){
        this.element.style.setProperty('--position',value)
    }

    rect(){
        return this.element.getBoundingClientRect()
    }

    // JUST MAKING THE PADDLE MOVE ALONG WITH THE BALL
    update(ballH){
        
        this.position=ballH
        
    }


}
