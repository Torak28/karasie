var stage = new createjs.Stage("demoCanvas");
var circle = new createjs.Shape();

function Karas(trgtX, trgtY){
    this.targetX = trgtX;
    this.targetY = trgtY;
}
function init(){

    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5).endFill();
    circle.x =100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
    //Update stage will render next frame

}

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(){
    //Circle will move 10 units to the right.
    var moveVector = getRandMoveVector();
    circle.x += moveVector[0]*10;
    circle.y += moveVector[1]*10;
    //Will cause the circle to wrap back
    if (circle.x > stage.canvas.width) { circle.x = 0; }
    if (circle.y > stage.canvas.height) { circle.y = 0; }
    stage.update();
}

function getRandMoveVector(){
    var x = Math.random();
    var y = Math.random();

    var vecLen = Math.sqrt(x*x + y*y);

    x = x/vecLen;
    y = y/vecLen;

    return [x,y];
}
