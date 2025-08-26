import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function BookInstanceDelete() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookInstance, setBookInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/bookinstance/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load book instance');
        return res.json();
      })
      .then(data => {
        setBookInstance(data);
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
    fetch(`/api/bookinstance/${id}/delete`, {
      method: 'DELETE', // Changed from POST to DELETE
    })
      .then(res => {
        if (res.ok) {
          navigate('/bookinstances');
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

  if (loading) return <div>Loading book instance details...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;
  if (!bookInstance) return <div>Book instance not found.</div>;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h1>Delete Book Instance</h1>
      
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Are you sure you want to delete this book instance?</h5>
          
          <div className="mb-3">
            <strong>ID:</strong> {bookInstance._id}
          </div>
          
          <div className="mb-3">
            <strong>Book: </strong>
            {bookInstance.book ? (
              <Link to={`/books/${bookInstance.book._id}`}>
                {bookInstance.book.title}
              </Link>
            ) : 'Unknown Book'}
          </div>
          
          <div className="mb-3">
            <strong>Imprint:</strong> {bookInstance.imprint}
          </div>
          
          <div className="mb-3">
            <strong>Status: </strong>
            <span className={
              bookInstance.status === 'Available' ? 'text-success' :
              bookInstance.status === 'Maintenance' ? 'text-danger' : 'text-warning'
            }>
              {bookInstance.status}
            </span>
          </div>
          
          {bookInstance.due_back && (
            <div className="mb-3">
              <strong>Due back:</strong> {formatDate(bookInstance.due_back)}
            </div>
          )}
        </div>
      </div>

      <form onSubmit={handleDelete}>
        <button type="submit" className="btn btn-danger me-2" disabled={deleting}>
          {deleting ? 'Deleting...' : 'Delete Book Instance'}
        </button>
        <Link to={`/bookinstances/${bookInstance._id}`} className="btn btn-secondary">
          Cancel
        </Link>
      </form>
    </div>
  );
}

export default BookInstanceDelete;