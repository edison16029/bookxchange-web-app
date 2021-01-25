import { combineReducers } from 'redux'
import myAccountReducer from './myAccountSlice'

export default combineReducers({
  myAccount : myAccountReducer
})
