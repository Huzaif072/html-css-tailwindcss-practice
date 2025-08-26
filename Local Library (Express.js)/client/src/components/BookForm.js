import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function BookForm({ isEdit = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    summary: '',
    isbn: '',
    genre: []
  });
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch authors and genres
    Promise.all([
      fetch('/api/authors').then(res => {
        if (!res.ok) throw new Error('Failed to fetch authors');
        return res.json();
      }),
      fetch('/api/genres').then(res => {
        if (!res.ok) throw new Error('Failed to fetch genres');
        return res.json();
      })
    ])
    .then(([authorsData, genresData]) => {
      setAuthors(authorsData);
      setGenres(genresData);
      
      // If editing, fetch the book data
      if (isEdit && id) {
        return fetch(`/api/book/${id}`)
          .then(res => {
            if (!res.ok) throw new Error('Failed to fetch book');
            return res.json();
          })
          .then(bookData => {
            if (bookData.book) {
              setBook({
                title: bookData.book.title || '',
                author: bookData.book.author?._id || '',
                summary: bookData.book.summary || '',
                isbn: bookData.book.isbn || '',
                genre: bookData.book.genre ? bookData.book.genre.map(g => g._id) : []
              });
            }
          });
      }
    })
    .catch(err => {
      setErrors([{ msg: err.message }]);
    })
    .finally(() => {
      setLoading(false);
    });
  }, [isEdit, id]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'genre') {
      if (checked) {
        setBook(prev => ({ ...prev, genre: [...prev.genre, value] }));
      } else {
        setBook(prev => ({ ...prev, genre: prev.genre.filter(g => g !== value) }));
      }
    } else {
      setBook(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    
    const url = isEdit ? `/api/book/${id}/update` : '/api/book/create';
    const method = isEdit ? 'PUT' : 'POST'; // Use PUT for updates

    fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
      .then(async res => {
        const data = await res.json();
        if (res.ok) {
          navigate('/books');
        } else {
          setErrors(data.errors || [{ msg: data.message || 'Submission failed' }]);
        }
      })
      .catch(err => {
        setErrors([{ msg: 'Network error: ' + err.message }]);
      });
  };

  if (loading) return <div>Loading form data...</div>;

  return (
    <div>
      <h1>{isEdit ? 'Edit Book' : 'Create New Book'}</h1>
      
      <form onSubmit={handleSubmit} className="needs-validation">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            id="title"
            className="form-control"
            type="text"
            name="title"
            placeholder="Book title"
            required
            value={book.title}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author:</label>
          <select
            id="author"
            className="form-control"
            name="author"
            required
            value={book.author}
            onChange={handleChange}
          >
            <option value="">-- Select Author --</option>
            {authors.map(author => (
              <option key={author._id} value={author._id}>
                {author.first_name} {author.family_name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="summary" className="form-label">Summary:</label>
          <textarea
            id="summary"
            className="form-control"
            name="summary"
            rows="4"
            placeholder="Book summary"
            required
            value={book.summary}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="isbn" className="form-label">ISBN:</label>
          <input
            id="isbn"
            className="form-control"
            type="text"
            name="isbn"
            placeholder="ISBN number"
            required
            value={book.isbn}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Genres:</label>
          <div className="row">
            {genres.map(genre => (
              <div key={genre._id} className="col-md-4 col-sm-6 mb-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="genre"
                    id={`genre-${genre._id}`}
                    value={genre._id}
                    checked={book.genre.includes(genre._id)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={`genre-${genre._id}`}>
                    {genre.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {isEdit ? 'Update Book' : 'Create Book'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/books')}>
          Cancel
        </button>
      </form>

      {errors.length > 0 && (
        <div className="alert alert-danger mt-3">
          <h6>Errors:</h6>
          <ul className="mb-0">
            {errors.map((error, idx) => (
              <li key={idx}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BookForm;