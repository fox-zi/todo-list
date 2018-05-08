import React, { Component } from 'react';
import { View, NavigatorIOS } from 'react-native';
import ListTodo from './compoments/listtodo'
import { connect } from 'react-redux'
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

function mapStateToProps(state){
  return { myValue: state.value };
}

export default connect(mapStateToProps)(App);
