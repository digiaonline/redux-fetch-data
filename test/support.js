import React, { Component } from 'react';
import { createStore } from 'redux';
import reducer from '../src/module';

export class Container extends Component {
  static fetchData() {
    return Promise.resolve('done');
  }
  render() {
    return <div/>;
  }
}

export class Dummy extends Component {
  render() {
    return <div/>;
  }
}

export function makeStore(initialState) {
  return createStore(reducer, initialState);
}
