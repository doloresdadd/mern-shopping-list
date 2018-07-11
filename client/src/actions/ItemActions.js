import { GET_ITEM, GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from './types'

export const getItems = () => {
    return {
        type: GET_ITEMS
    }
}

export const addItem = () => {
    return {
        type: ADD_ITEM
    }
}

export const updateItem = () => {
    return {
        type: UPDATE_ITEM
    }
}

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}