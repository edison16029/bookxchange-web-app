import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import API from '../shared/api';
import handleApiError from '../shared/errorhandler';

export const fetchBooks = createAsyncThunk(
    'books/fetchBooks',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.fetchNearbyBooks()
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
        data : {},
        error : false,
        status : "initial"
  },
  reducers: {
    },
    extraReducers : {
        [fetchBooks.fulfilled] : (state, action) => {
            state.data.nearbyBooks = action.payload.data.nearbyBooks;
            state.error = false;
            state.status = "fetched";
        },
        [fetchBooks.rejected] : (state, action) => {
            state.data = {};
            state.error = true;
            state.status = "fetched";
        }
    }
})

export const { } = booksSlice.actions
export default booksSlice.reducer