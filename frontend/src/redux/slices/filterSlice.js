import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  title: '',
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
    resetFilters: (state) => {
      return {...initialState};
    },
  },
});

export const selectTitleFilter = (state) => state.filter.title;
// console.log(filterSlice.actions);
// console.log(filterSlice.actions.setTitleFilter('test'))

//export actions, destructured from filterSlice
export const {setTitleFilter, resetFilters} = filterSlice.actions;
//export reducer
export default filterSlice.reducer;
