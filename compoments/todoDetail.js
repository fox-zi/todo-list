import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import CheckBox from 'react-native-checkbox';

export default class TodoDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      check: false,
      mang: []
    };
  }

  componentDidMount(){
    this.get()
    this.setState({
      check: this.props.dataRow[1]
    })
  }
  render() {
      return(
        <View  style = { styles.container } >
            <Text>{this.props.dataRow[0]}</Text>
            <TouchableOpacity onPress={() => { this.todoEdit() } }>
            <Text>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.back() } }>
            <Text>Go back</Text>
            </TouchableOpacity>
            <CheckBox
              label='Check Done'
              checked={ this.state.check }
              onChange={(checked) => this.changeChecked(checked, this.props.dataRow) }
            />
        </View>
      )
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
        this.setState({ mang: mang })
      } catch (e) {
        console.log('==============Lôi');
      }
    }

    changeChecked(checked,dataRow){
      array = this.state.mang;
      arr = [dataRow[0], checked];
      for (let i=0; i<array.length; i++) {
        if (JSON.stringify(array[i]) == JSON.stringify(dataRow)) {
          array[i] = arr;
        }
      }
      this.setState({ mang: array });
      console.log(array);
      this.save()
    }

    todoEdit(){
      console.log(this.state.mang);
      this.props.navigator.pop()
    }

    editTodo(){
      this.props.navigator.pop()
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});
