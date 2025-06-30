var looper = function(x, cb){
  if(x < 5){
    setTimeout(function(){
      console.log(x);
      looper(x+1, cb);
    },1000);
  }else{
    cb();
  }
}

looper(0, function(){
  console.log('Done!');
});