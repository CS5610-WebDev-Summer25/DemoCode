obj = {
    nums: [2, 10, 3, 15, 22, 5],
    fives: [],
    populateFives: function(){
        this.nums.forEach(function(v) {
            if (v % 5 === 0){
                this.fives.push(v);
            }
        })
    }
}

obj.populateFives();
console.log(obj);
