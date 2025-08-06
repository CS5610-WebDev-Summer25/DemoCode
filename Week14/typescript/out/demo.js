var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
var Bar = /** @class */ (function () {
    function Bar() {
    }
    return Bar;
}());
var Baz = /** @class */ (function () {
    function Baz(foo, bar) {
    }
    return Baz;
}());
var baz = new Baz(new Foo(), new Bar()); // valid
// let baz = new Baz(new Bar(), new Foo());     // tsc errors
