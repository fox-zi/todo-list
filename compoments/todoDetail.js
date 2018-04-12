import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export default class TodoDetail extends Component {
  render() {
      return(
        <View  style = { styles.container }>
            <Text>{this.props.dataRow}</Text>
            <TouchableOpacity onPress={() => { this.props.navigator.pop() } }>
            <Text>Back</Text>
            </TouchableOpacity>
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
