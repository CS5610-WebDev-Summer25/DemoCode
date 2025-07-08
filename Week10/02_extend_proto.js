function Proto() {
  this.name = 'Proto';
  this.getName = function() { return `Overridden in Proto instance: ${this.name}`}
  return this;
}

Proto.prototype.getName = function() {
  return `Overridden in Proto: ${this.name}`;
}

class MyClass extends Proto {
  constructor() {
    super();
    this.name = 'MyClass';
  }

  getName() {
    return `Overridden in MyClas: ${this.name}`;
  }

  getName = function() { return `Overridden in MyClass instance: ${this.name}`}
}

const instance = new MyClass();
console.log(instance.getName());
