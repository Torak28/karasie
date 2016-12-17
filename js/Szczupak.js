/**
 * Created by piotrek on 17.12.16.
 */
function Szczupak(trgtX, trgtY, X, Y){
    this.szczupakShape = new createjs.Bitmap("img/zymbok.png");
	this.szczupakShape.x = X - 8;
	this.szczupakShape.y = Y - 8;

	this.szczupakShape.scaleX = 0.17;
	this.szczupakShape.scaleY = 0.17;


	this.id = 0;
	this.alive = true;
	this.ticksToDeath = 150 + parseInt(Math.random()*200);

	this.targetX = trgtX;
	this.targetY = trgtY;
	this.distFromTarget = function() {
		var vecX = this.targetX - this.szczupakShape.x;
		var vecY = this.targetY  - this.szczupakShape.y;
		return Math.sqrt(vecX*vecX + vecY+vecY);
	};

	this.updatePosition = function (steps) {
		if(this.alive){
			var foodAround = findKarasie(this);
			var hasOnLock = false;
			if( foodAround[0] != -1){
				this.targetX = foodAround[0];
				this.targetY = foodAround[1];
				hasOnLock = true;
			}
			if(hasOnLock)
				eatKaras(this);

			var moveVector = this.getMoveVector();
			//wykonujemy ruch
			this.szczupakShape.x += moveVector[0]*steps;
			this.szczupakShape.y += moveVector[1]*steps;

			var dist = this.distFromTarget();
			var collision = checkSzczupakCollisions(this);

			while(collision){
				//cofamy ruch bo kolizja
				this.szczupakShape.x -= moveVector[0]*steps;
				this.szczupakShape.y -= moveVector[1]*steps;

				var nTarget = getRandomTarget();
				this.targetX = nTarget[0];
				this.targetY = nTarget[1];

				moveVector = this.getMoveVector();
				this.szczupakShape.x += moveVector[0]*steps;
				this.szczupakShape.y += moveVector[1]*steps;

				dist = this.distFromTarget();
				collision = checkSzczupakCollisions(this);
			}

			while(dist < 7.0 && !hasOnLock){
				var newTarget = getRandomTarget();
				this.targetX = newTarget[0];
				this.targetY = newTarget[1];
				dist = this.distFromTarget();
			}

			this.ticksToDeath--;
			if(this.ticksToDeath == 0)
				this.alive = false;
		}
	}

	this.getMoveVector = function (){
		var vectorX = this.targetX - this.szczupakShape.x;
		var vectorY = this.targetY - this.szczupakShape.y;

		var len = Math.sqrt(vectorX*vectorX + vectorY*vectorY);
		vectorX = vectorX / len;
		vectorY = vectorY / len;

		return [vectorX, vectorY];
	}
}

function getRandomTarget(){
	var x = Math.random()*stage.canvas.width;
	var y = Math.random()*stage.canvas.height;

	return [x,y];
}