import { combineReducers } from 'redux'
import profileReducer from './profileSlice'
import booksReducer from './booksSlice'
import matchedBooksReducer from './matchedBooksSlice'

export default combineReducers({
  profile : profileReducer,
  books: booksReducer,
  matchedBooks: matchedBooksReducer
})
