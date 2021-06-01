import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../shared/api';
import constants from './../shared/constants'
import handleApiError from '../shared/errorhandler';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.fetchNearbyBooks(constants.findBooksDistance)
        .then(response => {
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
        data : {
            nearbyBooks: []
        },
        error : false,
        status : "initial"
  },
  reducers: {
        removeLikedBook(state,action) {
            let index = state.data.nearbyBooks.findIndex(book => book.id === action.payload);
            state.data.nearbyBooks.splice(index, 1);
        },
        updateBooks(state, action){
            state.data.nearbyBooks = action.payload;
        },
    },
    extraReducers : {
        [fetchBooks.fulfilled] : (state, action) => {
            state.data.nearbyBooks = action.payload.data.nearbyBooks;
            state.error = false;
            state.status = "fetched";
        },
        [fetchBooks.rejected] : (state, action) => {
            state.data.nearbyBooks = [];
            state.error = true;
            state.status = "fetched";
        }
    }
})

export const { removeLikedBook,updateBooks } = booksSlice.actions;
export default booksSlice.reducer