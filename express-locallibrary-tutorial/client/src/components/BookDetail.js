import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [bookInstances, setBookInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/book/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load book');
        return res.json();
      })
      .then(data => {
        setBook(data.book);
        setBookInstances(data.book_instances || []);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Book Details</h5>
          <p>
            <strong>Author: </strong>
            {book.author ? (
              <Link to={`/authors/${book.author._id}`}>
                {book.author.first_name} {book.author.family_name}
              </Link>
            ) : 'Unknown'}
          </p>
          <p><strong>Summary:</strong> {book.summary}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p>
            <strong>Genre: </strong>
            {book.genre && book.genre.length > 0 ? (
              book.genre.map((genre, idx) => (
                <span key={genre._id}>
                  <Link to={`/genres/${genre._id}`}>{genre.name}</Link>
                  {idx < book.genre.length - 1 && ', '}
                </span>
              ))
            ) : 'None'}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Book Copies</h5>
          {bookInstances.length > 0 ? (
            bookInstances.map(bookInstance => (
              <div key={bookInstance._id} className="mb-3 p-3 border rounded">
                <p>
                  <strong>Status: </strong>
                  <span className={
                    bookInstance.status === 'Available' ? 'text-success' :
                    bookInstance.status === 'Maintenance' ? 'text-danger' : 'text-warning'
                  }>
                    {bookInstance.status}
                  </span>
                </p>
                <p><strong>Imprint:</strong> {bookInstance.imprint}</p>
                {bookInstance.due_back && (
                  <p><strong>Due back:</strong> {new Date(bookInstance.due_back).toLocaleDateString()}</p>
                )}
                <p>
                  <Link to={`/bookinstances/${bookInstance._id}`} className="btn btn-sm btn-outline-primary">
                    View Copy Details
                  </Link>
                </p>
              </div>
            ))
          ) : (
            <p>There are no copies of this book in the library.</p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <Link to={`/books/${book._id}/update`} className="btn btn-secondary me-2">
          Edit Book
        </Link>
        <Link to={`/books/${book._id}/delete`} className="btn btn-danger me-2">
          Delete Book
        </Link>
        <Link to="/books" className="btn btn-outline-secondary">
          Back to Books
        </Link>
      </div>
    </div>
  );
}

export default BookDetail;