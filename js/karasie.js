function init() {
	var stage = new createjs.Stage("demoCanvas");
	//Sam obiekt
	var rect = new createjs.Shape();
	//Kolor i wspolrzedne
	rect.drawRect
	rect.setStrokeStyle(1);
	rect.beginStroke("#000000");
	rect.beginFill("red");
	rect.graphics.drawRect(100,100,30,20);
	rect.graphics.endFill();
	//Dodanie do stejdża
	stage.addChild(rect);
	//Jakiś apdejcik jeszcze nie
	stage.update();
	//xd
}