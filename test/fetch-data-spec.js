/* global describe, it */
/* eslint no-unused-expressions: 0 */

import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import React from 'react';
import { FetchData } from '../src/fetch-data';
import { Container, Dummy, makeStore } from './support';

describe('FetchData component', () => {

  it('fetches data if it has not been fetched', () => {
    const store = makeStore();
    const context = { store };
    const fetchData = spy(FetchData.prototype, 'fetchData');
    FetchData.prototype.render = () => <Dummy/>;
    mount(<FetchData components={[Container]}/>, { context });
    expect(fetchData).to.have.been.calledOnce;
    FetchData.prototype.fetchData.restore();
  });

  it('does not fetch data if it has already been fetched', () => {
    const store = makeStore();
    const context = { store };
    const fetchData = spy(FetchData.prototype, 'fetchData');
    FetchData.prototype.render = () => <Dummy/>;
    mount(<FetchData components={[Container]} isFetched={true}/>, { context });
    expect(fetchData).to.not.have.been.called;
    FetchData.prototype.fetchData.restore();
  });

  it('fetches data on receiving new props', () => {
    const store = makeStore();
    const context = { store };
    const fetchData = spy(FetchData.prototype, 'fetchData');
    FetchData.prototype.render = () => <Dummy/>;
    const wrapper = mount(<FetchData components={[Container]}/>, { context });
    wrapper.setProps({ foo: 'bar' });
    expect(fetchData).to.have.been.calledTwice;
    FetchData.prototype.fetchData.restore();
  });
  
});
