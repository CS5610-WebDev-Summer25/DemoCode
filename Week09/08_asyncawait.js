async function f1() {
    return "Hi there";
}

let p = f1();

console.log(p);
p.then(console.log);

function f2() {
    let promise = new Promise((resolve) => {
        setTimeout(() => resolve("promise done"), 1000)
    });

    // Conventional (older) way of handling a promise:
    promise.then(console.log);
}

f2();

async function f3() {
    let promise = new Promise((resolve) => {
        setTimeout(() => resolve("await done"), 1000)
    });

    // Await style handling a promise:
    let result = await promise;
    console.log(result);
}

f3();
