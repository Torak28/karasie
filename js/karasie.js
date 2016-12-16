var stage = new createjs.Stage("demoCanvas");

var count = 10;
var karasie = new Family(count);


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

    this.updatePosition = function (steps) {
        var moveVector = this.getMoveVector();
        this.karasShape.x += moveVector[0]*steps;
        this.karasShape.y += moveVector[1]*steps;

        var dist = this.distFromTarget();

        while(dist < 5.0){
            var newTarget = getRandomTarget();
            this.targetX = newTarget[0];
            this.targetY = newTarget[1];
            dist = this.distFromTarget();
        }

    }

    this.getMoveVector = function (){
        var vectorX = this.targetX - this.karasShape.x;
        var vectorY = this.targetY - this.karasShape.y;

        var len = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
        console.log("length" + len);
        vectorX = vectorX / len;
        vectorY = vectorY / len;
        console.log("vectorX " + vectorX + " vectorY " + vectorY )

        return [vectorX, vectorY];
    }
}

function Family(karasCount) {
    this.family = [];
    for(var i = 0; i < karasCount; i++){
        var position = getRandomTarget();
        var target = getRandomTarget();
        this.family[i] = new Karas(target[0],target[1],position[0],position[1]);
    }
    console.log(this.family[0]);
    this.updateFamily = function (steps) {
        for(var i = 0; i < this.family.length; i++)
            this.family[i].updatePosition(steps);
    }
}

function getRandomTarget(){
    var x = Math.random()*stage.canvas.width;
    var y = Math.random()*stage.canvas.height;

    return [x,y];
}

function init(){

    for(var i=0; i< count; i++){
        stage.addChild(karasie.family[i].karasShape);
    }

    stage.update();
    //Update stage will render next frame
}

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(){
    //Circle will move 10 units to the right.

    karasie.updateFamily(5);
    stage.update();
}



