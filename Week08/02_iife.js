for (var i = 0; i < 5; i++){
  (function(a){
    setTimeout(function(){
      console.log(a);
    },1000);
  })(i);
}