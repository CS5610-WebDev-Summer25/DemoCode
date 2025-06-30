function looper(val, callback){
  var i = 0;
  var counter = setInterval(function(){
    console.log(i);
    i++;
    if (i === val) {
        clearInterval(counter);
        callback(); }
  }, 1000);
}

looper(5, function(){
  console.log('Done!');
});