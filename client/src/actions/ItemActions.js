import { GET_ITEM, GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
import { isRegExp } from 'util';

export const getItems = () => {
    return {
        type: GET_ITEMS
    }
}

export const addItem = (item) => {
    return {
        type: ADD_ITEM,
        payload: item
    }
}

export const getItem = (item) => {
    return {
        type: GET_ITEM,
        payload: item
    }
}

export const updateItem = (item, id) => {
    return {
        type: UPDATE_ITEM,
        payload: item
    }
}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

export const deleteItem = (id) => {
    return {
        type: DELETE_ITEM,
        payload: id
    }
}