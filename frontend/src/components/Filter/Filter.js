import {useDispatch, useSelector} from 'react-redux';
import {
  setTitleFilter,
  resetFilters,
  selectTitleFilter,
} from '../../redux/slices/filterSlice';

import './Filter.css';

const Filter = () => {
  const dispatch = useDispatch();
  //subscribe to state in store
  const titleFilter = useSelector(selectTitleFilter);
  //send to store
  const handleTitleFilterChange = (e) => {
    dispatch(setTitleFilter(e.target.value));
  };
  //function reset filters
  //send to redux store action, that resetFilters function returns
  const handleResetFilters = () => {
    dispatch(resetFilters());
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
        <button type="button" onClick={handleResetFilters}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};
export default Filter;
