var Animal = require('./Animal');

var inventory = function() {
  var animals = [];
  var counter = 0;
  var addAnimal = function(name, species, race, age) {
    var animal = new Animal(counter, name, species, race, age);
    animals.push(animal);
    //console.log('added animal ', animal);
    counter++;
  };
  var removeAnimal = function(id) {
    var i;
    for (i = 0; i < animals.length; i++) {
      if (animals[i] === id) {
        animals.splice(i, 1); // remove the element
      }
    }
  };
  var getAnimal = function(id) {
    var i;
    for (i = 0; i < animals.length; i++) {
      if (animals[i].id === id) {
        return animals[id];
      }
    }
  };
  var findAnimalWithSpecies = function(species) {
    var result = [];
    var i;
    for (i = 0; i < animals.length; i++) {
      if (animals[i].species === species) {
        result.push(animals[i]);
      }
    }
    return result;
  };

  return {  addAnimal: addAnimal,
            removeAnimal: removeAnimal,
            getAnimal: getAnimal,
            findAnimalWithSpecies: findAnimalWithSpecies
          }
}();

module.exports = inventory;
