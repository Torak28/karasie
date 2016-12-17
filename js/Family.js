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
	console.log(this.family[0]);
	this.updateFamily = function (steps) {
		for(var i = 0; i < this.family.length; i++){
			this.family[i].updatePosition(steps);
			if(!this.family[i].alive)
				stage.removeChildAt(i);
		}

	}
}