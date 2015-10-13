# Javascript avancé

## Préparation d'un projet basique (sur webpack)

Avec nodejs et npm installés.

### Première phase: initialisation du projet
* Installer webpack globalement
  npm install webpack -g
* Créer un projet
  ```
  > npm init
  ```
  _répondre aux questions par défaut_ sauf : version ```1.0.0``` + point d'entrée= ```src/js/entry.js```
* créer le fichier ```src/js/entry.js```
  ```javascript
  document.write('It works');
  ```
* Créer le fichier ```index.html```
  ```html
  <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
    </body>
  </html>
  ```
* Prendre en compte entry.js dans le résultat de webpack
  ```
  > webpack src/js/entry.js bundle.js
  ```
  _On peut examiner ```bundle.js```._

* Installer webpack-dev-server _globalement_
  ```
  > npm install webpack-dev-server -g
  ```
* On peut démarrer le serveur de dev :
  ```
  > webpack-dev-server
  ```
  _Ouvrir le navigateur http://localhost:8080 ou http://localhost:8080/webpack-dev-server/_

### Deuxième phase, ajout d'un fichier

* Créer un fichier ```src/js/content.js```
  ```javascript
  module.exports = "Content included from content.js.";
  ```
* Remplacer la ligne document.write dans entry.js
  ```javascript
  var content = require('./content.js');
  document.write(content);
  ```

### Troisième phase : CSS

* Installer le loader CSS
  ```
  > npm install css-loader style-loader
  ```
* Créer le fichier ```src/css/style.css```
  ```css
  body {
    background: yellow;
  }
  ```
* Intégrer la feuille de style : ajouter en hat de entry.js :
  ```javascript
  require("../css/style.css");
  ```
* Ajouter un fichier de configuration ```webpack.config.js``` :
  ```javascript
  module.exports = {
    entry: "./src/js/entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
  };
  ```
* Constater la prise en compte de la feuille de style dans la page web.

## Intégration de babel (quand on est prêt à parler ES6)

* Ajouter une dépendance sur babel-loader
    ```
    > npm install --save-dev babel-loader
    ```
    _On peut examiner le package.json._
* modifier le ```webpack.config.js```, ajouter un élément ```loader```
  ```javascript
  + var path = require('path');
    module.exports = {

      loaders: [
  +    {
  +      // load es6 files using babel-loader
  +      test: path.join(__dirname, 'src/es6'),
  +      loader: 'babel-loader'
  +    },
       { test: /\.css$/, loader: "style!css" }
  ```
* Créer un fichier ```src/es6/greeting.es6```
  ```javascript
  export default function() {
    let greeting = document.createElement('div');
    greeting.textContent = 'Hello World';
    return greeting;
  }
  ```
* Modifier ```entry.js``` :
  ```javascript
  var greetingGenerator = require('../es6/greeting.es6');
  var content = greetingGenerator();
  var body = document.querySelector('body');
  body.appendChild(content);
  ```
* On peut déplacer ```entry.js``` dans ```src/es6``` et utiliser ```import``` au lieu de ```require``` (selon préférence).

## IIFE

_À partir du projet avant ES6-ation._

* Créer un fichier ```petstore.js```. Les 'modules' suivants seront créés dans ce fichier.

* Créer un module (IIFE) qui expose un constructeur ```Animal``` :
  - ```new Animal(id, name, species, race, age)``` retourne un objet avec chacune des propriétés fournies

* Créer un module (IIFE) ```inventory``` qui expose l'API suivante :
  
  - ajouter un animal : ```addAnimal(name, species, race, age)```
  - (optionnel) retirer un animal : ```removeAnimal(id)``` [facultatif]
  - (optionnel) obtenir les infos d'un animal à partir de son id : ```getAnimal(id)``` (retourne un objet de type ```Animal```)
  - chercher des animaux par espèce: ```findAnimalWithSpecies(species)``` (retourne un ```Animal```)
  
  Bien sûr, l'encapsulation est complète. L'id est automatiquement généré à l'addition.
  Confirmer le résultat en utilisant ```console.log```

* Créer un module (input) qui d'affichage pour la saisie d'un animal ; il expose l'API suivante :
  
  - ```getAnimalInput()``` (retourne un élément HTML)
  
  Côté implémentation, il s'agit de champs pour chaque information (sauf l'id bien sûr).

* Sur la page HTML, insérer les champs de saisie d'un animal.

* Remplacer l'implémentation de l'inventaire par une implémentation serveur en utilisant un service REST
  - fournir le service (qui se lance avec ```nodejs main.js```)
  - utiliser des XmlHttpRequest (coup de pouce: ```JSON.stringify```) .
  - L'API doit être modifiée ? Callbacks partout...

* (Facultatif, pour les plus rapides) Créer un module qui permet d'afficher une liste d'animaux (niveau de détail au choix, le plus, le mieux) ; API :
  - ```showAnimals(animalsArray)``` (retourne un élément HTML, animalsArray est un tableau d'```Animal```)

* (Facultatif, pour les plus rapides) Modifier la page HTML ainsi :
  - En dessous, une section avec un champ pour la recherche dans la base d'animaux par espèce
  - Ensuite, l'affichage des résultats de la dernière recherche (rien si pas de recherche)

* (Facultatif, pour les plus rapides) Séparer les modules, un par fichier.

* (Science Fiction) _Single-Page Application_ : Sur une seule page html
  - départager l'URL sur le caractère ```#``` (```window.location.hash```)
  - s'il n'y en a pas, créer deux liens (ajouter, chercher par espèce)
  - si le fragment après # est ```create```, afficher les champs de saisie
  - si le fragment après # est ```search```, afficher le chap de recherche

## ES6

* Convertir les modules en modules ES6

* Réimplémenter le module ```inventory``` comme une ```class``` javascript

* Modifier la partie XmlHttpRequest en utilisant des promises
  - encore une fois, impact sur l'API : API synchrone avec valeur de retour promesse possible
