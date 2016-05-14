# redux-fetch-data

[![Build Status](https://travis-ci.org/nordsoftware/redux-fetch-data.svg?branch=develop)](https://travis-ci.org/nordsoftware/redux-fetch-data)
[![Test Coverage](https://codeclimate.com/github/nordsoftware/redux-fetch-data/badges/coverage.svg)](https://codeclimate.com/github/nordsoftware/redux-fetch-data/coverage)
[![Code Climate](https://codeclimate.com/github/nordsoftware/redux-fetch-data/badges/gpa.svg)](https://codeclimate.com/github/nordsoftware/redux-fetch-data)
[![npm version](https://img.shields.io/npm/v/redux-fetch-data.svg)](https://www.npmjs.com/package/redux-fetch-data)
[![npm downloads](https://img.shields.io/npm/dt/redux-fetch-data.svg)](https://www.npmjs.com/package/redux-fetch-data)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/nordsoftware/redux-fetch-data/master/LICENSE)
[![Gitter](https://img.shields.io/gitter/room/norsoftware/open-source.svg?maxAge=2592000)](https://gitter.im/nordsoftware/open-source)

Redux utility library for fetching data using promises on both server and client.

## Install

```bash
npm install redux-fetch-data --save
```

## Usage

### Initial setup

#### On the server

Here is an example setup of a simple server. In this example we used Express, but any server framework will do.

```js
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { fetchDataOnServer, reducer as fetching } from 'redux-fetch-data';
import createHistory from 'react-router/lib/createMemoryHistory';

import routes from '../../routes';

const app = Express();

// Renders the actual HTML page
function renderHtml(html, state) {
  return `
    <!doctype html>
    <html>
      <body>
        <div id="root">${html}</div>
        <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${JSON.stringify(state)};`}}
                charSet="UTF-8"/>
      </body>
    </html>
  `;
}

// Register the rendering middleware
app.use((req, res) => {
  const history = createHistory(req.originalUrl);
  const store = createStore(combineReducers({ fetching }));

  match({ routes, location: req.url }, (err, redirect, renderProps) => {
    // Fetch data
    fetchDataOnServer(renderProps, store).then(() => {
      // Data has been fetched, resolve request
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search);
      } else if (renderProps) {
        // Render the root component
        const html = renderToString((
          <Provider store={store} key="provider">
            <RouterContext {...renderProps}/>
          </Provider>
        ));

        // Send the rendered page back to the client
        res.status(200).send(renderHtml(html, store.getState()));
      } else {
        res.status(404).send('Not found.');
      }
    });
  });
});

app.listen(3000);
```

#### On the client

Here is an example of a client-side entry script.

```js
import React from 'react';
import { createStore, combineReducers } from 'redux';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { FetchData, reducer as fetching } from 'redux-fetch-data';

import routes from './routes';

// Hydrate the initial state from the server state
const initialState = window.__INITIAL_STATE__;
const store = createStore(combineReducers({ fetching }), initialState);

render(
  <Provider store={store} key="provider">
    <Router render={props => <FetchData {...props}/>}
            history={browserHistory}
            routes={routes}/>
  </Provider>,
  document.getElementById('root')
);
```

### Fetching data

Instead of loading data in `componentWillMount`, move that logic to a static `fetchData` method.
This method should return a promise. Also, make sure you only fetch data from your containers
(top-level components), and pass down the data as props to sub-components.

```js
export class Foo extends Component {
  static fetchData() {
    // this method should return a promise
  }
  .....
}
```

**Protip!** You can use `Promise.all` to combine multiple promises into one.

## Tests

Run the test suite:

```bash
npm test
```

Run the test suite in watch mode:

```bash
npm run test:watch <path>
```

Generate the code coverage report:

```bash
npm run test:cover
```

## License

See [LICENSE](LICENSE).
