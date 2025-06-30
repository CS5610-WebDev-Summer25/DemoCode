const my_obj = {
    'foo': 512,
    'bar': 221,
}

const { foo } = my_obj;
console.log(foo);

const baz = 999
let my_new_obj = { ...my_obj, baz };

console.log(my_new_obj);
