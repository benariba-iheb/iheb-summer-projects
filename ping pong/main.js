import Ball from "./ball.js";
import Paddle from "./paddle.js";

const ball = new Ball(document.getElementById("ball"));
const paddle1 = new Paddle(document.getElementById("player1"))
const paddle2 = new Paddle(document.getElementById("player2"))
const player1_scr = document.getElementById("score1")
const player2_scr = document.getElementById("score2")

let lastTime;

console.log(paddle2.y2)
console.log(paddle1.y1)


function update(time){
    if(lastTime != null){  
        let delta = time - lastTime
        ball.update(delta ,[paddle1.rect() , paddle2.rect()])
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
        document.documentElement.style.setProperty("--hue" , hue+ delta * 0.003)
    }
    
    if (lost()){
        handleLose()
    }

    lastTime = time;
    window.requestAnimationFrame(update) 
}
window.requestAnimationFrame(update)


function lost(){
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth){
        player1_scr.textContent = parseInt(player1_scr.textContent) + 1    
    }

    else if(rect.left <=0){
        console.log("player2 wins")
        player2_scr.textContent = parseInt(player2_scr.textContent) + 1

    }

    paddle1.reset()
    paddle2.reset()
    ball.reset()
}



let interval_p1 = [];

let interval_p2 = []; 



document.addEventListener ("keydown", (e) =>{
    let i
    switch(e.key){

        case "ArrowDown":
            for(i = 0 ; i <= interval_p2.length ; i++){
                clearInterval(interval_p2[i])
            }   
    
            if( paddle2.y2+8 <= 100 ){

                let inter = setInterval(() => {

                    paddle2.y2 += (7 / window.innerHeight) * 100
                    
                    if( paddle2.y2+8 > 100 ){
                        for(i = 0 ; i <= interval_p2.length ; i++){
                            clearInterval(interval_p2[i])
                        } 
                    }      
                
                }, 1); 
                interval_p2.push(inter) 
            }       
        break;


        case "ArrowUp":

            for(i = 0 ; i <= interval_p2.length ; i++){
                clearInterval( interval_p2[i] )
            }
            if(paddle2.y2-8  >= 0 ){

                let inter = setInterval(() =>{

                    paddle2.y2 -= (7 / window.innerHeight) * 100
                    
                    if(paddle2.y2-8  < 0 ){
                        for(i = 0 ; i <= interval_p2.length ; i++){
                            clearInterval( interval_p2[i] )
                        }
                    }
                },1); 
                interval_p2.push(inter)
            }    
        break;


        case "g":
            for(i = 0 ; i <= interval_p1.length ; i++){
                clearInterval(interval_p1[i])
            }   
    
            if( paddle1.y1+8 <= 100 ){

                let inter = setInterval(() => {

                    paddle1.y1 += (7 / window.innerHeight) * 100
                    
                    if( paddle1.y1+8 > 100 ){
                        for(i = 0 ; i <= interval_p1.length ; i++){
                            clearInterval(interval_p1[i])
                        } 
                    }      
                }, 1); 
                interval_p1.push(inter) 
            }  
        break;


        case "t":
            for(i = 0 ; i <= interval_p1.length ; i++){
                clearInterval(interval_p1[i])
            }   
    
            if(paddle1.y1-8  >= 0  ){

                let inter = setInterval(() => {

                    paddle1.y1 -= (7 / window.innerHeight) * 100
                    
                    if( paddle1.y1-8  < 0  ){
                        for(i = 0 ; i <= interval_p1.length ; i++){
                            clearInterval(interval_p1[i])
                        } 
                    }      
                }, 1); 
                interval_p1.push(inter) 
            } 
        break;

    }
});