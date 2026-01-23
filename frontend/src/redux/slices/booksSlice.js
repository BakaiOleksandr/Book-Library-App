import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import createBookWithId from '../../utils/createBookWithId';
import axios from 'axios';
import {setError} from './errorSlice';

const initialState = {
  books: [],
  isLoadingViaAPI: false,
};

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (url, thunkAPI) => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      thunkAPI.dispatch(setError(error.message));
      //to make action rejected we do throw error
      //OPTION 1
      // throw error;
      //OPTION 2
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      return {...state, books: [...state.books, action.payload]};
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

      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    },
    toggleFavorite: (state, action) => {
      //     return state.map((book) =>
      //     book.id === action.payload
      //       ? {...book, isFavorite: !book.isFavorite}
      //       : book
      //   );

      state.books.forEach((book) => {
        if (book.id === action.payload) {
          book.isFavorite = !book.isFavorite;
        }
      });
    },
  },
  //OPTION 1
  //   extraReducers: {
  //     [fetchBook.pending]: (state, action) => {
  //       return {...state, isLoadingViaAPI: true};
  //     },
  //     [fetchBook.fulfilled]: (state, action) => {
  //       if (action.payload.title && action.payload.author) {
  //         return {
  //           ...state,
  //           isLoadingViaAPI: false,
  //           books: [...state.books, createBookWithId(action.payload, 'API')],
  //         };
  //       }
  //       return {...state, isLoadingViaAPI: false};
  //     },
  //     [fetchBook.rejected]: (state) => {
  //       return {...state, isLoadingViaAPI: false};
  //     },
  //   },
  // },

  //OPTION 2
  extraReducers: (builder) => {
    builder
      .addCase(fetchBook.pending, (state) => {
        return {
          ...state,
          isLoadingViaAPI: true,
        };
      })

      .addCase(fetchBook.fulfilled, (state, action) => {
        if (action.payload.title && action.payload.author) {
          return {
            ...state,
            isLoadingViaAPI: false,
            books: [...state.books, createBookWithId(action.payload, 'API')],
          };
        }

        return {
          ...state,
          isLoadingViaAPI: false,
        };
      })

      .addCase(fetchBook.rejected, (state) => {
        return {
          ...state,
          isLoadingViaAPI: false,
        };
      });
  },
});

export const {addBook, deleteBook, toggleFavorite} = bookSlice.actions;

export const selectBooks = (state) => state.books.books;

export const selectIsLoadingViaAPI = (state) => state.books.isLoadingViaAPI;

export default bookSlice.reducer;
