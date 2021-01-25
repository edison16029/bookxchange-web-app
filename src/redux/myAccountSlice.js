import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';

export const fetchMyAccountData = createAsyncThunk(
    'myAccount/fetchMyAccountData',
    (data, ThunkAPI) => {
        console.log("Inside fetchByIdStatus Data : ",data);
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
            console.log("Inside addMyAccountData Data : ",action.payload);
            state.data = action.payload;
        }
    },
    extraReducers : {
        [fetchMyAccountData.fulfilled] : (state, action) => {
            console.log("Inside fetchMyAccountData.fulfilled Data : ",action.payload);
            state.data = action.payload.data;
            state.error = false;
            state.status = "fetched";
        },
        [fetchMyAccountData.rejected] : (state, action) => {
            console.log("Inside fetchMyAccountData.rejected Data : ",action.payload);
            state.data = {};
            state.error = true;
            state.status = "fetched";
        }
    }
})

export const { addMyAccountData } = myAccountSlice.actions
export default myAccountSlice.reducer