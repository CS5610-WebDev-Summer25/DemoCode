function Publisher() {
  this.handlers = [];  // observers
}

Publisher.prototype = {
  subscribe: function(fn) {
      this.handlers.push(fn);
  },
  unsubscribe: function(fn) {
      this.handlers = this.handlers.filter(
          function(item) {
            return (item !== fn);
          }
      );
  },
  fire: function(o, thisObj) {
      var context = thisObj || global;
      this.handlers.forEach(function(item) {
          item.call(context, o);
          // item(o) // same except we pass a context/'this'
      });
  }
}

// log helper
var log = (function() {
  var log = "";
  return {
      add: function(msg) { log += msg + "\n"; },
      show: function() { console.log(log); log = ""; }
  }
})();

function run() {
  var eventHandler = function(item) {
      log.add("fired: " + item);
  };

  var myPublisher = new Publisher();

  myPublisher.subscribe(eventHandler);
  myPublisher.fire('event #1');           //"fired: event#1"
  myPublisher.unsubscribe(eventHandler);
  myPublisher.fire('event #2');           //nothing
  myPublisher.subscribe(eventHandler);
  myPublisher.fire('event #3');           //"fired: event#3"

  log.show();
}

run();
