import { AppRegistry } from 'react-native';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

const defaultState = {
  name: 'fox zi',
  value: 0,
  mang: []
}

const reducer = (state = defaultState, action) => {
  if (action.type === 'GET_DATA')
    return { mang: state.mang }
  if (action.type === 'SAVE_DATA')
    return { mang: state.mang }
  return state;
}

const store = createStore(reducer);

export default class DemoRedux extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('todo', () => DemoRedux);
