import { AppRegistry, AppState, AsyncStorage, Text, ListView } from 'react-native';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1[0] == r2[0]) });
var mang = [[]]
var defaultState = {
  name: '',
  mang: mang,
  dataSource: ds.cloneWithRows(mang)
}

var reducer = (state = defaultState, action) => {
  let newState = Object.assign({}, state);
  newState.name = ''
  switch (action.type) {
    case 'ADD_DATA':
      newState.mang.push([action.text, 'false'])
      Save(newState.mang)
      return {
        mang: newState.mang,
        dataSource: state.dataSource.cloneWithRows(newState.mang)
      }
    case 'DELETE_DATA':
      newState.mang.splice(action.index, 1);
      Save(newState.mang)
      return {
        mang: newState.mang,
        dataSource: newState.dataSource.cloneWithRows(newState.mang)
      }

    case 'EDIT_DATA':
      newState.mang[action.index] = [action.value, action.status];
      Save(newState.mang)
      return {
        mang: newState.mang,
        dataSource: newState.dataSource.cloneWithRows(newState.mang)
      };

    case 'CHECKED':
      newState.mang[action.index] = [action.value, action.status];
      Save(newState.mang)
      return {
        mang: newState.mang,
        dataSource: newState.dataSource.cloneWithRows(newState.mang)
      };
    default:
      return state
  }
}

function Save(array){
  AsyncStorage.setItem('@Array:key', JSON.stringify(array));
}

var store = createStore(reducer)
export default class DemoRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: false,
    }
  }

  componentDidMount() {
    var self = this;
    this.setState({ isStoreLoading: true });
    AsyncStorage.getItem('@Array:key').then((value) => {
      if (value && value.length) {
        let array = JSON.parse(value);
        defaultState = {
          name: 'fox zi',
          mang: array,
          dataSource: ds.cloneWithRows(array)
        }
        store = createStore(reducer);
      }
      self.setState({ isStoreLoading: false });
    }).catch((error) => {
      self.setState({ isStoreLoading: false });
    })
  }

  render() {
    if (this.state.isStoreLoading) return <Text>Loading notes ...</Text>
    return (
      <Provider store={ store }>
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('todo', () => DemoRedux);
