var i = 0;

var looper = function(x){
  if(x < 5){
    setTimeout(function(){
      console.log(x);
      looper(x+1);
    },1000);
  }
}

looper(i);