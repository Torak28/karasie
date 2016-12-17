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

    this.addSzczupak = function(){
        console.log("ozywiamy szczupaka");
        var position = getRandomTarget();
        var target = getRandomTarget();
        //Jeśli są jakieś martwe karsie to je ożywiamy
        var added = false;
        for(var i=0; i<szczupakCount; i++){
            var alive = this.family[i].alive;
            if(!alive){
                this.family[i].alive = true;
                this.family[i].szczupakShape.x = position[0];
                this.family[i].szczupakShape.y = position[1];
                this.family[i].targetX = target[0];
                this.family[i].targetY = target[0];
                this.family[i].ticksToDeath = 50 + parseInt(Math.random()*200);
                this.family[i].canEat=true;
                this.childrenMade = 0;
                stage.addChild(this.family[i].szczupakShape);
                added = true;
                break;
            }
        }

        //jeśli jakiegoś ożywiliśmy to koniec
        if(added)
            return;

        var newFamily = [];
        for(var i = 0; i < szczupakCount; i++)
            newFamily[i] = this.family[i];
        newFamily[szczupakCount] = new Szczupak(target[0], target[1], position[0], position[1]);
        this.family = newFamily;
        stage.addChild(this.family[szczupakCount].szczupakShape);
        szczupakCount++;
        console.log("nowy szczupak " + szczupakCount);
    }

}