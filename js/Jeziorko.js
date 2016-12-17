var stage = new createjs.Stage("demoCanvas");
var background = new createjs.Bitmap("img/jeziorko.png");

var karasCount = setKarasCount(20);
var karasie = new Family(karasCount);
var iloscJedzonka = setiloscJedzonka(30);
var hasie = new Hasie();
var szczupakCount = setSzczupakCount(3);
var bandaSzczupakow = new Banda(szczupakCount);
var granieNaCzekanie = setGranieNaCzekanie(200);

var bornKarasie = 0;
var maxBornKarasiePerTick = parseInt(0.5*karasCount);

function setKarasCount(liczba){
	return liczba;
}
function setiloscJedzonka(liczba){
	return liczba;
}
function setSzczupakCount(liczba){
	return liczba;
}
function setGranieNaCzekanie(liczba){
	return liczba;
}

function init(){
	console.log("xd");
	stage.addChild(background);
	for(var i=0; i< karasCount; i++){
		stage.addChild(karasie.family[i].karasShape);
	}
	for(var i=0; i< iloscJedzonka; i++){
		stage.addChild(hasie.family[i].hasShape);
		hasie.family[i].id = karasCount+i;
	}

	for(var i=0; i< szczupakCount; i++)
		stage.addChild(bandaSzczupakow.family[i].szczupakShape);



	spawnHas();
	stage.update();
	//Update stage will render next frame
}

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(){
	bornKarasie = 0;
	bandaSzczupakow.updateBanda(5.5);
	karasie.updateFamily(5);
	stage.update();
}

function checkCollisions(karas) {

	for(var i=0; i<karasCount; i++){
		if(!karasie.family[i].alive || karasie.family[i].id == karas.id )
			continue;

		var dx = karas.karasShape.x - karasie.family[i].karasShape.x;
		var dy = karas.karasShape.y - karasie.family[i].karasShape.y;
		var dist = Math.sqrt(dx*dx + dy*dy);

		if(dist<=10.0){
			if(bornKarasie < maxBornKarasiePerTick) {

				if (karas.eatenHasie > 1 && !karas.justMadeChildren && karasie.family[i].eatenHasie > 1 && !karasie.family[i].justMadeChildren) {
					//karasie.addKaras();
					karas.justMadeChildren = true;
					karasie.family[i].justMadeChildren = true;
				}
				else {
					karas.justMadeChildren = false;
					karasie.family[i].justMadeChildren = false;
				}
				bornKarasie++;
			}
			//console.log("distance " + dist);
			console.log("Zderzenie!");
			return true;
		}


	}
	return false;
}


function checkSzczupakCollisions(szczupak) {

	//console.log(bandaSzczupakow.family);
	for(var i=0; i<szczupakCount; i++){
		if(!bandaSzczupakow.family[i].alive || bandaSzczupakow.family[i].id == szczupak.id )
			continue;

		var dx = szczupak.szczupakShape.x - bandaSzczupakow.family[i].szczupakShape.x;
		var dy = szczupak.szczupakShape.y - bandaSzczupakow.family[i].szczupakShape.y;
		var dist = Math.sqrt(dx*dx + dy*dy);

		if(dist<=14.0){
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

		if(dist<=100.0)
			return [hasie.family[i].hasShape.x, hasie.family[i].hasShape.y ];

	}
	return [-1,-1];
}

function findKarasie(szczupak) {

	for(var i=0; i<karasCount; i++){
		if(!karasie.family[i].alive)
			continue;
		var dx = szczupak.szczupakShape.x - karasie.family[i].karasShape.x;
		var dy = szczupak.szczupakShape.y - karasie.family[i].karasShape.y;
		var dist = Math.sqrt(dx*dx + dy*dy);

		if(dist<=50.0)
			return [karasie.family[i].karasShape.x, karasie.family[i].karasShape.y ];

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
			karas.eatenHasie++;
			return true;
		}

	}
	return false;
}

function eatKaras(szczupak) {

	for(var i=0; i<karasCount; i++){
		var dx = szczupak.szczupakShape.x - karasie.family[i].karasShape.x;
		var dy = szczupak.szczupakShape.y - karasie.family[i].karasShape.y;
		var dist = Math.sqrt(dx*dx + dy*dy);

		if(dist<=3.0) {
			karasie.family[i].alive = false; //R.I.P ; <
			karasie.family[i].ticksToDeath = 0;
			//karasie.updateFamily();

			szczupak.ticksToDeath += karasie.family[i].dodatek;
			return true;
		}

	}
	return false;
}

function spawnHas() {
	//console.log("spawn");
	hasie.addHas();
}

