describe('Inventory', function() {
  var inventory = require('../src/js/inventory');

  it('is empty at beginning', function() {
    var first = inventory.getAnimal(0);
    expect(first).toBeUndefined();
  });

  it('contains an animal after adding it', function() {
    inventory.addAnimal('choupette', 'chien', 'labrador', 2);
    var first = inventory.getAnimal(0);
    expect(first.name).toBe('choupette');
  });
});
