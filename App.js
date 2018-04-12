import React, { Component } from 'react';
import { View, Navigator } from 'react-native';
import ListTodo from './compoments/listtodo'
export default class App extends Component {
  _renderScene(route, navigaror){
    var globalProps = {navigator}
    switch (route.ident) {
      case 'Todo List':
        return(
          <ListTodo
            {...globalProps}
          />
        )
      case 'Todo Detail':
        return(
          <TodoDetail
            {...globalProps}
            data={ route.dataRow }
          />
        )
    }
  }

  _configureScene(route, routeStack){
    switch (route.ident) {
      case 'Todo List':
        return Navigator.SceneConfigs.FloatFromBottom
      default:
        return Navigator.SceneConfigs.PushFromRight 
    }
  }

  render() {
    return (
      <Navigator
       initialRoute={{ ident: 'Todo List' }}
       renderScene={ this._renderScene }
       configureScene={this._configureScene }
       style={{flex: 1}}
     />
    );
  }
}
