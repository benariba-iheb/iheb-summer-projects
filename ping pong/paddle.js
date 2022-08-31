export default class Paddle{

     constructor(paddle){
          this.paddle = paddle;
     }


     get y1(){
          return parseFloat(getComputedStyle(this.paddle).getPropertyValue("--p1_position"))
     }  //will get the ccs variable x value
     set y1 (y1) {
          this.paddle.style.setProperty("--p1_position" , y1)
     }
     
     
     get y2(){
          return parseFloat(getComputedStyle(this.paddle).getPropertyValue("--p2_position"))
     }
     set y2 (y2) {
          this.paddle.style.setProperty("--p2_position" , y2)
     }
     reset(){
          this.y2 = 50
          this.y1 = 50
     }

     rect(){
          return this.paddle.getBoundingClientRect();
     }
}