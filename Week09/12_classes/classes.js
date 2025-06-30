// Example 1: Creating a new class (declaration form)

class Polygon {
  constructor(height, width) {
    this.name = 'Polygon';
    this.height = height;
    this.width = width;
  }

  sayName() {
    console.log('Hi, I am a ', this.name + '.');
  }

  sayHistory() {
    console.log('"Polygon" is derived from the Greek polus (many) ' +
      'and gonia (angle).');
  }
}

let p = new Polygon(300, 400);
p.sayName();
console.log('The width of this polygon is ' + p.width);


// ===============================================================
// Example 2: Creating a new class (expression form)

const MyPoly = class Poly {
  getPolyName() {
    console.log('Hi. I was created with a Class expression. My name is ' +
      Poly.name);
  }
};

let inst = new MyPoly();
inst.getPolyName();

// ===============================================================
// Example 3: Extending an existing class

class Square extends Polygon {
  constructor(length) {
    super(length, length);
    this.name = 'Square';
  }

  get area() {
    return this.height * this.width;
  }

  set area(value) {
    this.area = value;
  }
}

let s = new Square(5);

s.sayName();
console.log('The area of this square is ' + s.area);


// ===============================================================
// Example 4: Subclassing methods of a parent classs

class Rectangle extends Polygon {
  constructor(height, width) {
    super(height, width);
    this.name = 'Rectangle';
  }
  // Here, sayName() is a subclassed method which
  // overrides their superclass method of the same name.
  sayName() {
    console.log('Sup! My name is ', this.name + '.');
    super.sayHistory();
  }
}

let r = new Rectangle(50, 60);
r.sayName();



// ===============================================================
// Example 5: Defining static methods

class Triple {
  static triple(n) {
    n = n || 1;
    return n * 3;
  }
}

class BiggerTriple extends Triple {
  static triple(n) {
    return super.triple(n) * super.triple(n);
  }
}

console.log(Triple.triple());
console.log(Triple.triple(6));
console.log(BiggerTriple.triple(3));
// var tp = new Triple();
// console.log(tp.triple()); // tp.triple is not a function


// ===============================================================
// Example 6: Subclassing built-in classes and DOM

class MyDate extends Date {
  constructor() {
    super();
  }

  getFormattedDate() {
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'];
    return this.getDate() + '-' + months[this.getMonth()] + '-' +
      this.getFullYear();
  }
}

var aDate = new MyDate();
console.log(aDate.getTime());
console.log(aDate.getFormattedDate());



// Extend Uint8Array
class ExtendedUint8Array extends Uint8Array {
  constructor() {
    super(10);
    this[0] = 255;
    this[1] = 0xFF;
  }
}

var eua = new ExtendedUint8Array();
console.log(eua.byteLength);
console.log(eua.buffer);
console.log(eua[0]);
console.log(eua[1]);

class Stack extends Array {
  constructor() {
    super();
  }

  top() {
    return this[this.length - 1];
  }
}

var stack = new Stack();
stack.push('world');
stack.push('hello');
console.log(stack.top());
console.log(stack.length);


// Extend DOM Audio element
class MyAudio extends Audio {
  constructor() {
    super();
    this._lyrics = '';
  }

  get lyrics() {
    return this._lyrics;
  }

  set lyrics(str) {
    this._lyrics = str;
  }
}

var player = new MyAudio();
player.controls = true;
player.lyrics = 'Never gonna give you up';
document.querySelector('body').appendChild(player);
console.log(player.lyrics);
