import {useSelector, useDispatch} from 'react-redux';
import {BsBookmarkStarFill, BsBookmarkStar} from 'react-icons/bs';
import {deleteBook, toggleFavorite} from '../../redux/books/actionCreators';
import './BookList.css';

const BookList = () => {
  const dispatch = useDispatch();

  const books = useSelector((state) => state.books);

  const handleDeleteBook = (id) => {
    dispatch(deleteBook(id));
  };

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
          {books.map((book, i) => (
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
