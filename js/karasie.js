function init() {
    var canvas = document.getElementById("Canvas");
    var stage = new createjs.Stage(canvas);

    //Sam obiekt
    var circle = new createjs.Shape();
    //Kolor i wspolrzedne
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5);
    //Nadpisanie XY
    circle.x = 100;
    circle.y = 100;
    //Dodanie do stejdża
    stage.addChild(circle);


    //Jakiś apdejcik jeszcze nie wiem co
    stage.update();
}