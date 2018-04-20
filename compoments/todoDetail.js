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
              checked={this.state.check}
              onChange={(checked) => this.changeChecked(checked) }
            />
        </View>
      )
    }

    save = async()=>{
      try {
        await AsyncStorage.setItem('@Array:key', JSON.stringify(this.state.mang));
        console.log('SAVE!!!!!!!');
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

    changeChecked(dataRow){
      // console.log(dataRow[1]);
      // console.log(this.state.check);
      // if (dataRow[1] == 'true')
      //   this.setState({ check: false})
      // else{
      //   this.setState({ check: true});
      // }
      // console.log(this.state.check);
      this.setState({ check: dataRow});
      array = this.state.mang;
      arr = [this.props.dataRow[0], dataRow];
      for (let i=0; i<array.length; i++) {
        if (JSON.stringify(array[i]) == JSON.stringify(dataRow)) {
          array[i] = arr;

        }
      }
      this.setState({ mang: array});
      console.log(this.state.mang);
      this.save()
    }

    checkDone(){
      console.log(this.props.save());
      this.props.navigator.pop()
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
