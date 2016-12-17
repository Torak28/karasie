/**
 * Created by piotrek on 17.12.16.
 */
function Hasie(){
    this.family = [];
    for(var i = 0; i < iloscJedzonka; i++){
        var position = getRandomTarget();
        this.family[i] = new Has(position[0],position[1]);
    }
    this.updateHasie = function (steps) {
        for(var i = 0; i < this.family.length; i++) {
            if(this.family[i].zjedzony) {
                stage.removeChild(this.family[i].hasShape);
                console.log("xd")
            }
        }
    }
}