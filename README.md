<p align="center"><img alt="A doxen dog with the Vue logo on it's chest" src="public/meta/mstile04lg.png"></p>


# vue-doxen

The world's best Vue.js component documentation tool!


## Installation, Usage, Documentation

* https://TheJaredWilcurt.com/vue-doxen ⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️⬅️


## Running this repo locally

1. Uninstall Node/npm/nvm/nvm-windows/n/nodist
1. Install [Volta](https://volta.sh) (replaces all of the above and is much better)
1. Clone the repo
1. `npm install`
1. `npm run build` builds both the docs site and library
1. `npm run lint` checks for linting errors


### Project Structure

* **Documentation site**
  * `npm start` will launch the app for local development
  * Code lives in `app` folder
  * Uses `vite.config.doc.js`
  * `npm run build` will produce `docs` folder
* **Library**
  * To manually test/develop the library use the docs site via `npm start`
  * Code lives in the `lib` folder
  * Uses `vite.config.lib.js`
  * `npm run build` will produce `dist` folder
  * `npm t` runs unit tests for the library
