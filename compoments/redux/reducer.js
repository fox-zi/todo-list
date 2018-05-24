import * as Actions from "./actions"
import { ListView } from 'react-native';

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 === r2 });
var mang = []
const defaultState = {
  name: 'fox zi',
  value: 0,
  mang: mang,
  dataSource: ds.cloneWithRows(mang),
}

export default function todosReducers(state = initialState, action) {
    var currentState = Object.assign({}, state);
    switch (action.type) {
        case Actions.ADD_DATA:
          return {
            mang: [
              ...state.mang,
              [action.text, 'false']
            ],
            dataSource: state.dataSource.cloneWithRows(state.mang)
          }
        case Actions.DELETE_DATA:
          newState.mang.splice(action.index, 1);
          return {
            mang: newState.mang,
            dataSource: newState.dataSource.cloneWithRows(newState.mang)
          }
        case Actions.EDIT_DATA:
          newState.mang[action.index] = [action.value, action.status];
          return {
            mang: newState.mang,
            dataSource: newState.dataSource.cloneWithRows(newState.mang)
          };
        case Actions.CHECKED:
          newState.mang[action.index] = [action.value, action.status];
          return {
            mang: newState.mang,
            dataSource: newState.dataSource.cloneWithRows(newState.mang)
          };
        default:
            return state;
    }
}
