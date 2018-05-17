import React, { Component } from 'react'
import {View, TextInput, StyleSheet, TouchableOpacity, Text, AsyncStorage } from 'react-native'
import ListTodo from './listtodo'
import { connect } from 'react-redux';
class TodoEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      text: this.props.dataRow[0],
      mang: []
    };
  }
  // componentDidMount(){
  //   this.get()
  // }
  render() {
      return(
        <View style={ styles1.container }>
          <TextInput
            value = { this.state.text }
            style = { styles1.input }
            onChangeText={ (text) => this.setState({ text: text }) }
          />
          <TouchableOpacity onPress={ () => { this.todoEdit() }}>
            <Text> Save </Text>
          </TouchableOpacity>
        </View>
      )
    }
    // get = async()=>{
    //   try {
    //     var mang = await AsyncStorage.getItem('@Array:key');
    //     mang = JSON.parse(mang);
    //     this.setState({
    //       mang: mang
    //     })
    //   } catch (e) {
    //     console.log(e);
    //   }
    // }
    //
    // save = async()=>{
    //     try {
    //       await AsyncStorage.setItem('@Array:key', JSON.stringify(this.state.mang));
    //       console.log('SAVE');
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    todoEdit(){
      this.props.dispatch({type: 'EDIT_DATA', index: this.props.index, value: this.state.text, status: this.props.dataRow[1] })
      // var mang = this.state.mang
      // mang[this.props.index] = [this.state.text, this.props.dataRow[1]]
      // this.setState({ mang: mang })
      // this.save()
      this.props.navigator.push({
        component: ListTodo,
        title: 'My todo',
      })
    }
}

export default connect()(TodoEdit);

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
