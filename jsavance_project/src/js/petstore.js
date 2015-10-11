
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

function addAnimal() {
  var name = document.querySelector('#name');
  var species = document.querySelector('#species');
  var race = document.querySelector('#race');
  var age = document.querySelector('#age');
  inventory.addAnimal(name, species, race, age);
}

var input = function() {
  // alternative : import JQuery ! Or better, a template system
  var markup =`
  <div>
    <label for="name">Nom</label>
    <input id="name"></input>
    <label for="species">Espèce</label>
    <input id="species"></input>
    <label for="race">Race</label>
    <input id="race"></input>
    <label for="age">Âge</label>
    <input id="age"></input>
    <button id="add-button">Ajouter</button>
  </div>`;
  var element = document.createElement('section');
  element.innerHTML = markup;
  var button = element.querySelector('#add-button');
  button.addEventListener('click', addAnimal);
  return element;
}();

module.exports = { Animal: Animal, inventory: inventory, input: input }
