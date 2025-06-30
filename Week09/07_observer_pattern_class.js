class Publisher {
  #handlers = [];  // observers

  subscribe(fn) {
    this.#handlers.push(fn);
  }

  unsubscribe(fn) {
    this.#handlers = this.#handlers.filter(
      function(item) {
        return (item !== fn);
      }
    )
  }

  fire(o, thisObj) {
    const context = thisObj || global;
    this.#handlers.forEach(function(item) {
      item.call(context, o);
    })
  }
}

// log helper
const log = (function() {
  let log = "";
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
