function PrototypicalGreeting(greeting="Hello", name="Prototype") {
    this.greeting = greeting;
    this.name = name;
}

PrototypicalGreeting.prototype.greet = function() {
    return `${this.greeting}, ${this.name}!`;
}

const greeter = new PrototypicalGreeting("Hi there", "Everybody");
console.log(greeter.greet());

class ClassicalGreeting {
    constructor(greeting="Hello", name="Class") {
        this.greeting = greeting;
        this.name = name;
    }

    greet() {
        return `${this.greeting}, ${this.name}!`;
    }
}

const classyGreeter = new ClassicalGreeting("Hello", "Classmates");
console.log(classyGreeter.greet());
