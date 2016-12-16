function init() {
	var stage = new createjs.Stage("demoCanvas");
/*
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
*/
	var circle = new createjs.Shape();
	circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 50);
	circle.x = 100;
	circle.y = 100;
	stage.addChild(circle);
	stage.update();
}