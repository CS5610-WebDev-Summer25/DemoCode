let Employee = (function () {

    // Private variable
    let empName = '';

    return class {
        constructor(name) {
            empName = name;
        }

        // Public method
        getPrivateName() {
            return empName;
        }
    }

})();

const employee = new Employee('Jane');

// Can access public method
console.log(employee.getPrivateName());

// Cannot access private variable
console.log(employee.empName);
