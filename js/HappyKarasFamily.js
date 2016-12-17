/**
 * Created by piotrek on 17.12.16.
 */
function Family(karasCount) {
	this.family = [];
	for(var i = 0; i < karasCount; i++){
		var position = getRandomTarget();
		var target = getRandomTarget();
		this.family[i] = new Karas(target[0],target[1],position[0],position[1]);
		this.family[i].id = i;
	}
	//console.log(this.family[0]);
	this.updateFamily = function (steps) {
		for(var i = 0; i < this.family.length; i++){
			this.family[i].updatePosition(steps);
			if(!this.family[i].alive){
				stage.removeChild(this.family[i].karasShape);
			}
		}
	}
	 this.addKaras = function () {
		console.log("addkaras func");
		var position = getRandomTarget();
		var target = getRandomTarget();
		//Jeśli są jakieś martwe karsie to je ożywiamy
		var added = false;
		for(var i=0; i<karasCount; i++){
			var alive = this.family[i].alive;
			if(!alive){
				console.log("karas spawn");
				this.family[i].alive = true;
				this.family[i].karasShape.x = position[0];
				this.family[i].karasShape.y = position[1];
				this.family[i].targetX = target[0];
				this.family[i].targetY = target[0];
				this.family[i].ticksToDeath = 50 + parseInt(Math.random()*200);
				this.family[i].eatenHasie = 0;
				stage.addChild(this.family[i].karasShape);
				added = true;
				break;
			}
		}

		//jeśli jakiegoś ożywiliśmy to koniec
		if(added)
			return;

		var newFamily = [];
		for(var i = 0; i < karasCount; i++)
			newFamily[i] = this.family[i];
		newFamily[karasCount] = new Karas(target[0], target[1], position[0], position[1]);
		this.family = newFamily;
		stage.addChild(this.family[karasCount].karasShape);
		karasCount++;
		console.log("nowy karas " + karasCount);
	}

}