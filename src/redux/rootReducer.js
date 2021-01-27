import { combineReducers } from 'redux'
import myAccountReducer from './myAccountSlice'
import booksReducer from './booksSlice'

export default combineReducers({
  myAccount : myAccountReducer,
  books: booksReducer
})
