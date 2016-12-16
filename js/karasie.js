var stage = new createjs.Stage("demoCanvas");
var circle = new createjs.Shape();

var naszKaras;

function Karas(trgtX, trgtY, X, Y){
    this.targetX = trgtX;
    this.targetY = trgtY;
    this.x = X;
    this.y = Y;
    this.distFromTarget = updateDistFromTarget(this);
}

function updateDistFromTarget(ryba) {
    var vecX = ryba.targetX - ryba.x;
    var vecY = ryba.targetY  - ryba.y;
    return Math.sqrt(vecX*vecX + vecY+vecY);
}
function getRandomTarget(){
    var x = Math.random()*stage.canvas.width;
    var y = Math.random()*stage.canvas.height;

    return [x,y];
}
function getMoveVector(ryba){
    var vectorX = ryba.targetX - ryba.x;
    var vectorY = ryba.targetY - ryba.y;

    var len = Math.sqrt(vectorX*vectorX + vectorY*vectorY);

    vectorX = vectorX / len;
    vectorY = vectorY / len;

    return [vectorX, vectorY];
}

function init(){

    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5).endFill();
    var target = getRandomTarget();
    naszKaras = new Karas(target[0], target[1], 100, 100);
    circle.x =naszKaras.x;
    circle.y = naszKaras.y;

    stage.addChild(circle);
    stage.update();
    //Update stage will render next frame

}

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(){
    //Circle will move 10 units to the right.
    var moveVector = getMoveVector(naszKaras);
    var stepLength = 5;

    naszKaras.x += moveVector[0]*stepLength;
    naszKaras.y += moveVector[1]*stepLength;
    naszKaras.distFromTarget = updateDistFromTarget(naszKaras);
    if(naszKaras.distFromTarget < 4){
        var newTarget = getRandomTarget();
        naszKaras.targetX = newTarget[0];
        naszKaras.targetY = newTarget[1];
        naszKaras.distFromTarget = updateDistFromTarget(naszKaras);
    }

    circle.x = naszKaras.x;
    circle.y = naszKaras.y;
    //Will cause the circle to wrap back
    if (circle.x > stage.canvas.width) { circle.x = 0; }
    if (circle.y > stage.canvas.height) { circle.y = 0; }
    stage.update();
}