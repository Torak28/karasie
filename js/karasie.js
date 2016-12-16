function init() {
	var canvas = document.getElementById("Canvas");
	var stage = new createjs.Stage(canvas);

	//Sam obiekt
	var rect = new createjs.Graphics();
	//Kolor i wspolrzedne
 	rect.drawCircle(0,0,30);
	rect.setStrokeStyle(1);
 	rect.beginStroke("#000000");
 	rect.beginFill("red");
	//Dodanie do stejdża
	stage.addChild(rect);
	//Jakiś apdejcik jeszcze nie
	stage.update();
	//xd
}