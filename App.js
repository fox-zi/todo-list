import React, { Component } from 'react';
import { View, NavigatorIOS } from 'react-native';
import ListTodo from './compoments/listtodo'

class App extends Component {
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
export default App;
