/* eslint no-unused-vars: 0 */

import { doneFetching } from './module';

/**
 *
 * @param {Array} components
 * @param {Object} params
 * @param {Object} store
 * @returns {Promise[]}
 */
export function grabPromises(components, params, store) {
  return flattenComponents(components)
    .filter(component => component.fetchData instanceof Function)
    .map(component => component.fetchData(store, params));
}

/**
 *
 * @param {Array} components
 * @returns {Array}
 */
export function flattenComponents(components) {
  const flattened = [];
  for (let i = 0; i < components.length; i++) {
    // handle named components
    // https://github.com/reactjs/react-router/blob/latest/docs/API.md#named-components
    if (typeof components[i] === 'object') {
      for (let [key, value] of Object.entries(components[i])) {
        flattened.push(value);
      }
    } else {
      flattened.push(components[i]);
    }
  }
  return flattened;
}

/**
 *
 * @param {Array} components
 * @param {Object} params
 * @param {Object} store
 * @returns {Promise}
 */
export function fetchDataOnServer({ components, params }, store) {
  return Promise.all(grabPromises(components, params, store))
    .then(() => {
      store.dispatch(doneFetching());
    });
}
