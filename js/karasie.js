var rect;
var stage;

function init() {
	//Sam obiekt
	stage = new createjs.Stage("demoCanvas");
	rect = new createjs.Shape();
	//Kolor i wspolrzedne
	rect.graphics.beginFill("red");
	rect.graphics.drawRect(100,100,30,20);
	rect.graphics.endFill();

	//Dodanie do stejdża
	stage.addChild(rect);
	//Jakiś apdejcik jeszcze nie
	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(30);
}

function tick(event) {
	rect.x = rect.x + 5;
	if(rect.x > stage.canvas.width || rect.x < stage.canvas.width){
		rect.x = 0;
	}
	if(rect.y > stage.canvas.height || rect.y < stage.canvas.height){
		rect.y = 0;
	}
	stage.update(event);
}