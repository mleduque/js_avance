
function Animal(id, name, species, race, age) {
  this.id = id;
  this.name = name;
  this.race = race;
  this.age = age;
}

var inventory = function() {
  var animals = [];
  var counter = 0;
  var addAnimal = function(name, species, race, age) {
    animals.push(new Animal(counter, name, species, race, age));
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
      if (animals[i] === id) {
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

var inventory2 = function() {
  var counter = 1;
  var base_url = 'http://localhost:8080/services/';

  var addAnimal = function(name, species, race, age, callback) {
    var animal = new Animal(counter, name, species, race, age);
    counter++;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          callback.onSuccess(animal.id);
        } else {
          callback.onFailure(request.statusText);
        }
      }
    };
    request.open('PUT', base_url + 'animal/' + animal.id);
    request.setRequestHeader('Content-Type', 'application/json');
    console.log('create animal', animal);
    request.send(JSON.stringify(animal));
  }

  var getAnimal = function (id, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          if (request.responseType === 'json') {
            var animal = JSON.parse(request.responseText);
            callback.onSuccess(animal);
          } else {
            callback.onFailure('Unexpected response type:' + request.responseType);
          }
        } else {
          callback.onFailure(request.statusText);
        }
      }
    };
    request.open('GET', base_url + 'animal/' + id);
    request.send(null);
  }

  var removeAnimal = function (id, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          callback.onSuccess();
        } else {
          callback.onFailure(request.statusText);
        }
      }
    };
    request.open('DELETE', base_url + 'animal/' + animal.id);
    request.send(null);
  }

  var findAnimalWithSpecies = function (species, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(e) {
      if (request.readyState === 4) {
        if (request.status === 200) {
          if (request.responseType === 'json') {
            var animals = JSON.parse(request.responseText);
            callback.onSuccess(animals);
          } else {
            callback.onFailure('Unexpected response type:' + request.responseType);
          }
        } else {
          callback.onFailure(request.statusText);
        }
      };
      request.open('GET', base_url + 'byspecies/' + id);
      request.send(null);
    }
  }

  return {  addAnimal: addAnimal,
            removeAnimal: removeAnimal,
            getAnimal: getAnimal,
            findAnimalWithSpecies: findAnimalWithSpecies
          };
}();

function addAnimal() {
  var name = document.querySelector('#name').value;
  var species = document.querySelector('#species').value;
  var race = document.querySelector('#race').value;
  var age = document.querySelector('#age').value;
  inventory.addAnimal(name, species, race, age);
}

function addAnimal2() {
  var name = document.querySelector('#name').value;
  var species = document.querySelector('#species').value;
  var race = document.querySelector('#race').value;
  var age = document.querySelector('#age').value;
  inventory2.addAnimal(name, species, race, age, {
    onSuccess: function() { window.alert('success') },
    onFailure: function() { window.alert('On no!') },
  });
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
  button.addEventListener('click', addAnimal2);
  return element;
}();

module.exports = { Animal: Animal, inventory: inventory, input: input }
