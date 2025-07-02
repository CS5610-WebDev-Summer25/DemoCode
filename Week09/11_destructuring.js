const my_obj = {
    'foo': 512,
    'bar': 221,
    'ls': ['a', 'b', 'c']
}

const { foo } = my_obj;
console.log(foo);

const baz = 999
let my_new_obj = { ...my_obj, baz };

console.log(my_new_obj);

my_new_obj.foo = 555;

console.log(my_new_obj);
console.log(my_obj);

my_new_obj.ls = ['f', 'g', ...my_new_obj.ls]

console.log(my_new_obj);
console.log(my_obj);

blip = 'hello';
my_new_obj = {
    ...my_new_obj,
    'blag': {
        'bloog': {
            'merp': 999,
            [blip]: 888
        }
    }
}
console.log(my_new_obj)

console.log("********************")

const { blag, blag: { bloog: { merp }}} = my_new_obj;
console.log(blag);
console.log(merp);
