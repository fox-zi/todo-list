import React, { Component } from 'react'
import {View, Text } from 'react-native'

export default class TodoDetail extends Component {
  render() {
      return(
        <View><Text>{ this.state.dataRow }</Text></View>
      )
    }
}
