import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/books')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load books');
        return res.json();
      })
      .then(data => {
        setBooks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading books...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Book List</h1>
        <Link to="/books/create" className="btn btn-primary">
          Create New Book
        </Link>
      </div>

      {books.length > 0 ? (
        <div className="row">
          {books.map(book => (
            <div key={book._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">
                    <Link to={`/books/${book._id}`} style={{textDecoration: 'none'}}>
                      {book.title}
                    </Link>
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    by {book.author ? `${book.author.first_name} ${book.author.family_name}` : 'Unknown Author'}
                  </h6>
                  <p className="card-text text-truncate">{book.summary}</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">ISBN: {book.isbn}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <h3>No books found</h3>
          <p>There are no books in the library yet.</p>
          <Link to="/books/create" className="btn btn-primary">
            Create First Book
          </Link>
        </div>
      )}
    </div>
  );
}

export default BookList;