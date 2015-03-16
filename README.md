# DrePong

DrePong is a classic pong game app built in AngularJS. The live app can be viewed here: (add heroku url).
A game against the computer AI starts as soon as the user accesses or refreshes the page. Once either the computer's or player's score reaches 21, a game is scored and is reflected on the scoreboard.

## Prerequisites
* Node.js - Download and install [Node.js](https://nodejs.org/download/)

### Required Tools
* NPM - Node.js package manager. This should auto-install with your install of Node.js
* Grunt - After NPM is installed, download and install Grunt:
```
$ npm install -g grunt-cli
```

## Running the App
* Clone this repository
```
$ git clone https://github.com/dreLT/drepong.git
```
* In the project's root directory, install all dependencies:
```
$ npm install
```
* Run `grunt` in the root directory to intiate the local server and Grunt's tasks. Then go to `http://localhost:3000` in your browser to see the app running.

## File System
### Development
```
app/
 |__pages/
 |   |__index.html
 |__sass/
 |   |__styles.scss
 |__scripts/
 |   |__app.js
 |__templates/
 |   |__home.html
```

`pages/__index.html` The HTML view
`sass/__styles.scss` SASS file for styling. Grunt will automatically detect saved changes to this file and auto-compile them to poduction css (located in `/dist/css`).
`scripts/__app.js` AngularJS file containing all game functionality
`templates/__home.html` For HTML partials or smaller sets of HTML (currently not being used)

### Production
Grunt builds and outputs all saved changes made in the development directory, `app/`, to production directory, `dist/`, like so:
```
dist/
 |__css/
 |   |__style.css
 |__js/
 |   |__app.js
 |__templates/
 |   |__home.html
 |__index.html
```

## Progress
* I am in the process adding an inventory system: the player earns $100 every time he/she scores a point and would have the option of buying items that would boost their ability to defeat the AI (for example, increase the speed of the ball once hit by the player, increase player's paddle speed, reverse the ball's direction, etc).
* The app could use more styling for a nicer look and better user experience

