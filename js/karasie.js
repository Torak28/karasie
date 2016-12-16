var stage = new createjs.Stage("demoCanvas");


var naszKaras;

function Karas(trgtX, trgtY, X, Y){
    this.karasShape = new createjs.Shape();
    this.karasShape.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5).endFill();
    this.karasShape.x = X;
    this.karasShape.y = Y;

    this.targetX = trgtX;
    this.targetY = trgtY;
    this.distFromTarget = function() {
        var vecX = this.targetX - this.karasShape.x;
        var vecY = this.targetY  - this.karasShape.y;
        return Math.sqrt(vecX*vecX + vecY+vecY);
    };
}


function getRandomTarget(){
    var x = Math.random()*stage.canvas.width;
    var y = Math.random()*stage.canvas.height;

    return [x,y];
}
function getMoveVector(ryba){
    var vectorX = ryba.targetX - ryba.karasShape.x;
    var vectorY = ryba.targetY - ryba.karasShape.y;

    var len = Math.sqrt(vectorX*vectorX + vectorY*vectorY);

    vectorX = vectorX / len;
    vectorY = vectorY / len;

    return [vectorX, vectorY];
}

function init(){


    var target = getRandomTarget();
    naszKaras = new Karas(target[0], target[1], 100, 100);

    stage.addChild(naszKaras.karasShape);
    stage.update();
    //Update stage will render next frame

}

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(){
    //Circle will move 10 units to the right.
    var moveVector = getMoveVector(naszKaras);
    var stepLength = 5;

    naszKaras.karasShape.x += moveVector[0]*stepLength;
    naszKaras.karasShape.y += moveVector[1]*stepLength;


    var dist = naszKaras.distFromTarget();

    if(dist < 3.0) {
        var newTarget = getRandomTarget();
        naszKaras.targetX = newTarget[0];
        naszKaras.targetY = newTarget[1];
    }

    stage.update();
}



