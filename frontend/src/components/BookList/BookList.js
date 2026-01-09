import {useSelector, useDispatch} from 'react-redux';
import {BsBookmarkStarFill, BsBookmarkStar} from 'react-icons/bs';
import {
  deleteBook,
  toggleFavorite,
  selectBooks,
} from '../../redux/slices/booksSlice';
import './BookList.css';
import {
  selectTitleFilter,
  selectAuthorFilter,
  selectOnlyFavoriteFilter,
} from '../../redux/slices/filterSlice';

const BookList = () => {
  const dispatch = useDispatch();
  //subscribe to store
  const books = useSelector(selectBooks);
  //subscribe to filter store, by title
  const titleFilter = useSelector(selectTitleFilter);
  //subscribe to filter store by author
  const authorFilter = useSelector(selectAuthorFilter);
  //subscribe to onlyFavorite Filter
  const onlyFavoriteFilter = useSelector(selectOnlyFavoriteFilter);

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    const matchesFavorite = onlyFavoriteFilter ? book.isFavorite : true;
    //because empty '' is true
    return matchesTitle && matchesAuthor && matchesFavorite;
  });

  //delete book
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };
  //toggle
  const handelToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };
  const highlightMatch = (text, filter) => {
    //if we have not used filter,than we return normal text
    if (!filter) return text;

    const regex = new RegExp(`(${filter})`, 'gi');
    // console.log(text.split(regex));
    return text.split(regex).map((substring, index) => {
      if (substring.toLowerCase() === filter.toLowerCase()) {
        return (
          <span key={index} className="highlight">
            {substring}
          </span>
        );
      }
      return substring;
    });
  };
  //RETURN
  return (
    <div className="app-block book-list">
      <h1>Book List</h1>
      {books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <ul>
          {filteredBooks.map((book, i) => (
            <li key={book.id}>
              <div className="book-info">
                {++i}. {highlightMatch(book.title, titleFilter)} by{' '}
                <strong>{highlightMatch(book.author, authorFilter)}</strong>
              </div>
              <div className="book-actions">
                <span onClick={() => handelToggleFavorite(book.id)}>
                  {book.isFavorite ? (
                    <BsBookmarkStarFill className="star-icon" />
                  ) : (
                    <BsBookmarkStar className="star-icon" />
                  )}
                </span>
                <button onClick={() => handleDeleteBook(book.id)}>
                  Delete book
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default BookList;
