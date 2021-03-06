var stage = new createjs.Stage("demoCanvas");
var background = new createjs.Bitmap("img/jeziorko.png");

var karasCount = setKarasCount();
var karasie = new Family(karasCount);
var iloscJedzonka = setiloscJedzonka(60);
var hasie = new Hasie();
var szczupakCount = setSzczupakCount();
var bandaSzczupakow = new Banda(szczupakCount);
var granieNaCzekanie = setGranieNaCzekanie(200);
var maxKarasChildren = 5;
var maxSzczupakChildren = 2;

function setKarasCount(){
	return parseInt(document.getElementById("poleKarasie").value);
}
function setiloscJedzonka(liczba){
	return liczba;
}
function setSzczupakCount(){
	return parseInt(document.getElementById("poleSzczupaki").value);
}
function setGranieNaCzekanie(liczba){
	return liczba;
}

function start(){
    karasCount = setKarasCount();
    karasie = new Family(karasCount);
    iloscJedzonka = setiloscJedzonka(60);
    hasie = new Hasie();
    szczupakCount = setSzczupakCount();
    bandaSzczupakow = new Banda(szczupakCount);
    granieNaCzekanie = setGranieNaCzekanie(200);
    maxKarasChildren = 5;

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
    createjs.Ticker.addEventListener("tick", handleTick);
	stage.update();
	//Update stage will render next frame
}



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
				if(karas.childrenMade < maxKarasChildren){
                    if (karas.eatenHasie > 1 && karasie.family[i].eatenHasie > 1) {
                        karasie.addKaras();
                        karas.childrenMade++;
                        karasie.family[i].childrenMade++;
                    }
				}

			//console.log("distance " + dist);
			//console.log("Zderzenie!");
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
			console.log("Zderzenie szczupaków");
            if(szczupak.childrenMade < maxSzczupakChildren){
                if (szczupak.eatenKarasie > 15 && bandaSzczupakow.family[i].eatenKarasie > 15) {
                    bandaSzczupakow.addSzczupak();
                    szczupak.childrenMade++;
                    bandaSzczupakow.family[i].childrenMade++;
                }
                }
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
			karas.canMakeChildren = true;
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

		if(dist<=3.0 && szczupak.canEat) {
			//Szczupak je
			karasie.family[i].alive = false; //R.I.P ; <
			karasie.family[i].ticksToDeath = 0;

			szczupak.canEat=false;
			szczupak.eatenKarasie++;
			szczupak.ticksToDeath += karasie.family[i].dodatek;
			return true;
		}
        //Szczupak nie je
		szczupak.canEat=true;
	}
	return false;
}

function spawnHas() {
	//console.log("spawn");
	hasie.addHas();
}

