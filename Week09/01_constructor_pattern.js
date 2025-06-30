function Car( model, year, miles ) {

  this.model = model;
  this.year = year;
  this.miles = miles;

  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}

var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( "Info about car: ");
console.log(civic);

console.log( "Info about car: " + civic );
console.log( "Info about cars: " , mondeo, civic, "hello!" );

console.log("With backticks:")
console.log( `Info about car: ${civic}` );

// console.log("Info about car:")
// console.log( civic );

// console.log("Info about second car:")
// console.log( mondeo );
