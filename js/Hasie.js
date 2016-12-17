/**
 * Created by piotrek on 17.12.16.
 */
function Hasie(){
    this.family = [];

    for(var i = 0; i < iloscJedzonka; i++){
        var position = getRandomTarget();
        this.family[i] = new Has(position[0],position[1]);
    }
    this.size = this.family.length;

    this.updateHasie = function (steps) {
        for(var i = 0; i < this.family.length; i++) {
            if(this.family[i].zjedzony) {
                stage.removeChild(this.family[i].hasShape);
                console.log("xd")
            }
        }
    }

    this.addHas = function(){
        console.log(this.family[0]);
        var position = getRandomTarget();
        for(var i =0; i< iloscJedzonka; i++) {
            var zjedzony = this.family[i].zjedzony;
            if (zjedzony) {
                this.family[i].zjedzony = false;
                this.family[i].hasShape.x = position[0];
                this.family[i].hasShape.y = position[1];
                stage.addChild(this.family[i].hasShape);
                break;
            }
        }
        setTimeout(spawnHas,400);
    }
}