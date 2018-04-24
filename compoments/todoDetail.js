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
    this.setState({ check: this.props.dataRow[1] })
  }
  render() {
      return(
        <View  style = { styles.container } >
            <Text>{ this.props.dataRow[0] }</Text>
            <CheckBox
              label='Check Done'
              checked={ this.state.check=='true' }
              onChange={ (checked) => { this.changeChecked(this.props.dataRow) } }
            />
            <TouchableOpacity onPress={() => { this.back() } }>
            <Text>Go back</Text>
            </TouchableOpacity>
        </View>
      )
    }

    save = async()=>{
      try {
        await AsyncStorage.setItem('@Array:key', JSON.stringify(this.state.mang));
        console.log('SAVE');
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
        console.log(e);
      }
    }

    changeChecked(dataRow){
      var current = ''
      if (this.state.check=='true'){
        current = 'false'
      }
      else {
          current = 'true'
      }
      array = this.state.mang
      array[this.props.index] = [dataRow[0], current];
      this.setState({ mang: array, check: current });
      this.save()
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});
