import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';

export const fetchMyAccountData = createAsyncThunk(
    'profile/fetchMyAccountData',
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

export const fetchBooksIOwn = createAsyncThunk(
    'profile/fetchBooksIOwn',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.fetchBooksIOwn()
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

const profileSlice = createSlice({
  name: 'profile',
  initialState: { 
        data : {},
        accountInfoError : false,
        booksIOwnError : false,
        myAccountStatus : "initial",
        booksIOwnStatus : "initial"
  },
  reducers: {
        addMyAccountData(state, action) {
            state.data = action.payload;
        }
    },
    extraReducers : {
        [fetchMyAccountData.fulfilled] : (state, action) => {
            state.data.accountInfo = action.payload.data;
            state.accountInfoError = false;
            state.myAccountStatus = "fetched";
        },
        [fetchMyAccountData.rejected] : (state, action) => {
            state.data.accountInfo = {};
            state.accountInfoError = true;
            state.myAccountStatus = "fetched";
        },
        [fetchBooksIOwn.fulfilled] : (state, action) => {
            state.data.booksIOwn = action.payload.data.books;
            state.booksIOwnError = false;
            state.booksIOwnStatus = "fetched";
        },
        [fetchBooksIOwn.rejected] : (state, action) => {
            state.data.booksIOwn = {};
            state.booksIOwnError = true;
            state.booksIOwnStatus = "fetched";
        }
    }
})

export const { addMyAccountData } = profileSlice.actions
export default profileSlice.reducer