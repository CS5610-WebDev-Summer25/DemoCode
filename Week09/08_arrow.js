obj = {
    nums: [2, 10, 3, 15, 22, 5],
    fives: [],
    populateFives: function() {
        this.nums.forEach((v) => {
            if (v % 5 === 0){
                this.fives.push(v);
            }
        })
    }
}

obj.populateFives();
console.log(obj);

const fn1 = () => "No curly brackets";
console.log("Fn 1: ", fn1());

const fn2 = () => { "Yay curly brackets"; }
console.log("Fn 2: ", fn2());

const fn3 = () => ({
    foo: 55,
    bar: 77
});

console.log("Fn 3: ", fn3());
