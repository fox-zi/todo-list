import { AppRegistry, AppState, AsyncStorage, Text } from 'react-native';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

const defaultState = {
  name: 'fox zi',
  value: 0,
  mang: [],
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_DATA':
      return {
        mang: [
          ...state.mang,
          [action.text, 'false']
        ]
      }
    case 'DELETE_DATA':
      state.mang.splice(action.index, 1)
      return { ...state }

    case 'EDIT_DATA':
      state.mang[action.index] = [action.value, action.status];
      return state

    case 'CHECKED':
      state.mang[action.index] = [action.value, action.status];
      return state

    case 'GET_DATA':
      state.mang = action.data
      return state
    default:
      return state
  }

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
