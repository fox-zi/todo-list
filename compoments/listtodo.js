import React, { Component } from 'react'
import {ListView, Text, StyleSheet,
  TouchableOpacity, AlertIOS,View,
  AsyncStorage, TextInput } from 'react-native'
import TodoEdit from './todoedit'
import CheckBox from 'react-native-checkbox';
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
      console.log('SAVE!');
    } catch (e) {
      console.log(e);
    }
  }

  get = async()=>{
    try {
      var mang = await AsyncStorage.getItem('@Array:key');
      mang = JSON.parse(mang);
      console.log(mang);
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
          dataSource = { this.state.dataSource }
          renderRow= { this.renderRow.bind(this) }
          renderHeader = { this.renderAdd.bind(this) }
        />
    )
  }

  renderAdd() {
    return (
      <View style={ styles.container }>
        <TextInput
          value = { this.state.text }
          style={ styles.input }
          placeholder="Search..."
          onChangeText={ (text) => this.setState({ text: text }) }
        />
        <TouchableOpacity onPress={ () => { this.addCell() }}>
          <Text style={{ marginTop: 5 }}> ADD </Text>
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

  changeChecked(dataRow, rowID, checked){
    console.log(this.state.mang);
    console.log(checked);
    console.log(dataRow[1]);
    if (checked!=dataRow[1]) {
      var current = ''
      if (dataRow[1]=='true'){
        current = 'false'
      }
      else {
          current = 'true'
      }
      console.log(dataRow[0]+ '=='+ current);
      array = this.state.mang
      array[rowID] = [dataRow[0], current];
      this.setState({ mang: array });
      console.log(this.state.mang);
      this.save()
    }
  }

  renderRow = (dataRow, sectionID, rowID) => {
    return (
      <View style={ styles.dataRow } >
        <CheckBox
          label={ dataRow[0] }
          checked={ dataRow[1]=='true' }
          onChange={ (checked) => { _this.changeChecked(dataRow, rowID, checked) } }
        />
        <TouchableOpacity onPress={ () => {_this.todoEdit(dataRow, rowID)} }>
          <Text style={ styles.rowEdit } >Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => {_this.deleteCell(rowID)} } style = { styles.close }>
          <Text style={ styles.rowIndex } >X</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: '#C1C1C1',
  },
  dataRow: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowTitle: {
    fontSize: 18,
  },
  rowEdit: {
  },
  rowIndex: {
    color: 'red',
  },
  close: {
    // flex: 1/2,
    // alignItems: 'center',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  }
});
