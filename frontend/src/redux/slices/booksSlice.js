import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import createBookWithId from '../../utils/createBookWithId';
import axios from 'axios';
import {setError} from './errorSlice';

const initialState = [];

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      //to make action rejected we do throw error
      throw error;
    }
  },
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      return [...state, action.payload];
      //state.push(action.payload)library Immer creates new array
    },
    deleteBook: (state, action) => {
      // //find index of the element in array
      // const index=state.findIndex((book)=>book.id===action.payload);
      // //if index not equal -1
      // if(index !== -1){
      //     //than delete one (1) element, starting from certain index
      //     state.splice(index,1)
      // }

      return state.filter((book) => book.id !== action.payload);
    },
    toggleFavorite: (state, action) => {
      //     return state.map((book) =>
      //     book.id === action.payload
      //       ? {...book, isFavorite: !book.isFavorite}
      //       : book
      //   );

      state.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },

  //OPTION 1
  // extraReducers: {
  //   [fetchBook.fulfilled]: (state, action) => {
  //     if (action.payload.title && action.payload.author) {
  //       return [...state, createBookWithId(action.payload, 'API')];
  //     }
  //   },
  // },

  //OPTION 2
  extraReducers: (builder) => {
    builder.addCase(fetchBook.fulfilled, (state, action) => {
      if (action.payload.title && action.payload.author) {
        return [...state, createBookWithId(action.payload, 'API')];
      }
    });
  },
});

export const {addBook, deleteBook, toggleFavorite} = bookSlice.actions;

export const selectBooks = (state) => state.books;

export default bookSlice.reducer;
