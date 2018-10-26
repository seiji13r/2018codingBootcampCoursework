// Constructor Letter
var Letter = function(character){
 
  // Letter Properties
  this.character = character;
  this.guessed = false;
  // Letter Methods
  this.display = function(){
    if(this.guessed){
      console.log(character.charAt(0));
    }else{
      console.log("_")
    }
  }
  this.isThis = function(charInput){
    if(charInput.charAt(0) === this.character.charAt(0)){
      this.guessed = true;
    }
  }
}

// Exporting Letter Constructor
module.exports = Letter;