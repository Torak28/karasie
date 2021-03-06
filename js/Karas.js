/**
 * Created by piotrek on 17.12.16.
 */
function Karas(trgtX, trgtY, X, Y){
	this.karasShape = new createjs.Bitmap("img/karas_small.png");
	//this.karasShape.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 5).endFill();
	this.karasShape.scaleX = 0.3;
	this.karasShape.scaleY = 0.3;
	this.karasShape.x = X + 5;
	this.karasShape.y = Y + 5;
	this.childrenMade = 0;
	this.eatenHasie = 0;


	this.id = 0;
	this.alive = true;
	this.ticksToDeath = 150 + parseInt(Math.random()*200);
	this.dodatek = 50;

	this.targetX = trgtX;
	this.targetY = trgtY;
	this.distFromTarget = function() {
		var vecX = this.targetX - this.karasShape.x;
		var vecY = this.targetY  - this.karasShape.y;
		return Math.sqrt(vecX*vecX + vecY+vecY);
	};

	this.updatePosition = function (steps) {
		if(this.alive){
			var foodAround = findHasie(this);
			var hasOnLock = false;
			if( foodAround[0] != -1){
				this.targetX = foodAround[0];
				this.targetY = foodAround[1];
				hasOnLock = true;
			}
			//Jeśli Karaś jest na celu to spróbuj go zjeść!
			if(hasOnLock)
				eatHas(this);

			var moveVector = this.getMoveVector();
			//wykonujemy ruch
			this.karasShape.x += moveVector[0]*steps;
			this.karasShape.y += moveVector[1]*steps;

			var dist = this.distFromTarget();
			var collision = checkCollisions(this);

			while(collision){
				//cofamy ruch bo kolizja
				this.karasShape.x -= moveVector[0]*steps;
				this.karasShape.y -= moveVector[1]*steps;

				var nTarget = getRandomTarget();
				this.targetX = nTarget[0];
				this.targetY = nTarget[1];

				moveVector = this.getMoveVector();
				this.karasShape.x += moveVector[0]*steps;
				this.karasShape.y += moveVector[1]*steps;

				dist = this.distFromTarget();
				collision = checkCollisions(this);
				this.ticksToDeath--;
                if(this.ticksToDeath == 0)
                    this.alive = false;
                return;
			}

			while(dist < 5.0 && !hasOnLock){
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
		var vectorX = this.targetX - this.karasShape.x;
		var vectorY = this.targetY - this.karasShape.y;

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