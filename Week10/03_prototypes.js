let parent = { foo: 'foo' };
let child = {};

Object.setPrototypeOf(child, parent);

console.log(child.foo);

child.foo = "bar";

console.log(child.foo);
console.log(parent.foo);

delete child.foo;

console.log(child.foo);

parent.foo = "baz";
console.log(child.foo);
