class Foo { foo: number; }
class Bar { bar: string; }

class Baz {
    constructor(foo: Foo, bar: Bar) { }
}

let baz = new Baz(new Foo(), new Bar()); // valid
// let baz = new Baz(new Bar(), new Foo());     // tsc errors
