var stage = new createjs.Stage("demoCanvas");

var count = 20;
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

function checkCollisions(karas) {

    for(var i=0; i<count; i++){
        if(!karasie.family[i].alive || karasie.family[i].id == karas.id )
            continue;

        var dx = karas.karasShape.x - karasie.family[i].karasShape.x;
        var dy = karas.karasShape.y - karasie.family[i].karasShape.y;
        var dist = Math.sqrt(dx*dx + dy*dy);

        if(dist<=10.0){
            console.log("distance " + dist);
            console.log("Zderzenie!");
            return true;
        }


    }
    return false;
}


