import { AppRegistry } from 'react-native';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

const defaultState = {
  name: 'fox zi',
  value: 0,
  mang: [['qui lam','true']]
}

const reducer = (state = defaultState, action) => {
  if (action.type === 'ADD_DATA')
    return {
      mang: [
        ...state.mang,
        [action.text,'false']
      ]
    }

  if (action.type === 'DELETE_DATA'){
    state.mang.splice(action.index, 1)
    return { ...state }
  }

  if (action.type === 'EDIT_DATA'){
    state.mang[action.index] = [action.value, action.status];
    return { ...state }
  }

  if (action.type === 'CHECKED'){
    state.mang[action.index] = [action.value, action.status];
    return { ...state }
  }
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
