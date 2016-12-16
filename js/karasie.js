function init() {
    var canvas = document.getElementById("Canvas");
    var stage = new createjs.Stage(canvas);

    //Sam obiekt
    var rect = new createjs.Rectangle(0,0,100,100);
    //Kolor i wspolrzedne
    rect.graphics.beginFill("DeepSkyBlue");
    //Nadpisanie XY
    //circle.x = 100;
    //circle.y = 100;
    //Dodanie do stejdża
    stage.addChild(circle);


    //Jakiś apdejcik jeszcze nie wiem co
    stage.update();
}