/**
 * Created by piotrek on 17.12.16.
 */
function Banda() {
    this.family = [];
    for(var i = 0; i < szczupakCount; i++){
        var position = getRandomTarget();
        var target = getRandomTarget();
        this.family[i] = new Szczupak(target[0],target[1],position[0],position[1]);
        this.family[i].id =i;
    }

    this.updateBanda = function (steps) {
        for(var i = 0; i < this.family.length; i++){
            this.family[i].updatePosition(steps);
            if(!this.family[i].alive){
                stage.removeChild(this.family[i].szczupakShape);
            }
        }
    }
}