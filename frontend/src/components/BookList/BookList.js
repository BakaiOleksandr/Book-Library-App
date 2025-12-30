import {useSelector, useDispatch} from 'react-redux';
import {BsBookmarkStarFill, BsBookmarkStar} from 'react-icons/bs';
import {deleteBook, toggleFavorite} from '../../redux/books/actionCreators';
import './BookList.css';
import {
  selectTitleFilter,
  selectAuthorFilter,
} from '../../redux/slices/filterSlice';

const BookList = () => {
  const dispatch = useDispatch();
  //subscribe to store
  const books = useSelector((state) => state.books);
  //subscribe to filter store, by title
  const titleFilter = useSelector(selectTitleFilter);
  //subscribe to store to author
  const authorFilter = useSelector(selectAuthorFilter);

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title
      .toLowerCase()
      .includes(titleFilter.toLowerCase());
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(authorFilter.toLowerCase());
    //because empty '' is true
    return matchesTitle && matchesAuthor;
  });

  //delete book
  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };
  //toggle
  const handelToggleFavorite = (id) => {
    dispatch(toggleFavorite(id));
  };
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
                {++i}. {book.title} by <strong>{book.author}</strong>
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
