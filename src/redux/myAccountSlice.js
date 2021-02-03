import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';

export const fetchMyAccountData = createAsyncThunk(
    'myAccount/fetchMyAccountData',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.users.fetchMyUser()
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )
const myAccountSlice = createSlice({
  name: 'myAccount',
  initialState: { 
        data : {},
        error : false,
        status : "initial"
  },
  reducers: {
        addMyAccountData(state, action) {
            state.data = action.payload;
        }
    },
    extraReducers : {
        [fetchMyAccountData.fulfilled] : (state, action) => {
            state.data = action.payload.data;
            state.error = false;
            state.status = "fetched";
        },
        [fetchMyAccountData.rejected] : (state, action) => {
            state.data = {};
            state.error = true;
            state.status = "fetched";
        }
    }
})

export const { addMyAccountData } = myAccountSlice.actions
export default myAccountSlice.reducer