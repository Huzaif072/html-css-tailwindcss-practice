import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function BookDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [bookInstances, setBookInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
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

  const handleDelete = (e) => {
    e.preventDefault();
    setDeleting(true);
    fetch(`/api/book/${id}/delete`, {
      method: 'DELETE', // Changed from POST to DELETE
    })
      .then(res => {
        if (res.ok) {
          navigate('/books');
        } else {
          return res.json().then(data => { 
            throw new Error(data.message || 'Delete failed'); 
          });
        }
      })
      .catch(err => {
        setError(err.message);
        setDeleting(false);
      });
  };

  if (loading) return <div>Loading book details...</div>;
  if (error) return <div style={{color: 'red'}}>Error: {error}</div>;
  if (!book) return <div>Book not found.</div>;

  return (
    <div>
      <h1>Delete Book: {book.title}</h1>
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
      <hr />

      {bookInstances.length > 0 ? (
        <>
          <p><strong>Delete the following copies before attempting to delete this Book.</strong></p>
          <div style={{ marginLeft: 20, marginTop: 20 }}>
            <h4>Book Copies</h4>
            {bookInstances.map(bookInstance => (
              <div key={bookInstance._id} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ddd' }}>
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
                  <strong>ID:</strong>{' '}
                  <Link to={`/bookinstances/${bookInstance._id}`}>{bookInstance._id}</Link>
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p>Do you really want to delete this Book?</p>
          <form onSubmit={handleDelete}>
            <button className="btn btn-danger" type="submit" disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete Book'}
            </button>
            {' '}
            <Link to={`/books/${book._id}`} className="btn btn-secondary">
              Cancel
            </Link>
          </form>
        </>
      )}
    </div>
  );
}

export default BookDelete;