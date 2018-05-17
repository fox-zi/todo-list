import React, { Component } from 'react'
import { ListView, Text, StyleSheet,
  TouchableOpacity,View,
    AsyncStorage, TextInput } from 'react-native'
import TodoEdit from './todoedit'
import CheckBox from 'react-native-checkbox';
import { connect } from 'react-redux';

class ListTodo extends Component {
  constructor(props){
    super(props);
    var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2 });
    this.state = {
      text: this.props.myName,
      mang: this.props.data,
      dataSource: ds.cloneWithRows(this.props.data)
    };
  }
  componentDidMount(){
    setInterval(() => {
            this.setState({
                mang: this.props.data,
                dataSource: this.state.dataSource.cloneWithRows(this.props.data) });
        }, 10);
    self = this
  }

  // save = async()=>{
  //   try {
  //     await AsyncStorage.setItem('@Array:key', JSON.stringify(this.state.mang));
  //     console.log('SAVE!');
  //     this.get()
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  //
  // get = async()=>{
  //   try {
  //     var mang = await AsyncStorage.getItem('@Array:key');
  //     mang = JSON.parse(mang);
  //     this.setState({
  //       mang: mang,
  //       dataSource: this.state.dataSource.cloneWithRows(mang)
  //     })
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  render() {
    return(
        <ListView
          enableEmptySections = { true }
          dataSource = { this.state.dataSource }
          renderRow= { this.renderRow.bind(this) }
          renderHeader = { this.renderAdd.bind(this) }
        />
    )
  }

  renderAdd() {
    return (
      <View style={ styles.container }>
        <TextInput
          value = { this.state.text }
          style={ styles.input }
          placeholder="Search..."
          onChangeText={ (text) => this.setState({ text: text }) }
        />
        <TouchableOpacity onPress={ () => { this.addCell() }}>
          <Text style={{ marginTop: '20%' }}> ADD </Text>
        </TouchableOpacity>
      </View>
    )
  }

  addCell() {
    this.props.dispatch({type: 'ADD_DATA', text: this.state.text })

}
  todoEdit(dataRow,index){
    this.props.navigator.push({
      component: TodoEdit,
      passProps: { dataRow,index },
      title: 'Todo Edit',
    })
  }

  deleteCell(index){
      this.props.dispatch({type: 'DELETE_DATA', index: index })
  }

  changeChecked(dataRow, rowID, checked){
    if (checked!=dataRow[1]) {
      var current = ''
      if (dataRow[1]=='true'){
        current = 'false'
      }
      else {
          current = 'true'
      }
      mang = self.props.data
      mang[rowID] = [dataRow[0], current]
      this.props.dispatch({type: 'CHECKED', index: rowID, value: dataRow[0], status: current })
    }
  }

  renderRow = (dataRow, sectionID, rowID) => {
    return (
      <View style={ styles.dataRow } >
        <CheckBox
          label={ dataRow[0] }
          checked={ dataRow[1]=='true' }
          onChange={ (checked) => { this.changeChecked(dataRow, rowID, checked) } }
        />

        <TouchableOpacity
          style={ styles.rowEdit }
          onPress={ () => { this.todoEdit(dataRow, rowID) } }  >
          <Text>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={ styles.rowIndex }
          onPress={ () => { this.deleteCell(rowID) } } >
          <Text style={ styles.rowColor } >X</Text>
        </TouchableOpacity>
      </View>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    myName: state.name,
    data: state.mang
  };
}

export default connect(mapStateToProps)(ListTodo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    flexDirection: 'row',
    backgroundColor: '#C1C1C1',
  },
  dataRow: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  rowEdit: {
    position: 'absolute',
    right: '10%',
  },
  rowIndex: {
    position: 'absolute',
    right: 0,
  },
  rowColor: {
    color: 'red',
  },
  input: {
    height: 30,
    flex: 1,
    paddingHorizontal: 8,
    fontSize: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  }
});
