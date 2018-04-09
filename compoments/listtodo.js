import React, { Component } from 'react'
import {ListView, Text, StyleSheet,TouchableOpacity } from 'react-native'

export default class ListTodo extends Component {
  constructor(props){
    super(props);
    var mang = ['1111','22222','33333','1111','22222','33333']
    dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.state = {
      dataSource: dataSource.cloneWithRows(mang),
    };
  }
  render() {
      return(
        <ListView
          style = { styles.container }
          dataSource = { this.state.dataSource }
          renderRow= { (data) => <TouchableOpacity><Text>{ data }</Text></TouchableOpacity> }
        />
      )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
