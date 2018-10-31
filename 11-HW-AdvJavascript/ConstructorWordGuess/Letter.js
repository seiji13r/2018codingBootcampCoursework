// Constructor Letter
var Letter = function(character){
 
  // Letter Properties
  this.character = character.charAt(0);
  // Check if this is an Space
  if(this.character !== " "){
    this.guessed = false;
  }
  else {
    this.guessed = true;
  }
  // Letter Methods
  this.display = function(){
    if(this.guessed){
      // console.log(character.charAt(0));
      return character;
    }else{
      // console.log("_")
      return "_"
    }
  }
  this.isThis = function(charInput){
    if(charInput.toUpperCase().charAt(0) === this.character.toUpperCase()){
      this.guessed = true;
      return true;
    }
    else{
      return false;
    }
  }
  this.forceDisplay = function(){
    return character;
  }
}

// Exporting Letter Constructor
module.exports = Letter;