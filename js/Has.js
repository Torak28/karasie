/**
 * Created by piotrek on 17.12.16.
 */
function Has(X,Y){
	this.hasShape = new createjs.Bitmap("img/smiec2.png");;
	//this.hasShape.graphics.beginFill("red").drawCircle(0, 0, 5).endFill();
	this.hasShape.x = X - 5;
	this.hasShape.y = Y - 5;
	this.dodatek = 50;
	this.id = 0;
	this.zjedzony = false;
    this.hasShape.scaleX = 0.25;
    this.hasShape.scaleY = 0.25;
}