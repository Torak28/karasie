function Karas(trgtX, trgtY, X, Y){
	this.karasShape = new createjs.Shape();
	this.karasShape.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5).endFill();
	this.karasShape.x = X;
	this.karasShape.y = Y;

	this.targetX = trgtX;
	this.targetY = trgtY;
	this.distFromTarget = function() {
		var vecX = this.targetX - this.karasShape.x;
		var vecY = this.targetY  - this.karasShape.y;
		return Math.sqrt(vecX*vecX + vecY+vecY);
	};

	this.updatePosition = function (steps) {
		var moveVector = this.getMoveVector();
		this.karasShape.x += moveVector[0]*steps;
		this.karasShape.y += moveVector[1]*steps;

		var dist = this.distFromTarget();

		while(dist < 5.0){
			var newTarget = getRandomTarget();
			this.targetX = newTarget[0];
			this.targetY = newTarget[1];
			dist = this.distFromTarget();
		}

	}

	this.getMoveVector = function (){
		var vectorX = this.targetX - this.karasShape.x;
		var vectorY = this.targetY - this.karasShape.y;

		var len = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
		console.log("length" + len);
		vectorX = vectorX / len;
		vectorY = vectorY / len;
		console.log("vectorX " + vectorX + " vectorY " + vectorY )

		return [vectorX, vectorY];
	}
}

function getRandomTarget(){
	var x = Math.random()*stage.canvas.width;
	var y = Math.random()*stage.canvas.height;

	return [x,y];
}