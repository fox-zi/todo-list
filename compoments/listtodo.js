import React, { Component } from 'react'
import {ListView, Text, StyleSheet,
  TouchableOpacity, AlertIOS,View,
  AsyncStorage, TextInput } from 'react-native'
import TodoDetail from './todoDetail'
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
      console.log(JSON.stringify(this.state.mang));

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
          renderRow= { this.renderRow }
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
    console.log(this.state.text);
    if (this.state.text) {
      array = this.state.mang;
      array.push(this.state.text)
      this.setState({
        mang: array,
        text: '',
        dataSource: this.state.dataSource.cloneWithRows(array)
      });
    this.save()
  }
}

  pressCell(dataRow){
    this.props.navigator.push({
      component: TodoDetail,
      passProps: { dataRow },
      title: 'Todo Detail',
    })
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
