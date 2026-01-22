import {useState} from 'react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {addBook} from '../../redux/slices/booksSlice';
import booksData from '../../data/books.json';
import createBookWithId from '../../utils/createBookWithId';
import './BookForm.css';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const dispatch = useDispatch();

  const handleAddRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * booksData.length);
    const randomBook = booksData[randomIndex];

    dispatch(addBook(createBookWithId(randomBook)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author) {
      //dispatch action

      //send to store
      dispatch(addBook(createBookWithId({title, author})));
      setTitle('');
      setAuthor('');
    }
  };

  const handleAddRandomBookViaAPI = async () => {
    try {
      const res = await axios.get('http://localhost:4000/random-book');
      if (res.data && res.data.title && res.data.author) {
        dispatch(addBook(createBookWithId(res.data)));
      }
    } catch (error) {
      console.log('Error fetching random book', error);
    }
  };

  return (
    <div className="app-block book-form">
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <button type="submit">Add Book</button>
        <button type="button" onClick={handleAddRandomBook}>
          Add random
        </button>
        <button type="button" onClick={handleAddRandomBookViaAPI}>
          Add random via API
        </button>
      </form>
    </div>
  );
};
export default BookForm;
