
function Animal(id, name, species, race, age) {
  this.id = id;
  this.name = name;
  this.race = race;
  this.age = age;
}

var inventory = function() {
  var animals = [];
  var counter = 0;
  function addAnimal(name, species, race, age) {
    animals.push(new Animal(counter, name, species, race, age));
    counter++;
  }
  function removeAnimal(id) {
    var i;
    for (i = 0; i < animals.length; i++) {
      if (animals[i] === id) {
        animals.splice(i, 1); // remove the element
      }
    }
  }
  function getAnimal(id) {
    var i;
    for (i = 0; i < animals.length; i++) {
      if (animals[i] === id) {
        return animals[id];
      }
    }
  }
  function findAnimalWithSpecies(species) {
    var result = [];
    var i;
    for (i = 0; i < animals.length; i++) {
      if (animals[i].species === species) {
        result.push(animals[i]);
      }
    }
    return result;
  }

  return {  addAnimal: addAnimal,
            removeAnimal: removeAnimal,
            getAnimal: getAnimal,
            findAnimalWithSpecies: findAnimalWithSpecies
          }
}();

module.exports = {Animal: Animal, inventory: inventory}
