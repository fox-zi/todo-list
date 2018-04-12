import React, { Component } from 'react'
import {View, Text, StyleSheet } from 'react-native'

export default class TodoDetail extends Component {
  render() {
      return(
        <View   style = { styles.container }>
          <Text>{this.props.dataRow}</Text>
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
