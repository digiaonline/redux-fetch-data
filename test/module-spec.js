/* global describe, it */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import { handleDoneFetching } from '../src/module';

describe('Redux module', () => {

  it('sets fetched flag when done fetching', () => {
    const state = { fetched: false };
    const nextState = handleDoneFetching(state);
    expect(nextState).to.have.property('fetched').and.to.be.true;
  });
  
});
