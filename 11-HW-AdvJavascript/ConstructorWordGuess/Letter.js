// Letter Constructor
var Letter = function(character){
 
  // Letter Properties
  this.character = character.charAt(0);
  // Check if the letter is an Space, if so then always display it.
  if(this.character !== " "){
    this.guessed = false;
  }
  else {
    this.guessed = true;
  }
  
  // Letter Methods
  // display: This Method will return the Letter only if this has been guessed
  this.display = function(){
    if(this.guessed){
      // console.log(this.character);
      return this.character;
    }else{
      // console.log("_")
      return "_"
    }
  }

  // isThis: This Method will compare a character to this Letter and turn the 
  // guessed value to true if it was guessed.
  this.isThis = function(charInput){
    if(charInput.toUpperCase().charAt(0) === this.character.toUpperCase()){
      this.guessed = true;
      return true;
    }
    else{
      return false;
    }
  }

  // forceDisplay: This Method will force display the Letter regardless if it 
  // was not guessed.
  this.forceDisplay = function(){
    return this.character;
  }
}

// Exporting Letter Constructor
module.exports = Letter;