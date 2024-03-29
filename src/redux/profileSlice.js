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

export const updateMyAccountData = createAsyncThunk(
    'profile/updateMyAccountData',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.users.updateMyUser(data.name, data.location)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

export const updateBookInfo = createAsyncThunk(
    'books/updateBookInfo',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.updateBook(data.id, data.data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

export const deleteBook = createAsyncThunk(
    'books/deleteBook',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.deleteBook(data.id)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

export const addBook = createAsyncThunk(
    'books/addBook',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.addBook(data)
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
        data : {
            accountInfo: {
                notifications: []
            },
            booksIOwn: []
        },
        accountInfoError : false,
        booksIOwnError : false,
        myAccountStatus : "initial",
        booksIOwnStatus : "initial"
  },
  reducers: {
        updateNotifs(state, action){
            state.data.accountInfo.notifications = action.payload;
        },
        resetAccountInfo(state) {
            state.data.accountInfo = {};
            state.accountInfoError = false;
            state.myAccountStatus = "initial";
        },
        resetBooksIOwnInfo(state) {
            state.data.booksIOwn = [];
            state.booksIOwnError = false;
            state.booksIOwnStatus = "initial";
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
            state.data.booksIOwn = [];
            state.booksIOwnError = true;
            state.booksIOwnStatus = "fetched";
        },
    }
})

export const { updateNotifs, resetAccountInfo, resetBooksIOwnInfo } = profileSlice.actions
export default profileSlice.reducer