/**
 * Created by piotrek on 17.12.16.
 */
function Has(X,Y){
    this.hasShape = new createjs.Shape();
    this.hasShape.graphics.beginFill("red").drawCircle(0, 0, 5).endFill();
    this.hasShape.x = X;
    this.hasShape.y = Y;
    this.dodatek = 50;
    this.id = 0;
    this.zjedzony = false;
}