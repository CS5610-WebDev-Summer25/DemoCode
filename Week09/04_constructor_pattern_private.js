class Employee {
    #empName = '';
    constructor(name) {
        this.#empName = name;
    }

    // Public method
    getPrivateName() {
        return this.#empName;
    }
}

const employee = new Employee('Jane');

// Can access public method
console.log(employee.getPrivateName());

// Cannot access private variable
console.log(employee.#empName);
