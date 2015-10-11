require('../css/style.css');

var greetingGenerator = require('../es6/greeting.es6');
var content = greetingGenerator();
var body = document.querySelector('body');
body.appendChild(content);
