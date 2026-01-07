import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  onlyFavorite: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    //action 1
    setTitleFilter: (state, action) => {
      //we can write just `state.title=action.payload`,
      //we can change state, because of 'immer' library in
      //node_modules, this library creates immutable state
      return {...state, title: action.payload};
    },
    //action 2
    resetFilters: () => {
      return {...initialState};
    },
    //action 3
    setAuthorFilter: (state, action) => {
      return {...state, author: action.payload};
    },
    //action 4
    setOnlyFavoriteFilter: (state) => {
      return {...state, onlyFavorite: !state.onlyFavorite};
      //!state.onlyFavorite- because we have only boolean type(false and true)
    },
  },
});

//export actions, destructured from filterSlice
export const {
  setTitleFilter,
  resetFilters,
  setAuthorFilter,
  setOnlyFavoriteFilter,
} = filterSlice.actions;

export const selectTitleFilter = (state) => state.filter.title;
//state.filter-where 'filter' is the name of Slice
// console.log(filterSlice.actions);
// console.log(filterSlice.actions.setTitleFilter('test'))
export const selectAuthorFilter = (state) => state.filter.author;
// console.log(filterSlice.actions.setAuthorFilter('test'));
// export filterOnlyFavorite
export const selectOnlyFavoriteFilter = (state) => state.filter.onlyFavorite;
//export reducer
export default filterSlice.reducer;
