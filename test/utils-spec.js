/* global describe, it */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import { grabPromises, flattenComponents, fetchDataOnServer } from '../src/utils';
import { Container, Dummy, makeStore } from './support';

describe('Utility functions', () => {

  describe('grabPromises', () => {
    it('returns an array of promises', () => {
      const promises = grabPromises([Container, Dummy]);
      expect(promises).to.be.instanceOf(Array);
      expect(promises).to.have.lengthOf(1);
      expect(promises[0]).to.be.instanceOf(Promise);
    });
    it('works with named components', () => {
      const promises = grabPromises([{ main: Container, sidebar: Dummy }]);
      expect(promises).to.have.lengthOf(1);
    });
  });

  describe('flattenComponents', () => {
    it('returns an array of components', () => {
      const flattened = flattenComponents([Container]);
      expect(flattened).to.be.instanceOf(Array);
      expect(flattened).to.have.lengthOf(1);
      expect(flattened[0]).to.be.instanceOf(Function);
    });
    it('works with named components', () => {
      const flattened = flattenComponents([{ main: Container, sidebar: Dummy }]);
      expect(flattened).to.have.lengthOf(2);
    });
  });

  describe('fetchDataOnServer', () => {
    it('sets the fetched flag when promises are resolved', done => {
      const store = makeStore();
      fetchDataOnServer({ components: [Container] }, store).then(() => {
        expect(store.getState().fetched).to.be.true;
        done();
      });
    });
  });

});
