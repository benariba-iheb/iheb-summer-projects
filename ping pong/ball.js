/* import Paddle from "./paddle";
 */

const velocity = 0.045;

export default class Ball{
     constructor(ball , pad){
          this.ball = ball 
          this.reset()
     }

     get x(){
          return parseFloat(getComputedStyle(this.ball).getPropertyValue("--x"))
     }  //will get the ccs variable x value
     set x (x) {
          this.ball.style.setProperty("--x" , x)
     }


     get y(){
          return parseFloat(getComputedStyle(this.ball).getPropertyValue("--y"))
     }
     set y (y) {
          this.ball.style.setProperty("--y" , y)
     }



     rect(){
          return this.ball.getBoundingClientRect()
     }



     reset(){
          this.x = 50
          this.y = 50
          this.direction = {x: 0 , y: 0}

          while(Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >=0.9){
              
               let heading = randomNumber(0 , (2 * Math.PI) )
               this.direction = { x: Math.cos(heading) , y: Math.sin(heading) }
          }

          this.velocity = velocity
     }



     update(delta , paddlerect){
          this.x += this.direction.x * this.velocity * delta;
          this.y += this.direction.y * this.velocity * delta;
          const rect = this.rect()

          if(rect.bottom >= window.innerHeight || rect.top <= 0){
               this.direction.y *= -1
          }

          if(rect.left >= window.innerWidth || rect.right <= 0){
               this.direction.x *= -1
               this.velocity += 0.005
          }

          if(paddlerect.some( p => collision(p , rect) ) )
          {
               this.direction.x *= -1
               this.velocity += 0.005
          }
     }    
}



function randomNumber ( min , max){
     return Math.random() * (max - min) + min 
}

function collision(rect1 , rect2){
     return    rect1.right >= rect2.left &&
               rect1.left <= rect2.right &&
               rect1.bottom >= rect2.top && 
               rect1.top <= rect2.bottom          
}