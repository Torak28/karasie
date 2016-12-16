function init() {
    var canvas = document.getElementById("Canvas");
    var stage = new createjs.Stage(canvas);

    //Sam obiekt
    var rect = new createjs.Shape();
    //Kolor i wspolrzedne
    rect.graphics.beginFill("DeepSkyBlue").drawRect(20,20,100,50);
    //Dodanie do stejdża
    stage.addChild(rect);
    //Jakiś apdejcik jeszcze nie
    stage.update();
}