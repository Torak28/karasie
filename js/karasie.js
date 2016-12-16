var stage = new createjs.Stage("demoCanvas");

var count = 10;
var karasie = new Family(count);

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



