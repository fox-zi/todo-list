import React, { Component } from 'react'
import {ListView, Text, StyleSheet,TouchableOpacity, AlertIOS } from 'react-native'
import TodoDetail from './todoDetail'
export default class ListTodo extends Component {
  constructor(props){
    super(props);
    var mang = ['1111','22222','33333','1111','22222','33333'];
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.state = {
      dataSource: ds.cloneWithRows(mang)
    };
    _this = this;
  }

  componentDidMount(){
    this.state = {
      dataSource: this.state.dataSource
    };
  }

  render() {

      return(
        <ListView
          enableEmptySections = { true }
          style = { styles.container }
          dataSource = { this.state.dataSource }
          renderRow= { this.renderRow }
        />
      )
  }

  pressCell(dataRow){
    this.props.navigator.push({
      component: TodoDetail,
      passProps: { dataRow },
      title: 'Todo Detail',
    })
  }

  renderRow(dataRow){
    return (
      <TouchableOpacity onPress={ () => {_this.pressCell(dataRow)} }>
        <Text>{ dataRow }</Text>
      </TouchableOpacity>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});
