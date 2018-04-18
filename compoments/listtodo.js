import React, { Component } from 'react'
import {ListView, Text, StyleSheet,TouchableOpacity, AlertIOS,View, TextInput } from 'react-native'
import TodoDetail from './todoDetail'
export default class ListTodo extends Component {
  constructor(props){
    super(props);
    var mang = ['Dummy Item 1','Dummy Item 2','Dummy Item 3','Dummy Item 4',
                'Dummy Item 5','Dummy Item 6'];
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.state = {
      text: '',
      mang: mang,
      dataSource: ds.cloneWithRows(mang)
    };
  }

  componentDidMount(){
    _this = this;
    this.state = {
      text: '',
      dataSource: this.state.mang
    };
  }

  render() {
    return(
        <ListView
          enableEmptySections = { true }
          style = { styles.container }
          dataSource = { this.state.dataSource }
          renderRow= { this.renderRow }
          renderHeader = { this.renderAdd }
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

  renderAdd(){
    return (
      <View style={styles1.container}>
        <TextInput
          style={styles1.input}
          placeholder="Search..."
          onChangeText={ (text) => _this.setState({ text: text }) }
        />
        <TouchableOpacity onPress={ () => { _this.addCell()}}>
          <Text> ADD </Text>
        </TouchableOpacity>
      </View>
    )
  }

  addCell() {
    // if (this.state.text) {
      this.setState({
        mang: this.state.mang.push(this.state.text),
        text: '',
        dataSource: this.state.dataSource.cloneWithRows(this.state.mang)
      });
    // }
    // else {
    //   alert('Nhập nội dung')
    // }
  }

  deleteCell(dataRow){
      array = this.state.mang;
      index = array.indexOf(dataRow);
      array.splice(index, 1);
      this.setState({
        mang: array,
        dataSource: this.state.dataSource.cloneWithRows(this.state.mang)
      })
  }

  renderRow(dataRow){
    return (
      <View style={ styles.dataRow }>
        <TouchableOpacity onPress={ () => {_this.pressCell(dataRow)} }>
          <Text>{ dataRow }</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => {_this.deleteCell(dataRow)} } style = { styles.close }>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dataRow: {
    flex: 1/2,
    flexDirection: 'row',
  },
  close: {
    flex: 1/2,
    alignItems: 'center',
  }
});

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C1C1C1',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});
