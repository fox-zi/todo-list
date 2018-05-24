export const ADD_DATA = 'ADD_DATA';
export const DELETE_DATA = 'DELETE_DATA';
export const EDIT_DATA = 'EDIT_DATA';
export const CHECKED = 'CHECKED';
export const GET_DATA = 'GET_DATA';


export function addData(key, value){
    return {
        type: ADD_DATA,
        value: value
    }
}

export function deleteData(key, index){
    return {
        type: DELETE_DATA,
        index: index
    }
}

export function editData(key, index, value, status){
    return {
        type: EDIT_DATA,
        index: index,
        value: value,
        status: status
    }
}

export function checked(key, index, value, status){
    return {
        type: CHECKED,
        index: index,
        value: value,
        status: status
    }
}

export function getData(key, index, value, status){
    return {
        type: GET_DATA,
        index: index,
        value: value,
        status: status
    }
}
