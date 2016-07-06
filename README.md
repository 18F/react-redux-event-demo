React-Redux-Event Demo
=====

A basic technology demo of some javascript frameworks in a purely client application. Written in ES6/ES2015, built with npm/browserify, transpiled to general 2016 browser support with babel, tested with mocha/proxyquire/chai/sinon, code coverage with istanbul.

## Philosophy

The goals include keeping reponsibilities clear, reducing coupling, and making components small, tight, and testable.

## Design

Use React for the views. Use Redux for *all* of the state.

Use react-redux to make changes in the Redux state update the properties sent to the React views.

Keep views simple by never putting state in the views. We don't need stateful views; our life is better when the rendering of a view is dependent entirely upon the immutable properties given to render. Yes, we need full React components to wire the react-redux plumbing. Everywhere else, favor stateless functional components. Extract subviews where it makes sense.

Use a single bus for all events. Use event dispatchers to map events placed on the bus to the proper event handlers; each dispatcher may elect to react to any event much as a Redux reducer may elect to change the state based on any action. Avoid large handlers with too many responsibilities as multiple handlers can respond to an event. Handlers may dispatch actions to the Redux store or fetch data from an API. 

Hide the particular event library implementation behind a small eventBus interface.

Promises are our friend. Fetch improves upon the long-used ajax request mechanisms. For now, we must polyfill.

## What does it do?

It can count.

## How to build and use

Clone the repo. Once you have it...

`npm run build-dev` creates the unminified javascript bundle with sourcemaps. Point your browser at [index.html](index.html) and go.

`npm run build` creates the javascript bundle, this time minified and without sourcemaps.

`npm test` runs all of the mocha tests. Most of these should be unit tests with some integration tests when necessary. We're not shooting for 100% code coverage (_congratulations! you've copied your configuration!_ or _you've copied the DOM structure again, yeah!_), but we should have very good reasons when we have uncovered code. Since we're transpiling our imports to CommonJS requires with babel, we can use proxyquire to specify the exact behavior of our dependencies when writing tests.

`npm run coverage` runs the tests and creates the code coverage report to be found at `coverage/index.html`

`npm run source-map-explorer` builds the minified bundle and shows the size of the different files included in the bundle using [source-map-explorer](https://github.com/danvk/source-map-explorer)

## Public domain

This project is in the worldwide [public domain](LICENSE.md). As stated in [CONTRIBUTING](CONTRIBUTING.md):

> This project is in the public domain within the United States, and copyright and related rights in the work worldwide are waived through the [CC0 1.0 Universal public domain dedication](https://creativecommons.org/publicdomain/zero/1.0/).
>
> All contributions to this project will be released under the CC0 dedication. By submitting a pull request, you are agreeing to comply with this waiver of copyright interest.