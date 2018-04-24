import React, { Component } from 'react'
import {ListView, Text, StyleSheet,
  TouchableOpacity, AlertIOS,View,
  AsyncStorage, TextInput } from 'react-native'
import TodoDetail from './todoDetail'
import TodoEdit from './todoedit'
export default class ListTodo extends Component {
  constructor(props){
    super(props);
    var mang = []
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.state = {
      text: 'Foxzi',
      mang: mang,
      dataSource: ds.cloneWithRows(mang)
    };
  }
  componentDidMount(){
    _this = this;
    this.get()
  }

  save = async()=>{
    try {
      await AsyncStorage.setItem('@Array:key', JSON.stringify(this.state.mang));

    } catch (e) {
      console.log(e);
    }
  }

  get = async()=>{
    try {
      var mang = await AsyncStorage.getItem('@Array:key');
      mang = JSON.parse(mang);
      this.setState({
        mang: mang,
        dataSource: this.state.dataSource.cloneWithRows(mang)
      })
    } catch (e) {
      console.log('==============Lôi');
    }
  }
  render() {
    return(
        <ListView
          enableEmptySections = { true }
          style = { styles.container }
          dataSource = { this.state.dataSource }
          renderRow= { this.renderRow.bind(this) }
          renderHeader = { this.renderAdd.bind(this) }
        />
    )
  }

  renderAdd() {
    return (
      <View style={ styles1.container }>
        <TextInput
          value = { this.state.text }
          style={ styles1.input }
          placeholder="Search..."
          onChangeText={ (text) => this.setState({ text: text }) }
        />
        <TouchableOpacity onPress={ () => { this.addCell() }}>
          <Text> ADD </Text>
        </TouchableOpacity>
      </View>
    )
  }

  addCell() {
    if (this.state.text) {
      array = this.state.mang;
      arr = [];
      arr.push(this.state.text);
      arr.push('false')
      array.push(arr)
      this.setState({
        mang: array,
        text: '',
        dataSource: this.state.dataSource.cloneWithRows(array)
      });
    this.save()
  }
}

  pressCell(dataRow, index){
    this.props.navigator.push({
      component: TodoDetail,
      passProps: { dataRow, index },
      title: 'Todo Detail',
    })
  }

  todoEdit(dataRow,index){
    this.props.navigator.push({
      component: TodoEdit,
      passProps: { dataRow,index },
      title: 'Todo Edit',
    })
  }

  deleteCell(index){
      array = this.state.mang;
      array.splice(index,1)
      this.setState({
        mang: array,
        dataSource: this.state.dataSource.cloneWithRows(this.state.mang)
      })
      this.save()
      this.get()
  }

  renderRow = (dataRow, sectionID, rowID) => {
    return (
      <View style={ styles.dataRow } >
        <TouchableOpacity onPress={ () => {_this.pressCell(dataRow, rowID)} }>
          <Text>{ dataRow[0] }</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => {_this.todoEdit(dataRow, rowID)} }>
          <Text>->Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => {_this.deleteCell(rowID)} } style = { styles.close }>
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
