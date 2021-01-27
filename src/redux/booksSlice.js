import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    (data, ThunkAPI) => {
        console.log("Fetch Books Thunk Invoked : ", data);
        const myApi = new API();
        return myApi.endpoints.books.fetchNearbyBooks()
        .then(response => {
            console.log("Response : ", response);
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

const booksSlice = createSlice({
  name: 'books',
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
        [fetchBooks.fulfilled] : (state, action) => {
            console.log("Inside fetchBooks.fulfilled Data : ",action.payload);
            state.data.nearbyBooks = action.payload.data.book;
            state.error = false;
            state.status = "fetched";
        },
        [fetchBooks.rejected] : (state, action) => {
            console.log("Inside fetchBooks.rejected Data : ",action.payload);
            state.data = {};
            state.error = true;
            state.status = "fetched";
        }
    }
})

export const { addMyAccountData } = booksSlice.actions
export default booksSlice.reducer