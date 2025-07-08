function Proto() {
  this.name = 'Proto';
  return this;
}

class MyClass extends Proto {
  constructor() {
    super();
    this.name = 'MyClass';
  }
}

const instance = new MyClass();
// console.log(instance.getName());
