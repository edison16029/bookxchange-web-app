import { combineReducers } from 'redux'
import myAccountReducer from './myAccountSlice'
import booksReducer from './booksSlice'
import matchedBooksReducer from './matchedBooksSlice'

export default combineReducers({
  myAccount : myAccountReducer,
  books: booksReducer,
  matchedBooks: matchedBooksReducer
})
