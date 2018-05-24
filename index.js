import { AppRegistry, AppState, AsyncStorage, Text, ListView } from 'react-native';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React, { Component } from 'react';

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1[0] == r2[0]) });
var mang = [['acb','true']
]
var defaultState = {
  name: 'fox zi',
  mang: mang,
  dataSource: ds.cloneWithRows(mang)
}

var reducer = (state = defaultState, action) => {
  let newState = Object.assign({}, state);
  let array = newState.mang
  switch (action.type) {
    case 'ADD_DATA':
      array.push([action.text, 'false'])
      AsyncStorage.setItem('@Array:key', JSON.stringify(array));
      return {
        mang: array,
        dataSource: state.dataSource.cloneWithRows(array)
      }
    case 'DELETE_DATA':
      newState.mang.splice(action.index, 1);
      AsyncStorage.setItem('@Array:key', JSON.stringify(newState.mang));
      return {
        mang: newState.mang,
        dataSource: newState.dataSource.cloneWithRows(newState.mang)
      }

    case 'EDIT_DATA':
      array[action.index] = [action.value, action.status];
      AsyncStorage.setItem('@Array:key', JSON.stringify(array));
      return {
        mang: array,
        dataSource: newState.dataSource.cloneWithRows(array)
      };

    case 'CHECKED':
      console.log(action);
      array[action.index] = [action.value, action.status];
      AsyncStorage.setItem('@Array:key', JSON.stringify(array));
      return {
        mang: array,
        dataSource: newState.dataSource.cloneWithRows(array)
      };
    default:
      return state
  }
}

export default class DemoRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isStoreLoading: false,
      store: createStore(reducer)
    }
  }

  componentDidMount() {
    var self = this;
    this.setState({ isStoreLoading: true });
    AsyncStorage.getItem('@Array:key').then((value) => {
      console.log(value);
      if (value && value.length) {
        let array = JSON.parse(value);
        defaultState = {
          name: 'fox zi 2',
          mang: array,
          dataSource: ds.cloneWithRows(array)
        }
        self.setState({ store: createStore(reducer) });
      }
      self.setState({ isStoreLoading: false });
    }).catch((error) => {
      self.setState({ isStoreLoading: false });
    })
  }

  render() {
    if (this.state.isStoreLoading) return <Text>Loading notes ...</Text>
    return (
      <Provider store={createStore(reducer)}>
        <App/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('todo', () => DemoRedux);
