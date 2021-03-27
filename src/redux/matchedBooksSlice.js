import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';

export const fetchBooksILiked = createAsyncThunk(
    'books/fetchBooksILiked',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.fetchBooksILiked()
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

export const fetchBooksOthersLiked = createAsyncThunk(
    'books/fetchBooksOthersLiked',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.fetchBooksOthersLiked()
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

const matchedBooksSlice = createSlice({
  name: 'matchedBooks',
  initialState: { 
        data : {},
        error : false,
        booksILikedStatus : "initial",
        booksOthersLikedStatus : "initial"
  },
  reducers: {
    },
    extraReducers : {
        [fetchBooksILiked.fulfilled] : (state, action) => {
            state.data.booksILiked = action.payload.data.books;
            state.error = false;
            state.booksILikedStatus = "fetched";
        },
        [fetchBooksILiked.rejected] : (state, action) => {
            state.data = {};
            state.error = true;
            state.booksILikedStatus = "fetched";
        },
        [fetchBooksOthersLiked.fulfilled] : (state, action) => {
            state.data.booksOthersLiked = action.payload.data.books;
            state.error = false;
            state.booksOthersLikedStatus = "fetched";
        },
        [fetchBooksOthersLiked.rejected] : (state, action) => {
            state.data = {};
            state.error = true;
            state.booksOthersLikedStatus = "fetched";
        }
    }
})

export default matchedBooksSlice.reducer