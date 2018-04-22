import React, { Component } from 'react'
import {View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native'
import CheckBox from 'react-native-checkbox';
export default class TodoEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: this.props.dataRow[0],
      mang: []
    };
  }

  render() {
      return(
        <View style={ styles1.container }>
          <TextInput
            value = { this.state.text }
            style = { styles1.input }
            onChangeText={ (text) => this.setState({ text: text }) }
          />
          <TouchableOpacity onPress={ () => { this.todoEdit() }}>
            <Text> ADD </Text>
          </TouchableOpacity>
        </View>
      )
    }
    todoEdit(){
      console.log(this.state.text);
      mang = [];
      async()=>{
        try {
          var mang = await AsyncStorage.getItem('@Array:key');
          mang = JSON.parse(mang);
        } catch (e) {
          console.log('==============Lôi');
        }
      }
      console.log(this.props.dataRow);
      console.log(mang);
      for (let i=0; i<mang.length; i++) {
        if (JSON.stringify(mang[i]) == JSON.stringify(this.props.dataRow)) {
          mang[i] = [this.state.text, this.props.dataRow[1]];
        }
      }

      async()=>{
        try {
          await AsyncStorage.setItem('@Array:key', JSON.stringify(mang));
        } catch (e) {
          console.log(e);
        }
      }
    }
}
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
