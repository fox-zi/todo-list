import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class TodoDetail extends Component {
  goback(){
    this.props.navigator.pop()
  }
  render() {
      return(
        <View   style = { styles.container }>
          <TouchableOpacity onRess={ () => _this.goBack()}
          <Text>{this.props.data}</Text>
          />
        </View>
      )
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});
