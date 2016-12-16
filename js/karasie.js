var stage = new createjs.Stage("demoCanvas");
var circle = new createjs.Shape();

var naszKaras;

function Karas(trgtX, trgtY, X, Y){
    this.targetX = trgtX;
    this.targetY = trgtY;
    this.x = X;
    this.y = Y;
    this.distFromTarget = function() {
        var vecX = this.targetX - this.x;
        var vecY = this.targetY  - this.y;
        return Math.sqrt(vecX*vecX + vecY+vecY);
    };
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

    circle.x = naszKaras.x;
    circle.y = naszKaras.y;

    naszKaras.x += moveVector[0]*stepLength;
    naszKaras.y += moveVector[1]*stepLength;


    var dist = naszKaras.distFromTarget();

    if(dist < 5.0) {
        console.error("weszło");
        do {
            var newTarget = getRandomTarget();
            naszKaras.targetX = newTarget[0];
            naszKaras.targetY = newTarget[1];
        } while (naszKaras.distFromTarget() < 5);
    }

    stage.update();
}



