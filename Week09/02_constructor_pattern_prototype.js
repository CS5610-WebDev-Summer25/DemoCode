function Car( model, year, miles ) {

  this.model = model;
  this.year = year;
  this.miles = miles;
}

Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );

console.log( "Info about car: " + civic );
console.log( "Info about car: " + mondeo );

console.log( civic );
console.log( mondeo );
