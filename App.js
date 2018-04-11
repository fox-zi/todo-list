import React, { Component } from 'react';
import { View, NavigatorIOS } from 'react-native';
import ListTodo from './compoments/listtodo'
export default class App extends Component {
  render() {
    return (
      <NavigatorIOS
       initialRoute={{
         component: ListTodo,
         title: 'My todo',
       }}
       style={{flex: 1}}
     />
    );
  }
}
