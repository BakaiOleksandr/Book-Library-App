import {useDispatch, useSelector} from 'react-redux';
import {
  setTitleFilter,
  resetFilters,
  selectTitleFilter,
  setAuthorFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
  setOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';

import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  //subscribe to state in store
  const titleFilter = useSelector(selectTitleFilter);
  const authorFilter = useSelector(selectAuthorFilter);
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);
  //send to store
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  //function reset filters
  //send to redux store action, that resetFilters function returns
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };
  const handleAuthorFilterChange = (e) => {
    //dispatch to store
    dispatch(setAuthorFilter(e.target.value));
  };
  //dispatch onlyFavorite
  const handleOnlyFavoriteChange = (e) => {
    dispatch(setOnlyFavoriteFilter());
    //we dont need target.value, because function has true or false only
  };

  return (
    <div className="app-block filter">
      <div className="filter-row">
        <div className="filter-group">
          <input
            onChange={handleTitleFilterChange}
            value={titleFilter}
            type="text"
            placeholder="Filter by title..."
          />
        </div>
        <div className="filter-group">
          <input
            onChange={handleAuthorFilterChange}
            value={authorFilter}
            type="text"
            placeholder="Filter by author..."
          />
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={onlyFavoriteFilter}
              onChange={handleOnlyFavoriteChange}
            />
            Only favorite
          </label>
        </div>
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};
export default Filter;
