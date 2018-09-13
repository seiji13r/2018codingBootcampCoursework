console.log("02StarWarsRPGGame");

var obiwan = {
    name: "Obi Wan",
    health: 100,
    attackLevel: 200,
    htmlElement: $("#obiwan"),
    setName: function(){
        this.htmlElement.find('.character-name').text(this.name);
    },
    setHealth: function(){
        this.htmlElement.find('.character-health').text(this.health);
    },
    

}