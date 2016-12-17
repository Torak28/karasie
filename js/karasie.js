var stage = new createjs.Stage("demoCanvas");
var background = new createjs.Bitmap("img/karas.png");

var count = 10;
var karasie = new Family(count);
var iloscJedzonka = 5;
var hasie = new Hasie();

function init(){




	for(var i=0; i< count; i++){
		stage.addChild(karasie.family[i].karasShape);
	}
	for(var i=0; i< iloscJedzonka; i++){
		stage.addChild(hasie.family[i].hasShape);
		hasie.family[i].id = count+i;
	}


	spawnHas();
    stage.addChild(background);
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
			//console.log("distance " + dist);
			//console.log("Zderzenie!");
			return true;
		}


	}
	return false;
}

function findHasie(karas) {

	for(var i=0; i<iloscJedzonka; i++){
		if(hasie.family[i].zjedzony)
			continue;
		var dx = karas.karasShape.x - hasie.family[i].hasShape.x;
		var dy = karas.karasShape.y - hasie.family[i].hasShape.y;
		var dist = Math.sqrt(dx*dx + dy*dy);

		if(dist<=50.0)
			return [hasie.family[i].hasShape.x, hasie.family[i].hasShape.y ];

	}
	return [-1,-1];
}

function eatHas(karas) {

	for(var i=0; i<iloscJedzonka; i++){
		var dx = karas.karasShape.x - hasie.family[i].hasShape.x;
		var dy = karas.karasShape.y - hasie.family[i].hasShape.y;
		var dist = Math.sqrt(dx*dx + dy*dy);

		if(dist<=3.0) {
			hasie.family[i].zjedzony = true;
			hasie.updateHasie();
			karas.ticksToDeath += hasie.family[i].dodatek;

			return true;
		}

	}
	return false;
}

function spawnHas() {
	console.log("spawn");
	hasie.addHas();
}

