import { AppRegistry, AppState, AsyncStorage, Text, ListView } from 'react-native';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 === r2 });
var mang = [['acb','true']
]
const defaultState = {
  name: 'fox zi',
  value: 0,
  mang: mang,
  dataSource: ds.cloneWithRows(mang)
}

const reducer = (state = defaultState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case 'ADD_DATA':
      return {
        mang: [
          ...state.mang,
          [action.text, 'false']
        ],
        dataSource: state.dataSource.cloneWithRows(state.mang)
      }
    case 'DELETE_DATA':
      newState.mang.splice(action.index, 1);
      return {
        mang: newState.mang,
        dataSource: newState.dataSource.cloneWithRows(newState.mang)
      }

    case 'EDIT_DATA':
      newState.mang[action.index] = [action.value, action.status];
      return {
        mang: newState.mang,
        dataSource: newState.dataSource.cloneWithRows(newState.mang)
      };

    case 'CHECKED':
      console.log(state.dataSource);
      newState.mang[action.index] = [action.value, action.status];
      return {
        mang: newState.mang,
        dataSource: newState.dataSource.cloneWithRows(newState.mang)
      };

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
