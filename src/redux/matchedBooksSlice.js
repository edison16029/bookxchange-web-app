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

export const fetchUserById = createAsyncThunk(
    'books/fetchUserById',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.users.fetchUserById(data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

export const unlikeBook = createAsyncThunk(
    'books/unlikeBook',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.unlikeBook(data)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            handleApiError(error);         
            return ThunkAPI.rejectWithValue();       
        });  
    }
  )

export const likeBook = createAsyncThunk(
    'books/unlikeBook',
    (data, ThunkAPI) => {
        const myApi = new API();
        return myApi.endpoints.books.likeBook(data)
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
        data : {
            booksILiked: [],
            booksOthersLiked: []
        },
        booksILikedError : false,
        booksOthersLikedError: false,
        booksILikedStatus : "initial",
        booksOthersLikedStatus : "initial"
  },
  reducers: {
        resetBooksILiked(state) {
            state.data.booksILiked = [];
            state.booksILikedError = false;
            state.booksILikedStatus = "initial";
        }
    },
    extraReducers : {
        [fetchBooksILiked.fulfilled] : (state, action) => {
            state.data.booksILiked = action.payload.data.books;
            state.booksILikedError = false;
            state.booksILikedStatus = "fetched";
        },
        [fetchBooksILiked.rejected] : (state, action) => {
            state.data.booksILiked = [];
            state.booksILikedError = true;
            state.booksILikedStatus = "fetched";
        },
        [fetchBooksOthersLiked.fulfilled] : (state, action) => {
            state.data.booksOthersLiked = action.payload.data.books;
            state.booksOthersLikedError = false;
            state.booksOthersLikedStatus = "fetched";
        },
        [fetchBooksOthersLiked.rejected] : (state, action) => {
            state.data.booksOthersLiked = [];
            state.booksOthersLikedError = true;
            state.booksOthersLikedStatus = "fetched";
        }
    }
})

export const { resetBooksILiked } = matchedBooksSlice.actions;
export default matchedBooksSlice.reducer