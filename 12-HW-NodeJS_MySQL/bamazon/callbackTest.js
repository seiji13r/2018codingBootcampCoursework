function callbackTest(myFunc){
  if(myFunc){
    myFunc();
  }
  else{
    console.log("No callback function provided");
  }
}

callbackTest(
  function() {
    console.log("Hello World!!!")
  }
);