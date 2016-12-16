var stage = new createjs.Stage("demoCanvas");
var rect = new createjs.Shape();
//var rodzinaKarasi;
var Jan = new Karas();
var Nikita = new Karas();
var Marek = new Karas();


function Karas(){
	this.polozenie = [];
	for (var i = 0; i < 2; i++) {
		this.polozenie[i] = Math.random() * 200;
	}
	console.log(this.polozenie[0]);
	console.log(this.polozenie[1]);

	this.show = function() {
		rect.graphics.beginFill("red");
		rect.graphics.drawRect(this.polozenie[0], this.polozenie[1], 50, 20);
		rect.graphics.endFill();
		stage.addChild(rect);
		stage.update();
	}
}

function init(){
	Jan.show();
	Nikita.show();
	Marek.show();

}

createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(){
	rect.x += rect.x + 5;
	rect.y += rect.y + 5;
	if (rect.x > stage.canvas.width) { 
		rect.x = 0; 
	}
	if (rect.y > stage.canvas.height) { 
		rect.y = 0; 
	}
	stage.update();
}

/*function populacjaKarasi(){
	this.karasie = [];
	this.wielkosc = iloscKarasi;
	for (var i = 0; i < this.wielkosc; i++) {
		this.karasie[i] = new Karas();
	}

}*/